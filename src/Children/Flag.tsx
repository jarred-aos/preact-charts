/* eslint-disable @typescript-eslint/camelcase */
import { h, Component, VNode } from 'preact';
import { ScaleTime } from 'd3-scale';
import { EventsData } from '../types';
import { css } from 'goober';;

const flagStyle = css({
  'fill': 'gray',
  'stroke-width': '1px',
  'stroke-opacity': 0.9,
  'fill-opacity': 0.45,
  'stroke': 'lightgray',
  '&:hover': {
    fill: 'lightgray',
    'fill-opacity': 0.45,
  },
});

const topperDefault = css({
  'fill': 'red',
  'fill-opacity': 1,
});

const topperClicked = css({
  'fill': 'lawngreen',
  'fill-opacity': 1,
});

interface FlagProps extends EventsData {
  onClick: (flagID: number) => void;
  xScale?: ScaleTime<number, number>;
  height?: number;
  chartName: string;
  isClicked: boolean;
}

export class Flag extends Component<FlagProps> {
  public static defaultProps: FlagProps = {
    onClick: () => {},
    idx: 0,
    event: 0,
    start: '',
    end: '',
    type: '',
    sub_type: '',
    comment: null,
    chartName: '',
    isClicked: false,
  };

  public constructor (props: FlagProps) {
    super(props);
  }
  public render ({ xScale, height, start, end, chartName, isClicked }: FlagProps): VNode {
    return (
      <g class={flagStyle} onClick={this.handleFlagClick} clip-path={`url(#${chartName}_cp)`}>
        <path
          d={`M ${xScale(start as Date)} \
              ${height} H ${xScale(end as Date)} V 20 H ${xScale(start as Date)} V ${height}`}>
        </path>
        <path class={isClicked ? topperClicked : topperDefault}
          d={`M ${xScale(end as Date)} \
              20 L ${xScale(end as Date)} 0 L ${xScale(end as Date) - 15} 8 L \
              ${xScale(end as Date)} 16 V 20`}>
        </path>
      </g>
    );
  }

  private handleFlagClick = (e: Event) => {
    e.stopPropagation();
    this.props.onClick(this.props.event);
  }
}
