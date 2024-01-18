import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import moment from "moment";

const YearsBarChart = ({ searchResults }) => {
  const transformData = (searchResults) => {
    // Set을 사용하여 중복 없는 연도 추출
    const years = new Set();
    searchResults.forEach((paper) =>
      years.add(moment(paper.date).format("YYYY"))
    );

    // 배열 초기화
    const dataByYear = Array.from(years).map((year) => {
      return { Year: year, Value: 0 };
    });

    // dataByYear의 객체 채우기
    searchResults.forEach((paper) => {
      const year = moment(paper.date).format("YYYY");
      dataByYear.find((item) => {
        if (item.Year === year) item.Value += 1;
      });
    });
    console.log(dataByYear);
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
    const svg = d3
      .select(svgRef.current)
      .attr("width", svgWidth)
      .attr("height", svgHeight)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // X axis
    const x = d3
      .scaleBand()
      .range([0, width])
      .domain(dataByYear.map((d) => d.Year))
      .padding(0.2);
    svg
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    // Add Y axis
    const y = d3.scaleLinear().domain([0, 30]).range([height, 0]);
    svg.append("g").call(d3.axisLeft(y));

    // Bars
    svg
      .selectAll("mybar")
      .data(dataByYear)
      .join("rect")
      .attr("x", (d) => x(d.Year))
      .attr("y", (d) => y(+d.Value))
      .attr("width", x.bandwidth())
      .attr("height", (d) => height - y(+d.Value))
      .attr("fill", "#69b3a2");
  };

  return (
    <>
      <svg ref={svgRef}></svg>
    </>
  );
};

export default YearsBarChart;
