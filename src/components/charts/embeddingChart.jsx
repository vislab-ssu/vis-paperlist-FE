import * as d3 from "d3";
import React, { useEffect, useRef } from "react";
import { DBSCAN } from "density-clustering";
import { useContext } from "react";
import { DataContext } from "../../Context";

const EmbeddingChart = ({ embeddingData }) => {
  const { filteredPaper, setFilteredPaper } = useContext(DataContext);
  const svgRef = useRef();

  useEffect(() => {
    render();
  }, [embeddingData]);

  const render = () => {
    // DBSCAN 클러스터링 수행
    const dbscan = new DBSCAN();
    const vectors = embeddingData.map((d) => [d.vector_x, d.vector_y]);
    const clusters = dbscan.run(vectors, 0.6, 3);

    // 클러스터 ID 할당
    const clusterIds = new Array(vectors.length).fill(-1);
    clusters.forEach((cluster, clusterId) => {
      cluster.forEach((index) => {
        clusterIds[index] = clusterId;
      });
    });

    // 색상 스케일 정의
    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const margin = { top: 10, right: 30, bottom: 30, left: 60 },
      svgWidth = 500,
      svgHeight = 350,
      width = svgWidth - margin.left - margin.right,
      height = svgHeight - margin.top - margin.bottom;

    d3.select(svgRef.current).select("g").remove();

    const svg = d3
      .select(svgRef.current)
      .attr("width", svgWidth)
      .attr("height", svgHeight)
      .attr("class", "svg");
    const chartArea = svg
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // 최소값과 최대값 계산
    const xExtent = d3.extent(embeddingData, (d) => d.vector_x);
    const yExtent = d3.extent(embeddingData, (d) => d.vector_y);

    // 여백 추가
    const xPadding = (xExtent[1] - xExtent[0]) * 0.05; // x축 데이터 범위의 5%
    const yPadding = (yExtent[1] - yExtent[0]) * 0.05; // y축 데이터 범위의 5%

    const x = d3
      .scaleLinear()
      .range([0, width])
      .domain([xExtent[0] - xPadding, xExtent[1] + xPadding])
      .nice();
    chartArea
      .append("g")
      .attr("class", "xAxis")
      .attr("transform", `translate(0, ${height})`);

    const y = d3
      .scaleLinear()
      .range([height, 0])
      .domain([yExtent[0] - yPadding, yExtent[1] + yPadding])
      .nice();
    chartArea.append("g").attr("class", "yAxis");

    // Brush 기능 설정
    const brush = d3
      .brush()
      .extent([
        [0, 0],
        [width, height],
      ])
      .on("end", brushEnd);

    const brushElement = chartArea.call(brush);

    function brushEnd(e) {
      if (!e.selection) {
        setFilteredPaper([]);
        return;
      } // 선택 영역이 없으면 종료
      const [[x0, y0], [x1, y1]] = e.selection;

      // 선택된 점들의 데이터를 저장할 배열
      const selectedPaper = [];

      // 선택된 영역 내의 점들을 식별
      scatters.each(function (d) {
        const cx = x(d.vector_x),
          cy = y(d.vector_y);
        if (x0 <= cx && cx <= x1 && y0 <= cy && cy <= y1) {
          selectedPaper.push(d);
        }
      });

      setFilteredPaper(selectedPaper);

      // Brush 영역 초기화
      // brushElement.call(brush.clear);
    }

    const tooltip = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("position", "absolute")
      .style("visibility", "hidden")
      .style("background-color", "white")
      .style("border", "solid")
      .style("border-width", "1px")
      .style("border-radius", "2px")
      .style("padding", "5px");

    const scatters = chartArea
      .append("g")
      .selectAll("dot")
      .data(embeddingData)
      .enter()
      .append("circle")
      //   .join("circle")
      .attr("cx", (d) => x(d.vector_x))
      .attr("cy", (d) => y(d.vector_y))
      .attr("r", 5)
      .style("fill", (d) => color(clusterIds[embeddingData.indexOf(d)])) // 클러스터에 따라 색상 적용
      .on("mouseover", (event, d) => {
        tooltip.style("visibility", "visible").html(
          `Title: ${d.title}<br/>Author: ${d.author}<br/> Abstract: ${d.abstract}
            <br/>Citations: ${d.citation}<br/>DOI: ${d.doi}`
        );
      })
      .on("mousemove", (event) => {
        tooltip
          .style("left", event.pageX + 10 + "px")
          .style("top", event.pageY - 15 + "px");
      })
      .on("mouseout", () => {
        tooltip.style("visibility", "hidden");
      });
  };

  return <svg ref={svgRef}></svg>;
};

export default EmbeddingChart;
