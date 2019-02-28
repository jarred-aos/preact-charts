import { Component } from 'preact';
import { AxisScale } from 'd3-axis';
export declare const tickLabel: string;
export declare const gridStyle: string;
interface AxisProps {
    height?: number;
    width?: number;
    scale: AxisScale<any>;
    axisType: string;
    ticks?: number;
    grid?: boolean;
    rotateScaleText?: boolean;
    offsetX?: number;
}
export declare class Axis extends Component<AxisProps> {
    static defaultProps: AxisProps;
    private axis;
    private grid;
    render({ height, axisType, grid, offsetX }: AxisProps): JSX.Element;
    componentDidMount: () => void;
    componentDidUpdate: () => void;
    private renderAxis;
}
export {};
