import React from 'react';
import queue from 'queue';
import topojson from 'topojson';
import * as d3 from 'd3';

class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        { letter: 'a', frequency: 1 },
        { letter: 'b', frequency: 3 },
        { letter: 'c', frequency: 5 },
      ]
    };
  }

  componentWillMount() {

  }

  componentDidUpdate() {
    const svg = d3.select(this.refs.anchor);
    //let { width, height } = this.props;

    //var svg = d3.select("svg"),
    const margin = {top: 20, right: 20, bottom: 30, left: 40};
    const width = this.props.width - margin.left - margin.right;
    console.log('width: ', width)
    const height = this.props.height - margin.top - margin.bottom;

    const x = d3.scaleBand().rangeRound([0, width]).padding(0.1);
    const y = d3.scaleLinear().rangeRound([height, 0]);

    const g = svg.append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
    // d3.tsv("data.tsv", function(d) {
    //   d.frequency = +d.frequency;
    //   return d;
    // }, function(error, data) {
    //   if (error) throw error;

    const { data } = this.state;
    console.log('data: ', data)
    x.domain(data.map(d => d.letter));
    y.domain([0, d3.max(data, d => d.frequency)]);
    console.log('y.domain: ', y.domain)

    g.append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(x));

    g.append('g')
      .attr('class', 'axis axis--y')
      .call(d3.axisLeft(y).ticks(10, '%'))
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '0.71em')
      .attr('text-anchor', 'end')
      .text('Frequency');

    g.selectAll('.bar')
      .data(data)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', d => x(d.letter))
      .attr('y', d => y(+d.frequency))
      .attr('width', x.bandwidth())
      .attr('height', d => height - y(d.frequency));
  }

  render() {
    const { data } = this.state;
    if (!data) {
      return null;
    }

    return <g ref="anchor" />;
  }
}

export default Chart;
