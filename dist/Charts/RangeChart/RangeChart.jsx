import { Component } from 'preact';
import { scaleLinear, scaleTime } from 'd3-scale';
import { Axis } from '../../Axis/Axis';
import * as style from './style.css';
import { area } from 'd3-shape';
import { min, max } from 'd3-array';
import { select, event } from 'd3-selection';
import { brushX } from 'd3-brush';
export class RangeChart extends Component {
    constructor(props) {
        super(props);
        this.componentDidMount = () => {
            this.resizeChart();
            this.resizeOb = new ResizeObserver((entries) => {
                for (const entry of entries) {
                    const cr = entry.contentRect;
                    const width = cr.width;
                    const height = cr.height;
                    if (width !== this.state.width || height !== this.state.height) {
                        this.resizeChart();
                    }
                }
            });
            this.resizeOb.observe(this.chartSVG.parentElement);
        };
        const innerWidth = props.width - props.margin.left - props.margin.right;
        const innerHeight = props.height - props.margin.top - props.margin.bottom;
        this.state = {
            width: props.width,
            height: props.height,
            innerWidth,
            innerHeight,
        };
    }
    render(props, { width, height, innerWidth, innerHeight }) {
        this.xScale = scaleTime()
            .range([0, innerWidth])
            .domain([min(props.data, (d) => d.timestamp), max(props.data, (d) => d.timestamp)]);
        const yScale = scaleLinear()
            .range([innerHeight, 0])
            .domain([min(props.data, (d) => +d[props.y]), max(props.data, (d) => +d[props.y])]);
        const areaFunc = area()
            .x((d) => this.xScale(d.timestamp))
            .y0(innerHeight)
            .y1((d) => yScale(+d[props.y]));
        return (<svg ref={(svg) => this.chartSVG = svg} class={props.name} height={height} width={width}>
                <g transform={`translate(${props.margin.left}, ${props.margin.top})`}>
                    <Axis height={innerHeight} axisType='x' scale={this.xScale}/>
                    <Axis width={innerWidth} axisType='y' scale={yScale} grid={true} ticks={0}/>
                    <path class='line' d={areaFunc(props.data)} stroke-linecap='round' stroke={props.lineColour} fill={props.fillColour} stroke-width='1px'/>
                    <g ref={(brush) => this.brush = brush} class={style.brush}></g>
                </g>
            </svg>);
    }
    componentWillUnmount() {
        this.resizeOb.disconnect();
        select(this.brush).call(this.brushSetup.move, null);
    }
    resizeChart() {
        const parent = this.chartSVG.parentElement;
        const cr = parent.getBoundingClientRect();
        const width = cr.width;
        const height = cr.height;
        const innerWidth = width - this.props.margin.left - this.props.margin.right;
        const innerHeight = height - this.props.margin.top - this.props.margin.bottom;
        this.brushSetup = brushX()
            .extent([
            [0, 0],
            [innerWidth, innerHeight],
        ])
            .handleSize(10)
            .on('end', () => {
            const selection = (event.selection || [0, innerWidth]);
            const inverted = [this.xScale.invert(selection[0]), this.xScale.invert(selection[1])];
            this.props.onBrush(inverted);
        });
        select(this.brush).call(this.brushSetup);
        this.setState({ innerWidth, innerHeight, height, width });
    }
}
RangeChart.defaultProps = {
    name: 'rangechart',
    height: 200,
    width: 1000,
    margin: {
        top: 25,
        right: 25,
        bottom: 75,
        left: 75,
    },
    data: [],
    y: '',
    lineColour: 'steelblue',
    fillColour: 'steelblue',
    onBrush: () => { },
};
//# sourceMappingURL=RangeChart.jsx.map