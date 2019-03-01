var t=require("d3-axis"),e=require("d3-selection"),i=require("d3-brush"),n=require("d3-scale"),r=require("d3-shape"),a=require("d3-array"),o=require("preact"),h=require("typestyle"),s=h.style({fontSize:"1em",cursor:"default",userSelect:"none",$nest:{"&>.tick>line":{strokeWidth:"1px",strokeOpacity:.5,shapeRendering:"crispEdges"},"&>path":{strokeWidth:"2px"}}}),c=h.style({$nest:{"&>path":{stroke:"none"},"&>.tick>line":{strokeWidth:"1px",strokeOpacity:.5}}}),l=function(i){function n(){var n=this;i.apply(this,arguments),this.componentDidMount=function(){n.renderAxis()},this.componentDidUpdate=function(){n.renderAxis()},this.renderAxis=function(){"x"===n.props.axisType?(e.select(n.axis).call(t.axisBottom(n.props.scale).ticks(n.props.ticks)),n.props.rotateScaleText&&e.select(n.axis).selectAll("text").attr("dx","-.8em").attr("dy",".15em").style("text-anchor","end").attr("transform","rotate(-65)"),n.props.grid&&e.select(n.grid).call(t.axisBottom(n.props.scale).ticks(n.props.ticks).tickSize(-n.props.height).tickFormat(""))):"y"===n.props.axisType&&(e.select(n.axis).call(t.axisLeft(n.props.scale).ticks(n.props.ticks)),n.props.grid&&e.select(n.grid).call(t.axisLeft(n.props.scale).ticks(n.props.ticks).tickSize(-n.props.width).tickFormat("")))}}return i&&(n.__proto__=i),(n.prototype=Object.create(i&&i.prototype)).constructor=n,n.prototype.render=function(t){var e=this,i=t.grid,n=t.offsetX,r=n?"translate("+n+", 0)":"translate(0, "+t.height+")",a="x"===t.axisType.toLowerCase()||void 0!==n;return o.h("g",null,o.h("g",{ref:function(t){return e.axis=t},class:s,transform:a?r:""}),i&&o.h("g",{ref:function(t){return e.grid=t},class:c,transform:a?r:""}))},n}(o.Component);function p(t,e){return t.map(function(t){if(null!==t[e])return t[e]})}function d(t,e){return[].concat(new Set(p(t,e)))}l.defaultProps={height:null,width:null,scale:null,axisType:null,ticks:6,grid:!1,rotateScaleText:!1};var u=function(t){function e(e){var i=this;t.call(this,e),this.createBars=function(t,e){return i.props.data.map(function(i){return o.h("rect",{height:t.bandwidth(),x:e(Math.min(0,i.value)),y:t(i.name),width:Math.abs(e(i.value)-e(0)),fill:i.value<0?"darkred":"green",title:i.value.toFixed(4)})})},this.state={height:e.height,innerHeight:e.height-e.margin.top-e.margin.bottom,width:e.width,innerWidth:e.width-e.margin.right-e.margin.left}}return t&&(e.__proto__=t),(e.prototype=Object.create(t&&t.prototype)).constructor=e,e.prototype.render=function(t,e){var i=this,r=t.margin,h=t.ticks,s=t.data,c=t.name,d=e.height,u=e.width,g=e.innerHeight,f=e.innerWidth,m=s.map(function(t){return Math.abs(t.value)}),x=a.max(m),y=[-x,x],b=p(s,"name"),v=n.scaleLinear().range([0,f]).domain(y).nice(),w=n.scaleBand().rangeRound([g,0]).paddingInner(.1).domain(b);return o.h("svg",{ref:function(t){return i.chartSVG=t},class:c,height:d,width:u},o.h("g",{transform:"translate("+r.left+", "+r.top+")"},s&&this.createBars(w,v),o.h(l,{height:g,axisType:"x",scale:v,rotateScaleText:!1,grid:!0}),o.h(l,{width:f,axisType:"y",scale:w,ticks:h,offsetX:v(0)})))},e.prototype.componentDidMount=function(){var t=this;this.resizeChart(),this.resizeOb=new ResizeObserver(function(e){for(var i=0,n=e;i<n.length;i+=1){var r=n[i].contentRect;r.width===t.state.width&&r.height===t.state.height||t.resizeChart()}}),this.resizeOb.observe(this.chartSVG.parentElement)},e.prototype.componentWillUnmount=function(){this.resizeOb.disconnect()},e.prototype.resizeChart=function(){var t=this.chartSVG.parentElement.getBoundingClientRect(),e=t.width,i=t.height;this.setState({innerWidth:e-this.props.margin.left-this.props.margin.right,innerHeight:i-this.props.margin.top-this.props.margin.bottom,height:i,width:e})},e}(o.Component);u.defaultProps={height:800,width:600,margin:{top:25,right:25,bottom:50,left:25},ticks:8};var g=["#4f8cff","#d3fe14","#fe1c3a","#fdd8eb","#01a571","#e609fd","#c48c0d","#70fffe","#968791","#b7ce9d","#c7a2fe","#fb7fb4","#26d10a","#24b6cb","#feaa83","#bed8fc","#47ffa4","#c76f5e","#fec82c","#799922","#fe7314","#8aa9a0","#f219a8","#ae74bc","#8fa2ca","#21d4b3","#dfefe9","#9873fd","#959064","#c4b2b0","#b1c60c","#fd82fe","#ffdea7","#cafc9d","#dca7d0","#69c979","#55ff07","#c16d91","#9cd2d1","#70c3ff","#c9ad70","#ff7874","#fc9c0f","#b2ffd6","#ee4c7a","#d7949a","#e2cafd","#08a90f","#6a94a2","#2cdefb","#139ad4","#9eb35d","#de67c5","#c05afe","#ae98c1","#b3bbc8","#21a499","#d88b52","#969cfe","#77a374","#feb4be","#90e466","#f7ef6a","#e6532c","#ccaf23","#e9e9fd","#8986c4","#b08978","#e3d4c9","#b2baf7","#cbcf67","#baf0fe","#48f8cf","#ce6e0c","#a7ac90","#8dd9ae","#e2f2c4","#89b5c6","#f7ba67","#72b93c","#bac6bc","#ffb0fe","#858f84","#d08edc","#a09538","#939aa5","#bb8ba8","#5ab597","#b08148","#69a5eb","#d4c2d5","#fd0edf","#ae85e1","#e3bc9c","#4ca14f","#dadd11","#d869ec","#a1a90e","#60c2bf","#8ebc96"],f=function(t){function e(e){var i=this;t.call(this,e),this.createBars=function(t,e,n,r,a,h){return a.map(function(a){return o.h("g",{transform:"translate("+t(a)+", 0)"},i.props.data[a].map(function(t){return o.h("rect",{width:e.bandwidth(),x:e(t.name),y:n(t.value),height:r-n(t.value),fill:h(t.name),title:t.value.toFixed(4)})}))})},this.state={height:e.height,innerHeight:e.height-e.margin.top-e.margin.bottom,width:e.width,innerWidth:e.width-e.margin.right-e.margin.left}}return t&&(e.__proto__=t),(e.prototype=Object.create(t&&t.prototype)).constructor=e,e.prototype.render=function(t,e){for(var i=this,r=t.margin,h=t.ticks,s=t.data,c=t.groups,p=t.legendReference,u=t.name,f=e.height,m=e.width,x=e.innerHeight,y=e.innerWidth,b=0,v=0,w=c;v<w.length;v+=1){var S=a.max(s[w[v]],function(t){return t.value});b=S>b?S:b}var k=d(s[c[0]],"name"),C=n.scaleLinear().range([x,0]).domain([0,b]).nice(),z=n.scaleBand().rangeRound([0,y]).paddingInner(.1).domain(c),O=n.scaleBand().padding(.05).domain(k).rangeRound([0,z.bandwidth()]),_=n.scaleOrdinal(g);return o.h("svg",{ref:function(t){return i.chartSVG=t},class:u,height:f,width:m},o.h("g",{transform:"translate("+r.left+", "+r.top+")"},o.h(l,{height:x,axisType:"x",scale:z,rotateScaleText:!0}),o.h(l,{width:y,axisType:"y",scale:C,grid:!0,ticks:h}),s&&this.createBars(z,O,C,x,c,_),k&&k.map(function(t,e){return o.h("g",{transform:"translate(0, "+20*e+")"},o.h("rect",{x:y+r.right-18,width:18,height:15,strokeWidth:"1px",fill:_(t)}),o.h("text",{x:y+r.right-24,y:9,dy:"0.35em","text-anchor":"end"},p[t]))})))},e.prototype.componentDidMount=function(){var t=this;this.resizeChart(),this.resizeOb=new ResizeObserver(function(e){for(var i=0,n=e;i<n.length;i+=1){var r=n[i].contentRect;r.width===t.state.width&&r.height===t.state.height||t.resizeChart()}}),this.resizeOb.observe(this.chartSVG.parentElement)},e.prototype.componentWillUnmount=function(){this.resizeOb.disconnect()},e.prototype.resizeChart=function(){var t=this.chartSVG.parentElement.getBoundingClientRect(),e=t.width,i=t.height;this.setState({innerWidth:e-this.props.margin.left-this.props.margin.right,innerHeight:i-this.props.margin.top-this.props.margin.bottom,height:i,width:e})},e}(o.Component);f.defaultProps={height:500,width:500,margin:{top:25,right:25,bottom:75,left:50},ticks:6};var m=h.style({fillOpacity:1,strokeWidth:"1px"}),x=function(t){function e(e){t.call(this,e),this.state={width:e.width,height:e.height,innerWidth:e.width-e.margin.left-e.margin.right,innerHeight:e.height-e.margin.top-e.margin.bottom}}return t&&(e.__proto__=t),(e.prototype=Object.create(t&&t.prototype)).constructor=e,e.prototype.render=function(t,e){var i=this,r=t.name,h=t.margin,s=t.x,c=t.ticks,p=t.barColour,d=t.barOutline,u=e.height,g=e.width,f=e.innerHeight,x=e.innerWidth,y=t.data.map(function(t){return t[s]}),b=a.min(y),v=1.01*a.max(y),w=n.scaleLinear().rangeRound([0,x]).domain([b,v]).nice(),S=a.histogram().domain(w.domain()).thresholds(w.ticks(c))(y),k=a.max(S,function(t){return t.length}),C=n.scaleLinear().range([f,0]).domain([0,k]),z=w(S[0].x1)-w(S[0].x0);return o.h("svg",{ref:function(t){return i.chartSVG=t},class:r,height:u,width:g},o.h("g",{transform:"translate("+h.left+", "+h.top+")"},o.h(l,{height:f,axisType:"x",scale:w,ticks:c,rotateScaleText:!0}),o.h(l,{width:x,axisType:"y",scale:C,grid:!0,ticks:8}),z&&S.map(function(t){return o.h("rect",{class:m,x:"1",width:z,height:f-C(t.length),transform:"translate("+w(t.x0)+", "+C(t.length)+")",fill:p,stroke:d})})))},e.prototype.componentDidMount=function(){var t=this;this.resizeChart(),this.resizeOb=new ResizeObserver(function(e){for(var i=0,n=e;i<n.length;i+=1){var r=n[i].contentRect;r.width===t.state.width&&r.height===t.state.height||t.resizeChart()}}),this.resizeOb.observe(this.chartSVG.parentElement)},e.prototype.componentWillUnmount=function(){this.resizeOb.disconnect()},e.prototype.resizeChart=function(){var t=this.chartSVG.parentElement.getBoundingClientRect(),e=t.width,i=t.height;this.setState({innerWidth:e-this.props.margin.left-this.props.margin.right,innerHeight:i-this.props.margin.top-this.props.margin.bottom,height:i,width:e})},e}(o.Component);x.defaultProps={height:250,width:350,margin:{top:25,right:25,bottom:75,left:50},ticks:8,barColour:"steelblue",barOutline:"black"};var y=function(t){function e(e){var i=this;t.call(this,e),this.createBars=function(t,e,n,r,a){return r.map(function(r){return o.h("g",{transform:"translate(0, "+t(r)+")"},i.props.data[r].map(function(t){return o.h("rect",{height:e.bandwidth(),x:0,y:e(t.name),width:n(t.value),fill:a(t.name),title:t.value.toFixed(4)})}))})},this.state={height:e.height,innerHeight:e.height-e.margin.top-e.margin.bottom,width:e.width,innerWidth:e.width-e.margin.right-e.margin.left}}return t&&(e.__proto__=t),(e.prototype=Object.create(t&&t.prototype)).constructor=e,e.prototype.render=function(t,e){for(var i=this,r=t.margin,h=t.ticks,s=t.data,c=t.groups,p=t.name,u=t.legendReference,f=e.height,m=e.width,x=e.innerHeight,y=e.innerWidth,b=0,v=0,w=c;v<w.length;v+=1){var S=a.max(s[w[v]],function(t){return t.value});b=S>b?S:b}var k=d(s[c[0]],"name"),C=n.scaleLinear().range([0,y]).domain([0,b]).nice(),z=n.scaleBand().rangeRound([x,0]).paddingInner(.1).domain(c),O=n.scaleBand().padding(.05).domain(k).rangeRound([0,z.bandwidth()]),_=n.scaleOrdinal(g);return o.h("svg",{ref:function(t){return i.chartSVG=t},class:p,height:f,width:m},o.h("g",{transform:"translate("+r.left+", "+r.top+")"},o.h(l,{height:x,axisType:"x",scale:C,rotateScaleText:!1,grid:!0}),o.h(l,{width:y,axisType:"y",scale:z,ticks:h}),s&&this.createBars(z,O,C,c,_),k&&k.map(function(t,e){return o.h("g",{transform:"translate(0, "+20*e+")"},o.h("rect",{x:y+r.right-18,width:18,height:15,stroke:"black",strokeWidth:"1px",fill:_(t)}),o.h("text",{x:y+r.right-24,y:9,dy:"0.35em",fill:"whitesmoke","text-anchor":"end"},u[t]))})))},e.prototype.componentDidMount=function(){var t=this;this.resizeChart(),this.resizeOb=new ResizeObserver(function(e){for(var i=0,n=e;i<n.length;i+=1){var r=n[i].contentRect;r.width===t.state.width&&r.height===t.state.height||t.resizeChart()}}),this.resizeOb.observe(this.chartSVG.parentElement)},e.prototype.componentWillUnmount=function(){this.resizeOb.disconnect()},e.prototype.resizeChart=function(){var t=this.chartSVG.parentElement.getBoundingClientRect(),e=t.width,i=t.height;this.setState({innerWidth:e-this.props.margin.left-this.props.margin.right,innerHeight:i-this.props.margin.top-this.props.margin.bottom,height:i,width:e})},e}(o.Component);y.defaultProps={height:800,width:600,margin:{top:25,right:25,bottom:50,left:150},ticks:6};var b=function(t){function h(e){t.call(this,e);var i=e.width-e.margin.left-e.margin.right,n=e.height-e.margin.top-e.margin.bottom,r=e.data.flat(),o=a.extent(r,function(t){return t[e.x]}),h=[.95*o[0],1.05*o[1]],s=a.extent(r,function(t){return t[e.y]});this.state={width:e.width,height:e.height,innerWidth:i,innerHeight:n,xDomain:h,yDomain:[.95*s[0],1.05*s[1]]}}return t&&(h.__proto__=t),(h.prototype=Object.create(t&&t.prototype)).constructor=h,h.prototype.render=function(t,e){var i=this,a=e.height,h=e.width,s=e.innerHeight,c=e.innerWidth,p=e.xDomain,d=e.yDomain;this.xScale=n.scaleLinear().range([0,c]).domain(p),this.yScale=n.scaleLinear().range([s,0]).domain(d);var u=r.line().x(function(e){return i.xScale(e[t.x])}).y(function(e){return i.yScale(e[t.y])}).curve(r.curveNatural);return o.h("svg",{ref:function(t){return i.chartSVG=t},class:t.name,height:a,width:h},o.h("g",{transform:"translate("+t.margin.left+", "+t.margin.top+")"},o.h("clipPath",{id:t.name+"_cp"},o.h("rect",{width:c,height:s})),o.h(l,{height:s,axisType:"x",scale:this.xScale,grid:!0}),o.h(l,{width:c,axisType:"y",scale:this.yScale,grid:!0}),t.data.map(function(e,n){return o.h("g",null,o.h("path",{d:u(e),"clip-path":"url(#"+t.name+"_cp)","stroke-linecap":"round",stroke:g[n],fill:"none","stroke-width":"2px"}),e.map(function(e,r){return o.h("circle",{"stroke-width":"1px",r:t.radius,cx:i.xScale(e[t.x]),cy:i.yScale(e[t.y]),key:r,fill:g[n],"clip-path":"url(#"+t.name+"_cp)"})}))}),t.labels&&o.h("text",{x:c/2,y:s+t.margin.bottom-15},t.x.replace(/_/g," ")),t.labels&&o.h("text",{x:-s/2,y:15-t.margin.left,transform:"rotate(-90)"},t.y.replace(/_/g," ")),t.legendReference&&t.legendReference.map(function(e,i){return o.h("g",{transform:"translate(0, "+20*i+")"},o.h("rect",{x:c+t.margin.right-18,width:18,height:15,strokeWidth:"1px",fill:g[i]}),o.h("text",{x:c+t.margin.right-24,y:9,dy:"0.35em","text-anchor":"end"},e.replace(/_/g," ")))}),o.h("g",{ref:function(t){return i.brush=t},key:1})))},h.prototype.componentDidMount=function(){var t=this;this.resizeChart(),this.resizeOb=new ResizeObserver(function(e){for(var i=0,n=e;i<n.length;i+=1){var r=n[i].contentRect;r.width===t.state.width&&r.height===t.state.height||t.resizeChart()}}),this.resizeOb.observe(this.chartSVG.parentElement)},h.prototype.componentWillReceiveProps=function(t,e){var i=t.data.flat(),n=a.extent(i,function(e){return e[t.x]}),r=[.95*n[0],1.05*n[1]],o=a.extent(i,function(e){return e[t.y]});this.setState({yDomain:[.95*o[0],1.05*o[1]],xDomain:r})},h.prototype.componentWillUnmount=function(){this.resizeOb.disconnect()},h.prototype.resizeChart=function(){var t=this,n=this.chartSVG.parentElement.getBoundingClientRect(),r=n.width,o=n.height,h=r-this.props.margin.left-this.props.margin.right,s=o-this.props.margin.top-this.props.margin.bottom;this.brushSetup=i.brush().extent([[0,0],[h,s]]).handleSize(10).on("end",function(){var i=e.event.selection;if(null===i){var n=t.props.data.flat(),r=a.extent(n,function(e){return e[t.props.x]}),o=[.95*r[0],1.05*r[1]],h=a.extent(n,function(e){return e[t.props.y]});t.setState({xDomain:o,yDomain:[.95*h[0],1.05*h[1]]})}else{var s=[i[0][0],i[1][0]].map(t.xScale.invert,t.xScale),c=[i[1][1],i[0][1]].map(t.yScale.invert,t.yScale);e.select(t.brush).call(t.brushSetup.move,null),t.setState({xDomain:s,yDomain:c})}}),e.select(this.brush).call(this.brushSetup),this.setState({innerWidth:h,innerHeight:s,height:o,width:r})},h}(o.Component);b.defaultProps={height:500,width:500,margin:{top:25,right:25,bottom:75,left:75},radius:5,labels:!1};var v=function(t){function s(e){var i=this;t.call(this,e),this.componentDidMount=function(){i.resizeChart(),i.resizeOb=new ResizeObserver(function(t){for(var e=0,n=t;e<n.length;e+=1){var r=n[e].contentRect;r.width===i.state.width&&r.height===i.state.height||i.resizeChart()}}),i.resizeOb.observe(i.chartSVG.parentElement)},this.brushClass=h.style({$nest:{"&>rect.handle":{fill:e.brushColour}}}),this.state={width:e.width,height:e.height,innerWidth:e.width-e.margin.left-e.margin.right,innerHeight:e.height-e.margin.top-e.margin.bottom}}return t&&(s.__proto__=t),(s.prototype=Object.create(t&&t.prototype)).constructor=s,s.prototype.render=function(t,e){var i=this,h=e.width,s=e.height,c=e.innerWidth,p=e.innerHeight;this.xScale=n.scaleTime().range([0,c]).domain([a.min(t.data,function(t){return t.timestamp}),a.max(t.data,function(t){return t.timestamp})]);var d=n.scaleLinear().range([p,0]).domain([a.min(t.data,function(e){return+e[t.y]}),a.max(t.data,function(e){return+e[t.y]})]),u=r.area().x(function(t){return i.xScale(t.timestamp)}).y0(p).y1(function(e){return d(+e[t.y])});return o.h("svg",{ref:function(t){return i.chartSVG=t},class:t.name,height:s,width:h},o.h("g",{transform:"translate("+t.margin.left+", "+t.margin.top+")"},o.h(l,{height:p,axisType:"x",scale:this.xScale}),o.h(l,{width:c,axisType:"y",scale:d,grid:!0,ticks:0}),o.h("path",{d:u(t.data),"stroke-linecap":"round",stroke:t.lineColour,fill:t.fillColour,"stroke-width":"1px"}),o.h("g",{ref:function(t){return i.brush=t},class:this.brushClass})))},s.prototype.componentWillUnmount=function(){this.resizeOb.disconnect(),e.select(this.brush).call(this.brushSetup.move,null)},s.prototype.resizeChart=function(){var t=this,n=this.chartSVG.parentElement.getBoundingClientRect(),r=n.width,a=n.height,o=r-this.props.margin.left-this.props.margin.right,h=a-this.props.margin.top-this.props.margin.bottom;this.xScale.range([0,o]),this.brushSetup=i.brushX().extent([[0,0],[o,h]]).handleSize(10).on("end",function(){var i=e.event.selection||[0,o],n=[t.xScale.invert(i[0]),t.xScale.invert(i[1])];t.setState({extent:e.event.selection?n:null}),t.props.onBrush(n)});var s=e.select(this.brush);s.call(this.brushSetup);var c=null==this.state.extent?null:[this.xScale(this.state.extent[0]),this.xScale(this.state.extent[1])];s.call(this.brushSetup.move,c),this.setState({innerWidth:o,innerHeight:h,height:a,width:r})},s}(o.Component);v.defaultProps={height:200,width:1e3,margin:{top:25,right:25,bottom:75,left:75},lineColour:"steelblue",fillColour:"steelblue",onBrush:function(){},brushColour:"darkgoldenrod"};var w=h.style({strokeWidth:"1px"}),S=function(t){function r(e){t.call(this,e);var i=e.width-e.margin.left-e.margin.right,n=e.height-e.margin.top-e.margin.bottom,r=a.extent(e.data,function(t){return t[e.x]}),o=[.95*r[0],1.05*r[1]],h=a.extent(e.data,function(t){return t[e.y]});this.state={width:e.width,height:e.height,innerWidth:i,innerHeight:n,xDomain:o,yDomain:[.95*h[0],1.05*h[1]]}}return t&&(r.__proto__=t),(r.prototype=Object.create(t&&t.prototype)).constructor=r,r.prototype.render=function(t,e){var i=this,r=e.height,a=e.width,h=e.innerHeight,s=e.innerWidth,c=e.xDomain,p=e.yDomain;return this.xScale=n.scaleLinear().range([0,s]).domain(c),this.yScale=n.scaleLinear().range([h,0]).domain(p),o.h("svg",{ref:function(t){return i.chartSVG=t},class:t.name,height:r,width:a},o.h("g",{transform:"translate("+t.margin.left+", "+t.margin.top+")"},o.h("clipPath",{id:t.name+"_cp"},o.h("rect",{width:s,height:h})),o.h(l,{height:h,axisType:"x",scale:this.xScale,grid:!0}),o.h(l,{width:s,axisType:"y",scale:this.yScale,grid:!0}),t.data.map(function(e,n){return o.h("circle",{class:w,r:t.radius,cx:i.xScale(e[t.x]),cy:i.yScale(e[t.y]),key:n,"clip-path":"url(#"+t.name+"_cp)",fill:t.dotFill,stroke:t.dotBorder})}),t.labels&&o.h("text",{x:s/2,y:h+t.margin.bottom-15},t.x.replace(/_/g," ")),t.labels&&o.h("text",{x:-h/2,y:15-t.margin.left,transform:"rotate(-90)"},t.y.replace(/_/g," ")),o.h("g",{ref:function(t){return i.brush=t}})))},r.prototype.componentDidMount=function(){var t=this;this.resizeChart(),this.resizeOb=new ResizeObserver(function(e){for(var i=0,n=e;i<n.length;i+=1){var r=n[i].contentRect;r.width===t.state.width&&r.height===t.state.height||t.resizeChart()}}),this.resizeOb.observe(this.chartSVG.parentElement)},r.prototype.componentWillReceiveProps=function(t,e){var i=a.extent(t.data,function(e){return e[t.x]}),n=[.95*i[0],1.05*i[1]],r=a.extent(t.data,function(e){return e[t.y]});this.setState({yDomain:[.95*r[0],1.05*r[1]],xDomain:n})},r.prototype.componentWillUnmount=function(){this.resizeOb.disconnect()},r.prototype.resizeChart=function(){var t=this,n=this.chartSVG.parentElement.getBoundingClientRect(),r=n.width,o=n.height,h=r-this.props.margin.left-this.props.margin.right,s=o-this.props.margin.top-this.props.margin.bottom;this.brushSetup=i.brush().extent([[0,0],[h,s]]).handleSize(10).on("end",function(){var i=e.event.selection;if(null===i){var n=a.extent(t.props.data,function(e){return e[t.props.x]}),r=[.95*n[0],1.05*n[1]],o=a.extent(t.props.data,function(e){return e[t.props.y]});t.setState({xDomain:r,yDomain:[.95*o[0],1.05*o[1]]})}else{var h=[i[0][0],i[1][0]].map(t.xScale.invert,t.xScale),s=[i[1][1],i[0][1]].map(t.yScale.invert,t.yScale);e.select(t.brush).call(t.brushSetup.move,null),t.setState({xDomain:h,yDomain:s})}}),e.select(this.brush).call(this.brushSetup),this.setState({innerWidth:h,innerHeight:s,height:o,width:r})},r}(o.Component);S.defaultProps={height:500,width:500,margin:{top:25,right:25,bottom:75,left:75},radius:5,labels:!1,dotFill:"steelblue",dotBorder:"whitesmoke"};var k=h.style({fill:"none",pointerEvents:"all",borderTop:"none",borderStyle:"none"}),C=h.style({textAnchor:"middle",userSelect:"none",cursor:"pointer",$nest:{"&>text":{width:"12px",fontSize:"1.2em"}}}),z=function(t){function e(e){var i=this;t.call(this,e),this.handleChangeYDomain=function(t){var e=i.state.yDomain,n=e[1];switch(t){case"topup":e[1]*=1.05;break;case"topdown":e[1]*=.95;break;case"botup":e[0]+=.05*n;break;case"botdown":e[0]-=.05*n}e[0]=e[0]<0?0:e[0],i.setState({yDomain:e})},this.handleMouseOver=function(){i.setState({isMouseOver:!0})},this.handleMouseOut=function(){i.setState({isMouseOver:!1})},this.handleMouseMove=function(t){var e=t.offsetX-i.props.margin.left,n=i.xScale.invert(e),r=e<.1*i.state.innerWidth?"start":e<.9*i.state.innerWidth?"middle":"end",a=i.bisectDate(i.props.data,n,1),o=i.props.data[a-1],h=i.props.data[a],s=void 0===h?o:+n-+o.timestamp>+h.timestamp-+n?h:o;i.setState({tooltipValues:[s.timestamp,s[i.props.y]],textAnchor:r})},this.bisectDate=function(t,e,n){return a.bisector(function(t){return t[i.props.x]}).left(t,e,n)};var n=e.width-e.margin.left-e.margin.right,r=e.height-e.margin.top-e.margin.bottom,o=a.extent(e.data,function(t){return+t[e.y]});this.state={width:e.width,height:e.height,innerWidth:n,innerHeight:r,isMouseOver:!1,tooltipValues:[null,null],textAnchor:"middle",yDomain:o}}return t&&(e.__proto__=t),(e.prototype=Object.create(t&&t.prototype)).constructor=e,e.prototype.render=function(t,e){var i=this,h=e.innerWidth,s=e.innerHeight,c=e.height,p=e.width,d=e.isMouseOver,u=e.tooltipValues,g=e.textAnchor,f=e.yDomain,m=this.props.children,x=t.extent.length>0?t.extent:a.extent(t.data,function(e){return+e[t.x]});this.xScale=n.scaleTime().range([0,h]).domain(x);var y=n.scaleLinear().range([s,0]).domain(f),b=r.line().x(function(e){return i.xScale(e[t.x])}).y(function(e){return y(+e[t.y])});return o.h("svg",{ref:function(t){return i.chartSVG=t},class:t.name,height:c,width:p},t.axisControl&&o.h("g",{class:C,stroke:t.controlColour,transform:"translate("+.3*t.margin.left+", "+(t.margin.top+5)+")"},o.h("text",{onClick:function(){return i.handleChangeYDomain("topup")}},"+"),o.h("text",{transform:"translate(0, 15)",onClick:function(){return i.handleChangeYDomain("topdown")}},"-")),t.axisControl&&o.h("g",{class:C,stroke:t.controlColour,transform:"translate("+.3*t.margin.left+", "+s+")"},o.h("text",{onClick:function(){return i.handleChangeYDomain("botup")}},"+"),o.h("text",{transform:"translate(0, 15)",onClick:function(){return i.handleChangeYDomain("botdown")}},"-")),o.h("g",{transform:"translate("+t.margin.left+", "+t.margin.top+")"},o.h("clipPath",{id:t.name+"_cp"},o.h("rect",{width:h,height:s})),o.h(l,{height:s,axisType:"x",scale:this.xScale}),o.h(l,{width:h,axisType:"y",scale:y,grid:!0}),o.h("path",{d:b(t.data),"clip-path":"url(#"+t.name+"_cp)","stroke-linecap":"round",stroke:t.lineColour,fill:"none","stroke-width":"2px"}),m[0]&&m.map(function(e){return o.cloneElement(e,{xScale:i.xScale,height:s,chartName:t.name})}),d&&null!==u[0]&&o.h("g",{transform:"translate("+this.xScale(u[0])+","+y(u[1])+")"},o.h("circle",{fill:"none","stroke-width":2,stroke:"gold",r:"6"}),o.h("text",{x:0,y:-15,dy:"0.5em","text-anchor":g},u[0].toLocaleDateString()+" "+u[0].toLocaleTimeString()+":\n                                        "+u[1].toFixed(4))),t.tooltip&&t.data.length>0&&o.h("rect",{class:k,width:h,height:s,onMouseMove:this.handleMouseMove,onMouseOver:this.handleMouseOver,onMouseOut:this.handleMouseOut}),m[0]&&m.map(function(e){return o.cloneElement(e,{xScale:i.xScale,height:s,chartName:t.name})})))},e.prototype.componentDidMount=function(){var t=this;this.resizeChart(),this.resizeOb=new ResizeObserver(function(e){for(var i=0,n=e;i<n.length;i+=1){var r=n[i].contentRect;r.width===t.state.width&&r.height===t.state.height||t.resizeChart()}}),this.resizeOb.observe(this.chartSVG.parentElement)},e.prototype.componentWillReceiveProps=function(t){var e=a.extent(t.data,function(e){return+e[t.y]});this.setState({yDomain:e})},e.prototype.componentWillUnmount=function(){this.resizeOb.disconnect()},e.prototype.resizeChart=function(){var t=this.chartSVG.parentElement.getBoundingClientRect(),e=t.width,i=t.height;this.setState({innerWidth:e-this.props.margin.left-this.props.margin.right,innerHeight:i-this.props.margin.top-this.props.margin.bottom,height:i,width:e})},e}(o.Component);z.defaultProps={height:200,width:1e3,margin:{top:25,right:25,bottom:75,left:75},lineColour:"lightblue",extent:[],tooltip:!0,axisControl:!0,controlColour:"goldenrod"};var O=h.style({fill:"gray",strokeWidth:1,strokeOpacity:.9,fillOpacity:.45,stroke:"lightgray",$nest:{"&:hover":{fill:"lightgray"}}}),_=h.style({fill:"red",fillOpacity:1}),W=h.style({fill:"lawngreen",fillOpacity:1}),D=function(t){function e(e){var i=this;t.call(this,e),this.handleFlagClick=function(t){t.stopPropagation(),i.props.onClick(i.props.event)}}return t&&(e.__proto__=t),(e.prototype=Object.create(t&&t.prototype)).constructor=e,e.prototype.render=function(t){var e=t.xScale,i=t.height,n=t.start,r=t.end,a=t.isClicked;return o.h("g",{class:O,onClick:this.handleFlagClick,"clip-path":"url(#"+t.chartName+"_cp)"},o.h("path",{d:"M "+e(n)+"                         "+i+" H "+e(r)+" V 20 H "+e(n)+" V "+i}),o.h("path",{class:a?W:_,d:"M "+e(r)+"                         20 L "+e(r)+" 0 L "+(e(r)-15)+" 8 L                         "+e(r)+" 16 V 20"}))},e}(o.Component);D.defaultProps={onClick:function(){},idx:0,event:0,start:"",end:"",type:"",sub_type:"",comment:null,chartName:"",isClicked:!1},exports.DifferenceChart=u,exports.GroupedBar=f,exports.Histogram=x,exports.HorizontalBar=y,exports.LineScatter=b,exports.RangeChart=v,exports.ScatterPlot=S,exports.TrendChart=z,exports.Flag=D;
//# sourceMappingURL=preactCharts.js.map
