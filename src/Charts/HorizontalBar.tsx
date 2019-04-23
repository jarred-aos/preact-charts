import { h, Component, VNode } from 'preact';
import { Margin, GroupedDataObject } from '../types';
import { Axis } from '../Components/Axis';
import { scaleLinear, scaleBand, ScaleBand, ScaleLinear, scaleOrdinal, ScaleOrdinal } from 'd3-scale';
import { max } from 'd3-array';
import { pluckUnique } from '../Utils/pluck';
import randomColor from 'randomcolor';
import { ResizeObserver } from 'resize-observer';

interface HorizontalBarProps {
  name: string;
  data: GroupedDataObject;
  groups: string[];
  legendReference: {[key: string]: string};

  height?: number;
  width?: number;
  margin?: Margin;
  ticks?: number;
}

interface HorizontalBarDefaultProps {
  height?: number;
  width?: number;
  margin?: Margin;
  ticks?: number;
}

interface HorizontalBarState {
  width: number;
  innerWidth: number;
  height: number;
  innerHeight: number;
  colorArray: string[];
}
export class HorizontalBar extends Component<HorizontalBarProps, HorizontalBarState> {
  public static defaultProps: HorizontalBarDefaultProps = {
    height: 800,
    width: 600,
    margin: {
      top: 25,
      right: 25,
      bottom: 50,
      left: 150,
    },
    ticks: 6,
  };
  private chartSVG: HTMLBaseElement;
  private resizeOb: ResizeObserver;

  public constructor (props: HorizontalBarProps) {
    super(props);
    const innerWidth = props.width - props.margin.right - props.margin.left;
    const innerHeight = props.height - props.margin.top - props.margin.bottom;
    const names = pluckUnique(props.data[props.groups[0]], 'name') as string[];
    const colorArray = [];
    for (const _name in names) {
      const color = randomColor();
      colorArray.push(color);
    }
    this.state = {
      height: props.height,
      innerHeight,
      width: props.width,
      innerWidth,
      colorArray
    };
  }
  public render ({ margin, ticks, data, groups, name, legendReference }: HorizontalBarProps,
    { height, width, innerHeight, innerWidth, colorArray }: HorizontalBarState): VNode {
    let xMax = 0;

    for (const key of groups) {
      const groupMax = max(data[key], (d) => d.value);
      xMax = groupMax > xMax ? groupMax : xMax;
    }

    const names = pluckUnique(data[groups[0]], 'name') as string[];

    const xScale = scaleLinear()
      .range([0, innerWidth])
      .domain([0, xMax])
      .nice();

    const yScale = scaleBand()
      .rangeRound([innerHeight, 0])
      .paddingInner(0.1)
      .domain(groups);

    const y1 = scaleBand()
      .padding(0.05)
      .domain(names)
      .rangeRound([0, yScale.bandwidth()]);

    const colourScale = scaleOrdinal(colorArray);
    return (
      <svg ref={(svg) => this.chartSVG = svg} class={name} height={height} width={width}>
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          <Axis height={innerHeight} axisType='x' scale={xScale} rotateScaleText={false} grid={true} />
          <Axis width={innerWidth} axisType='y' scale={yScale} ticks={ticks} />
          {
            data &&
              this.createBars(yScale, y1, xScale, groups, colourScale)
          }
          {
            names &&
              names.map((barName, idx) =>
                <g transform={`translate(0, ${idx * 20})`}>
                  <rect x={innerWidth + margin.right - 18} width={18} height={15} stroke='black'
                    stroke-width='1px' fill={colourScale(barName)}>
                  </rect>
                  <text x={innerWidth + margin.right - 24} y={9} dy='0.35em' fill='currentColor'
                    text-anchor='end'>
                    {legendReference[barName]}
                  </text>
                </g>)
          }
        </g>
      </svg>
    );
  }
  public componentDidMount (): void {
    this.resizeChart();
    this.resizeOb = new ResizeObserver((entries: any[]) => {
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
  }

  public componentWillReceiveProps (newProps: HorizontalBarProps): void {
    if (newProps.groups.length >= this.props.groups.length) {
      const colorArray = [...this.state.colorArray];
      while (colorArray.length < newProps.groups.length) {
        colorArray.push(randomColor());
      }
      this.setState({ colorArray });
    } else if (newProps.groups.length < this.props.groups.length) {
      let colorArray = [...this.state.colorArray];
      colorArray = colorArray.slice(0, newProps.groups.length);
      this.setState({ colorArray });
    }
  }

  public componentWillUnmount (): void {
    this.resizeOb.disconnect();
  }

  private resizeChart (): void {
    const parent = this.chartSVG.parentElement;
    const cr = parent.getBoundingClientRect();
    const width = cr.width;
    const height = cr.height;
    const innerWidth = width - this.props.margin.left - this.props.margin.right;
    const innerHeight = height - this.props.margin.top - this.props.margin.bottom;
    this.setState({ innerWidth, innerHeight, height, width });
  }

  private createBars = (y0: ScaleBand<string>, y1: ScaleBand<string>, x: ScaleLinear<number, number>,
    groups: string[], colourScale: ScaleOrdinal<string, string>) => {
    return groups.map((group) =>
      <g transform={`translate(0, ${y0(group)})`}>
        {
          this.props.data[group].map((entry) =>
            <rect height={y1.bandwidth()} x={0} y={y1(entry.name as string)}
              width={x(entry.value)} fill={colourScale(entry.name as string)}
              title={entry.value.toFixed(4)}>
            </rect>)
        }
      </g>,
    );
  }
}
