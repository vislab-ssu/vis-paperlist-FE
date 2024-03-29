import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import moment from "moment";

const YearsBarChart = ({
  searchResults,
  barChartSelectedList,
  setBarChartSelectedList,
}) => {
  const transformData = (searchResults) => {
    // Set을 사용하여 중복 없는 연도 추출
    const years = new Set();
    searchResults.forEach((paper) =>
      years.add(moment(paper.date).format("YYYY"))
    );

    // 배열 초기화
    const dataByYear = Array.from(years)
      .sort()
      .map((year) => {
        return { Year: year, Value: 0 };
      });

    // dataByYear의 객체 채우기
    searchResults.forEach((paper) => {
      const year = moment(paper.date).format("YYYY");
      dataByYear.find((item) => {
        if (item.Year === year) item.Value += 1;
      });
    });
    return dataByYear;
  };

  const svgRef = useRef();

  useEffect(() => {
    render(transformData(searchResults));
  }, [searchResults]);

  const render = (dataByYear) => {
    // set the dimensions and margins of the graph
    const margin = { top: 10, right: 10, bottom: 70, left: 30 },
      svgWidth = 360,
      svgHeight = 240,
      width = svgWidth - margin.left - margin.right,
      height = svgHeight - margin.top - margin.bottom;

    d3.select(svgRef.current).select("g").remove();
    // append the svg object to the body of the page
    const container = d3
      .select(svgRef.current)
      .attr("width", svgWidth)
      .attr("height", svgHeight)
      .attr("class", "container")
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // X axis
    const x = d3
      .scaleBand()
      .range([0, width])
      .domain(dataByYear.map((d) => d.Year))
      .padding(0.2);
    container
      .append("g")
      .attr("class", "xAxis")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    // Y axis
    const y = d3
      .scaleLinear()
      .domain([0, Math.max(...dataByYear.map((v) => v.Value))])
      .range([height, 0]);
    container.append("g").attr("class", "yAxis").call(d3.axisLeft(y));

    ///////////
    // Brush //
    ///////////

    const brush = d3
      .brushX() // brushX() : 좌우 / brushY() : 싱히
      .extent([
        [0, 0],
        [width, height],
      ]) // extent : brush 활성화 영역 설정 [ [x0, y0], [x1, y1] ] (좌상단, 우하단)
      .on("brush", brushing)
      .on("end", brushEnd);
    // .on("start") : mousedown / .on("brush") mouse move / .on("end") mouse up

    const brushElement = container.call(brush);

    function brushing(e) {
      //(e: d3.D3BrushEvent<any>)
      // e 객체의 속성 : mode / selection / sourceEvent / target / type
      // e.move와 같은 기능을 사용할 때 아래 방어코드를 사용하지 않으면 무한루프
      if (!e.sourceEvent) return; // e.sourceEvent : 브러시 발생시킨 기본 DOM 이벤트 참조 (brush.move)와 같은 코드상 이동에 방어
      if (!e.selection) return; // e.selection : 현재 브러시 선택 영역 (대충 클릭했을 때 방어)

      // snap 기능 3단계 (축의 도형이나 tick에 딱 맞게 자동으로 brush되는 기능)
      // 1: brush 영역 내에 포함되는 tick이나 도형들 filterling
      // 1-1) selection으로 좌우 좌표 추출
      const [x0, x1] = e.selection; // 선택 영역 시작점 : x0 / 선택 영역 끝점 : x1
      // selection 값은 brush 종류에 따라,
      // d3.brushX() : 좌우 끝의 좌표값 [x0, x1]
      // d3.brushY() : 상하 끝의 좌표값 [y0, y1]
      // 만약 mousemove를 안했다면 selection의 값은 null

      bars.attr("fill", (d) => {
        const pos = x(d.Year) + x.bandwidth() / 2;
        return pos >= x0 && pos <= x1 ? "#69b3a2" : "#cccccc"; // 조건에 따라 색상 변경
      });

      // 1-2) 좌우는 x(scaleBand) 함수이므로 x의 domain 배열을 얻고
      // 각 요소를 range로 변환하여 계산에 활용 : x(d)
      // filter의 d는 각 막대의 시작점 좌표이므로 tick을 얻기 위한 추가 작업 필요
      const barChartSelectedList = x.domain().filter((d) => {
        const pos = x(d) + x.bandwidth() / 2;
        return pos >= x0 && pos <= x1;
      });

      // 2: 최소, 최대에 해당하는 tick이나 도형의 좌표 추출
      // extent 함수 : [최솟값, 최댓값] 반환
      const [left, right] = d3.extent(barChartSelectedList.map((v) => x(v)));

      /* 
        brush를 호출한 selection 객체에 .call()의 인자로 두가지 사용 가능

        brush.move(): brush 영역 상자를 강제 이동 시킴 (bursh에 맞는 추가 인자 전달)
        -> 이때, on으로 등록했던 핸들러 함수도 전부 동작
          (이때 핸들러 함수의 e.sourceEvent는 null)
        -> 핸들러 함수에서 brush.move 호출 시 무한루프에 빠짐
          (if (!e.sourceEvent) return; 의 방어 코드로 해결)
        
        brush.clear() : brush 영역 상자를 제거
      */

      // 3. brush.move를 사용하여 위치 조정
      brushElement.call(brush.move, [
        left,
        right + margin.right + x.bandwidth() / 2,
      ]);

      // 실시간 적용이 하고싶으면 setBarChartSelectedList를 여기서 사용하고 brushEnd 핸들러 제거
      setBarChartSelectedList(barChartSelectedList);
    }

    function brushEnd(e) {
      if (!e.sourceEvent) return;
      if (!e.selection) {
        // 그냥 클릭시 brush 선택영역 지우기
        setBarChartSelectedList([]);
        bars.attr("fill", "#69b3a2");
        return;
      }
      const [x0, x1] = e.selection;
      const selectionList = x.domain().filter((v) => {
        const range = x(v);
        return range >= x0 && range <= x1;
      });

      // console.log({ selectionList });
      // setBarChartSelectedList(selectionList);

      // brushElement.call(brush.clear); // brush 끝내면 영역 상자 제거
    }

    // Bars
    const bars = container
      .append("g")
      .attr("class", "bars")
      .selectAll("rect")
      .data(dataByYear)
      .join("rect")
      .attr("x", (d) => x(d.Year))
      .attr("y", (d) => y(+d.Value))
      .attr("width", x.bandwidth())
      .attr("height", (d) => height - y(+d.Value))
      .attr("fill", "#69b3a2"); // 초기 색상 지정
  };

  return (
    <>
      <svg ref={svgRef}></svg>
      {/* <p>selected List</p>
      <ul>
        {barChartSelectedList.map((v) => (
          <li key={v}>{v}</li>
        ))}
      </ul> */}
    </>
  );
};

export default YearsBarChart;
