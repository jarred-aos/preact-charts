import { h, Component } from 'preact';
import { select } from 'd3-selection';
import { axisBottom, axisLeft } from 'd3-axis';
import { css } from 'goober';
export const tickLabel = css({
    'font-size': '1em',
    'cursor': 'default',
    'user-select': 'none',
    '>.tick>line': {
        'stroke-width': '1px',
        'stroke-opacity': 0.5,
        'shape-rendering': 'crispEdges',
    },
    '>path': {
        'stroke-width': '2px',
    },
});
export const gridStyle = css({
    '>path': {
        stroke: 'none',
    },
    '>.tick>line': {
        'stroke-width': '1px',
        'stroke-opacity': 0.5,
    },
});
export class Axis extends Component {
    constructor() {
        super(...arguments);
        this.componentDidMount = () => { this.renderAxis(); };
        this.componentDidUpdate = () => { this.renderAxis(); };
        this.renderAxis = () => {
            if (this.props.axisType === 'x') {
                select(this.axis).call(axisBottom(this.props.scale).ticks(this.props.ticks));
                if (this.props.rotateScaleText) {
                    select(this.axis).selectAll('text').attr('dx', '-.8em').attr('dy', '.15em')
                        .style('text-anchor', 'end').attr('transform', 'rotate(-65)');
                }
                if (this.props.grid) {
                    select(this.grid).call(axisBottom(this.props.scale)
                        .ticks(this.props.ticks).tickSize(-this.props.height).tickFormat(''));
                }
            }
            else if (this.props.axisType === 'y') {
                select(this.axis).call(axisLeft(this.props.scale).ticks(this.props.ticks));
                if (this.props.grid) {
                    select(this.grid).call(axisLeft(this.props.scale)
                        .ticks(this.props.ticks).tickSize(-this.props.width).tickFormat(''));
                }
            }
        };
    }
    render({ height, axisType, grid, offsetX }) {
        const translate = offsetX ? `translate(${offsetX}, 0)` : `translate(0, ${height})`;
        const shouldOffset = axisType.toLowerCase() === 'x' || offsetX !== undefined;
        return (h("g", null,
            h("g", { ref: (axis) => this.axis = axis, class: tickLabel, transform: shouldOffset ? translate : '' }),
            grid &&
                h("g", { ref: (gridline) => this.grid = gridline, class: gridStyle, transform: shouldOffset ? translate : '' })));
    }
}
Axis.defaultProps = {
    height: null,
    width: null,
    scale: null,
    axisType: null,
    ticks: 6,
    grid: false,
    rotateScaleText: false,
};
//# sourceMappingURL=index.js.map