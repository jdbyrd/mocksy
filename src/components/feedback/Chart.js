import React from 'react';
import { connect } from 'react-redux';
import * as d3 from 'd3';

const mapStateToProps = state => ({
  feedbackItems: state.feedback.list
});

class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentWillReceiveProps(nextProps) {
    let feedbackCopy = nextProps.feedbackItems.slice();
    let graphData = [];
    feedbackCopy = feedbackCopy.reduce((acc, item) => {
      if (acc[item.options]) {
        acc[item.options] = acc[item.options] + 1;
      } else {
        acc[item.options] = 1;
      }
      return acc;
    }, {});
    for (var key in feedbackCopy) {
      graphData.push({ type: key, amount: feedbackCopy[key] });
    }
    this.setState({
      data: graphData
    });
  }

  componentDidUpdate() {
    const svg = d3.select(this.refs.anchor);
    const margin = {top: 20, right: 20, bottom: 30, left: 40};
    const width = this.props.width - margin.left - margin.right;
    console.log('width: ', width)
    const height = this.props.height - margin.top - margin.bottom;

    const x = d3.scaleBand().rangeRound([0, width]).padding(0.1);
    const y = d3.scaleLinear().rangeRound([height, 0]);

    const g = svg.append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    const { data } = this.state;
    console.log('data: ', data)
    x.domain(data.map(d => d.type));
    y.domain([0, d3.max(data, d => d.amount)]);
    console.log('y.domain: ', y.domain)

    g.append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(x));

    g.append('g')
      .attr('class', 'axis axis--y')
      .call(d3.axisLeft(y).ticks(3, ''))
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 26)
      .attr('dy', '0.71em')
      .attr('text-anchor', 'end')
      .text('Frequency');

    g.selectAll('.bar')
      .data(data)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', d => x(d.type))
      .attr('y', d => y(+d.amount))
      .attr('width', x.bandwidth())
      .attr('height', d => height - y(d.amount))
      .on('click', function(d) {
        this.props.clickGraph(d); // my react method
      }.bind(this));
  }

  render() {
    const { data } = this.state;
    if (!data.length) {
      return null;
    }

    return <g ref="anchor" />;
  }
}

export default connect(mapStateToProps)(Chart);
