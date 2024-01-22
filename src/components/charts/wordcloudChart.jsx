import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import cloud from "d3-cloud";

const WordcloudChart = ({ wordcloudData }) => {
  const svgRef = useRef();

  useEffect(() => {
    render();
  }, [wordcloudData]);

  const render = () => {
    var myWords = wordcloudData;
    console.log(myWords);
    // set the dimensions and margins of the graph
    var margin = { top: 10, right: 10, bottom: 10, left: 10 },
      width = 300 - margin.left - margin.right,
      height = 300 - margin.top - margin.bottom;

    d3.select(svgRef.current).select("g").remove();
    // append the svg object to the body of the page
    var svg = d3
      .select(svgRef.current)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Constructs a new cloud layout instance. It run an algorithm to find the position of words that suits your requirements
    // Wordcloud features that are different from one word to the other must be here
    var layout = cloud()
      .size([width, height])
      .words(
        myWords.map(function (d) {
          return { text: d.word, size: d.size };
        })
      )
      .padding(5) //space between words
      .rotate(function () {
        return ~~(Math.random() * 2) * 90;
      })
      .fontSize(function (d) {
        return d.size;
      }) // font size of words
      .on("end", draw);
    layout.start();

    // This function takes the output of 'layout' above and draw the words
    // Wordcloud features that are THE SAME from one word to the other can be here
    function draw(words) {
      svg
        .append("g")
        .attr(
          "transform",
          "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")"
        )
        .selectAll("text")
        .data(words)
        .enter()
        .append("text")
        .style("font-size", function (d) {
          return d.size;
        })
        .style("fill", "#69b3a2")
        .attr("text-anchor", "middle")
        .style("font-family", "Impact")
        .attr("transform", function (d) {
          return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
        })
        .text(function (d) {
          return d.text;
        });
    }
  };
  return (
    <>
      <svg ref={svgRef}></svg>
    </>
  );
};

export default WordcloudChart;
