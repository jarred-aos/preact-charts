import{axisBottom as t,axisLeft as e}from"d3-axis";import{select as i,event as r}from"d3-selection";import{brush as n,brushX as a}from"d3-brush";import{scaleLinear as o,scaleBand as h,scaleOrdinal as s,scaleTime as c}from"d3-scale";import{line as l,curveNatural as p,area as d}from"d3-shape";import{max as u,min as g,histogram as f,extent as m,bisector as b}from"d3-array";import{h as x,Component as y,cloneElement as v}from"preact";import{style as w}from"typestyle";var S=w({fontSize:"1em",cursor:"default",userSelect:"none",$nest:{"&>.tick>line":{strokeWidth:"1px",strokeOpacity:.5,shapeRendering:"crispEdges"},"&>path":{strokeWidth:"2px"}}}),k=w({$nest:{"&>path":{stroke:"none"},"&>.tick>line":{strokeWidth:"1px",strokeOpacity:.5}}}),C=function(r){function n(){var n=this;r.apply(this,arguments),this.componentDidMount=function(){n.renderAxis()},this.componentDidUpdate=function(){n.renderAxis()},this.renderAxis=function(){"x"===n.props.axisType?(i(n.axis).call(t(n.props.scale).ticks(n.props.ticks)),n.props.rotateScaleText&&i(n.axis).selectAll("text").attr("dx","-.8em").attr("dy",".15em").style("text-anchor","end").attr("transform","rotate(-65)"),n.props.grid&&i(n.grid).call(t(n.props.scale).ticks(n.props.ticks).tickSize(-n.props.height).tickFormat(""))):"y"===n.props.axisType&&(i(n.axis).call(e(n.props.scale).ticks(n.props.ticks)),n.props.grid&&i(n.grid).call(e(n.props.scale).ticks(n.props.ticks).tickSize(-n.props.width).tickFormat("")))}}return r&&(n.__proto__=r),(n.prototype=Object.create(r&&r.prototype)).constructor=n,n.prototype.render=function(t){var e=this,i=t.grid,r=t.offsetX,n=r?"translate("+r+", 0)":"translate(0, "+t.height+")",a="x"===t.axisType.toLowerCase()||void 0!==r;return x("g",null,x("g",{ref:function(t){return e.axis=t},class:S,transform:a?n:""}),i&&x("g",{ref:function(t){return e.grid=t},class:k,transform:a?n:""}))},n}(y);function z(t,e){return t.map(function(t){if(null!==t[e])return t[e]})}function O(t,e){return[].concat(new Set(z(t,e)))}C.defaultProps={height:null,width:null,scale:null,axisType:null,ticks:6,grid:!1,rotateScaleText:!1};var _=function(t){function e(e){var i=this;t.call(this,e),this.createBars=function(t,e){return i.props.data.map(function(i){return x("rect",{height:t.bandwidth(),x:e(Math.min(0,i.value)),y:t(i.name),width:Math.abs(e(i.value)-e(0)),fill:i.value<0?"darkred":"green",title:i.value.toFixed(4)})})},this.state={height:e.height,innerHeight:e.height-e.margin.top-e.margin.bottom,width:e.width,innerWidth:e.width-e.margin.right-e.margin.left}}return t&&(e.__proto__=t),(e.prototype=Object.create(t&&t.prototype)).constructor=e,e.prototype.render=function(t,e){var i=this,r=t.margin,n=t.ticks,a=t.data,s=t.name,c=e.height,l=e.width,p=e.innerHeight,d=e.innerWidth,g=a.map(function(t){return Math.abs(t.value)}),f=u(g),m=[-f,f],b=z(a,"name"),y=o().range([0,d]).domain(m).nice(),v=h().rangeRound([p,0]).paddingInner(.1).domain(b);return x("svg",{ref:function(t){return i.chartSVG=t},class:s,height:c,width:l},x("g",{transform:"translate("+r.left+", "+r.top+")"},a&&this.createBars(v,y),x(C,{height:p,axisType:"x",scale:y,rotateScaleText:!1,grid:!0}),x(C,{width:d,axisType:"y",scale:v,ticks:n,offsetX:y(0)})))},e.prototype.componentDidMount=function(){var t=this;this.resizeChart(),this.resizeOb=new ResizeObserver(function(e){for(var i=0,r=e;i<r.length;i+=1){var n=r[i].contentRect;n.width===t.state.width&&n.height===t.state.height||t.resizeChart()}}),this.resizeOb.observe(this.chartSVG.parentElement)},e.prototype.componentWillUnmount=function(){this.resizeOb.disconnect()},e.prototype.resizeChart=function(){var t=this.chartSVG.parentElement.getBoundingClientRect(),e=t.width,i=t.height;this.setState({innerWidth:e-this.props.margin.left-this.props.margin.right,innerHeight:i-this.props.margin.top-this.props.margin.bottom,height:i,width:e})},e}(y);_.defaultProps={height:800,width:600,margin:{top:25,right:25,bottom:50,left:25},ticks:8};var W=["#4f8cff","#d3fe14","#fe1c3a","#fdd8eb","#01a571","#e609fd","#c48c0d","#70fffe","#968791","#b7ce9d","#c7a2fe","#fb7fb4","#26d10a","#24b6cb","#feaa83","#bed8fc","#47ffa4","#c76f5e","#fec82c","#799922","#fe7314","#8aa9a0","#f219a8","#ae74bc","#8fa2ca","#21d4b3","#dfefe9","#9873fd","#959064","#c4b2b0","#b1c60c","#fd82fe","#ffdea7","#cafc9d","#dca7d0","#69c979","#55ff07","#c16d91","#9cd2d1","#70c3ff","#c9ad70","#ff7874","#fc9c0f","#b2ffd6","#ee4c7a","#d7949a","#e2cafd","#08a90f","#6a94a2","#2cdefb","#139ad4","#9eb35d","#de67c5","#c05afe","#ae98c1","#b3bbc8","#21a499","#d88b52","#969cfe","#77a374","#feb4be","#90e466","#f7ef6a","#e6532c","#ccaf23","#e9e9fd","#8986c4","#b08978","#e3d4c9","#b2baf7","#cbcf67","#baf0fe","#48f8cf","#ce6e0c","#a7ac90","#8dd9ae","#e2f2c4","#89b5c6","#f7ba67","#72b93c","#bac6bc","#ffb0fe","#858f84","#d08edc","#a09538","#939aa5","#bb8ba8","#5ab597","#b08148","#69a5eb","#d4c2d5","#fd0edf","#ae85e1","#e3bc9c","#4ca14f","#dadd11","#d869ec","#a1a90e","#60c2bf","#8ebc96"],D=function(t){function e(e){var i=this;t.call(this,e),this.createBars=function(t,e,r,n,a,o){return a.map(function(a){return x("g",{transform:"translate("+t(a)+", 0)"},i.props.data[a].map(function(t){return x("rect",{width:e.bandwidth(),x:e(t.name),y:r(t.value),height:n-r(t.value),fill:o(t.name),title:t.value.toFixed(4)})}))})},this.state={height:e.height,innerHeight:e.height-e.margin.top-e.margin.bottom,width:e.width,innerWidth:e.width-e.margin.right-e.margin.left}}return t&&(e.__proto__=t),(e.prototype=Object.create(t&&t.prototype)).constructor=e,e.prototype.render=function(t,e){for(var i=this,r=t.margin,n=t.ticks,a=t.data,c=t.groups,l=t.legendReference,p=t.name,d=e.height,g=e.width,f=e.innerHeight,m=e.innerWidth,b=0,y=0,v=c;y<v.length;y+=1){var w=u(a[v[y]],function(t){return t.value});b=w>b?w:b}var S=O(a[c[0]],"name"),k=o().range([f,0]).domain([0,b]).nice(),z=h().rangeRound([0,m]).paddingInner(.1).domain(c),_=h().padding(.05).domain(S).rangeRound([0,z.bandwidth()]),D=s(W);return x("svg",{ref:function(t){return i.chartSVG=t},class:p,height:d,width:g},x("g",{transform:"translate("+r.left+", "+r.top+")"},x(C,{height:f,axisType:"x",scale:z,rotateScaleText:!0}),x(C,{width:m,axisType:"y",scale:k,grid:!0,ticks:n}),a&&this.createBars(z,_,k,f,c,D),S&&S.map(function(t,e){return x("g",{transform:"translate(0, "+20*e+")"},x("rect",{x:m+r.right-18,width:18,height:15,strokeWidth:"1px",fill:D(t)}),x("text",{x:m+r.right-24,y:9,dy:"0.35em","text-anchor":"end"},l[t]))})))},e.prototype.componentDidMount=function(){var t=this;this.resizeChart(),this.resizeOb=new ResizeObserver(function(e){for(var i=0,r=e;i<r.length;i+=1){var n=r[i].contentRect;n.width===t.state.width&&n.height===t.state.height||t.resizeChart()}}),this.resizeOb.observe(this.chartSVG.parentElement)},e.prototype.componentWillUnmount=function(){this.resizeOb.disconnect()},e.prototype.resizeChart=function(){var t=this.chartSVG.parentElement.getBoundingClientRect(),e=t.width,i=t.height;this.setState({innerWidth:e-this.props.margin.left-this.props.margin.right,innerHeight:i-this.props.margin.top-this.props.margin.bottom,height:i,width:e})},e}(y);D.defaultProps={height:500,width:500,margin:{top:25,right:25,bottom:75,left:50},ticks:6};var R=w({fillOpacity:1,strokeWidth:"1px"}),M=function(t){function e(e){t.call(this,e),this.state={width:e.width,height:e.height,innerWidth:e.width-e.margin.left-e.margin.right,innerHeight:e.height-e.margin.top-e.margin.bottom}}return t&&(e.__proto__=t),(e.prototype=Object.create(t&&t.prototype)).constructor=e,e.prototype.render=function(t,e){var i=this,r=t.name,n=t.margin,a=t.x,h=t.ticks,s=t.barColour,c=t.barOutline,l=e.height,p=e.width,d=e.innerHeight,m=e.innerWidth,b=t.data.map(function(t){return t[a]}),y=g(b),v=1.01*u(b),w=o().rangeRound([0,m]).domain([y,v]).nice(),S=f().domain(w.domain()).thresholds(w.ticks(h))(b),k=u(S,function(t){return t.length}),z=o().range([d,0]).domain([0,k]),O=w(S[0].x1)-w(S[0].x0);return x("svg",{ref:function(t){return i.chartSVG=t},class:r,height:l,width:p},x("g",{transform:"translate("+n.left+", "+n.top+")"},x(C,{height:d,axisType:"x",scale:w,ticks:h,rotateScaleText:!0}),x(C,{width:m,axisType:"y",scale:z,grid:!0,ticks:8}),O&&S.map(function(t){return x("rect",{class:R,x:"1",width:O,height:d-z(t.length),transform:"translate("+w(t.x0)+", "+z(t.length)+")",fill:s,stroke:c})})))},e.prototype.componentDidMount=function(){var t=this;this.resizeChart(),this.resizeOb=new ResizeObserver(function(e){for(var i=0,r=e;i<r.length;i+=1){var n=r[i].contentRect;n.width===t.state.width&&n.height===t.state.height||t.resizeChart()}}),this.resizeOb.observe(this.chartSVG.parentElement)},e.prototype.componentWillUnmount=function(){this.resizeOb.disconnect()},e.prototype.resizeChart=function(){var t=this.chartSVG.parentElement.getBoundingClientRect(),e=t.width,i=t.height;this.setState({innerWidth:e-this.props.margin.left-this.props.margin.right,innerHeight:i-this.props.margin.top-this.props.margin.bottom,height:i,width:e})},e}(y);M.defaultProps={height:250,width:350,margin:{top:25,right:25,bottom:75,left:50},ticks:8,barColour:"steelblue",barOutline:"black"};var V=function(t){function e(e){var i=this;t.call(this,e),this.createBars=function(t,e,r,n,a){return n.map(function(n){return x("g",{transform:"translate(0, "+t(n)+")"},i.props.data[n].map(function(t){return x("rect",{height:e.bandwidth(),x:0,y:e(t.name),width:r(t.value),fill:a(t.name),title:t.value.toFixed(4)})}))})},this.state={height:e.height,innerHeight:e.height-e.margin.top-e.margin.bottom,width:e.width,innerWidth:e.width-e.margin.right-e.margin.left}}return t&&(e.__proto__=t),(e.prototype=Object.create(t&&t.prototype)).constructor=e,e.prototype.render=function(t,e){for(var i=this,r=t.margin,n=t.ticks,a=t.data,c=t.groups,l=t.name,p=t.legendReference,d=e.height,g=e.width,f=e.innerHeight,m=e.innerWidth,b=0,y=0,v=c;y<v.length;y+=1){var w=u(a[v[y]],function(t){return t.value});b=w>b?w:b}var S=O(a[c[0]],"name"),k=o().range([0,m]).domain([0,b]).nice(),z=h().rangeRound([f,0]).paddingInner(.1).domain(c),_=h().padding(.05).domain(S).rangeRound([0,z.bandwidth()]),D=s(W);return x("svg",{ref:function(t){return i.chartSVG=t},class:l,height:d,width:g},x("g",{transform:"translate("+r.left+", "+r.top+")"},x(C,{height:f,axisType:"x",scale:k,rotateScaleText:!1,grid:!0}),x(C,{width:m,axisType:"y",scale:z,ticks:n}),a&&this.createBars(z,_,k,c,D),S&&S.map(function(t,e){return x("g",{transform:"translate(0, "+20*e+")"},x("rect",{x:m+r.right-18,width:18,height:15,stroke:"black",strokeWidth:"1px",fill:D(t)}),x("text",{x:m+r.right-24,y:9,dy:"0.35em",fill:"whitesmoke","text-anchor":"end"},p[t]))})))},e.prototype.componentDidMount=function(){var t=this;this.resizeChart(),this.resizeOb=new ResizeObserver(function(e){for(var i=0,r=e;i<r.length;i+=1){var n=r[i].contentRect;n.width===t.state.width&&n.height===t.state.height||t.resizeChart()}}),this.resizeOb.observe(this.chartSVG.parentElement)},e.prototype.componentWillUnmount=function(){this.resizeOb.disconnect()},e.prototype.resizeChart=function(){var t=this.chartSVG.parentElement.getBoundingClientRect(),e=t.width,i=t.height;this.setState({innerWidth:e-this.props.margin.left-this.props.margin.right,innerHeight:i-this.props.margin.top-this.props.margin.bottom,height:i,width:e})},e}(y);V.defaultProps={height:800,width:600,margin:{top:25,right:25,bottom:50,left:150},ticks:6};var T=function(t){function e(e){t.call(this,e);var i=e.width-e.margin.left-e.margin.right,r=e.height-e.margin.top-e.margin.bottom,n=e.data.flat(),a=m(n,function(t){return t[e.x]}),o=[.95*a[0],1.05*a[1]],h=m(n,function(t){return t[e.y]});this.state={width:e.width,height:e.height,innerWidth:i,innerHeight:r,xDomain:o,yDomain:[.95*h[0],1.05*h[1]]}}return t&&(e.__proto__=t),(e.prototype=Object.create(t&&t.prototype)).constructor=e,e.prototype.render=function(t,e){var i=this,r=e.height,n=e.width,a=e.innerHeight,h=e.innerWidth,s=e.xDomain,c=e.yDomain;this.xScale=o().range([0,h]).domain(s),this.yScale=o().range([a,0]).domain(c);var d=l().x(function(e){return i.xScale(e[t.x])}).y(function(e){return i.yScale(e[t.y])}).curve(p);return x("svg",{ref:function(t){return i.chartSVG=t},class:t.name,height:r,width:n},x("g",{transform:"translate("+t.margin.left+", "+t.margin.top+")"},x("clipPath",{id:t.name+"_cp"},x("rect",{width:h,height:a})),x(C,{height:a,axisType:"x",scale:this.xScale,grid:!0}),x(C,{width:h,axisType:"y",scale:this.yScale,grid:!0}),t.data.map(function(e,r){return x("g",null,x("path",{d:d(e),"clip-path":"url(#"+t.name+"_cp)","stroke-linecap":"round",stroke:W[r],fill:"none","stroke-width":"2px"}),e.map(function(e,n){return x("circle",{"stroke-width":"1px",r:t.radius,cx:i.xScale(e[t.x]),cy:i.yScale(e[t.y]),key:n,fill:W[r],"clip-path":"url(#"+t.name+"_cp)"})}))}),t.labels&&x("text",{x:h/2,y:a+t.margin.bottom-15},t.x.replace(/_/g," ")),t.labels&&x("text",{x:-a/2,y:15-t.margin.left,transform:"rotate(-90)"},t.y.replace(/_/g," ")),t.legendReference&&t.legendReference.map(function(e,i){return x("g",{transform:"translate(0, "+20*i+")"},x("rect",{x:h+t.margin.right-18,width:18,height:15,strokeWidth:"1px",fill:W[i]}),x("text",{x:h+t.margin.right-24,y:9,dy:"0.35em","text-anchor":"end"},e.replace(/_/g," ")))}),x("g",{ref:function(t){return i.brush=t},key:1})))},e.prototype.componentDidMount=function(){var t=this;this.resizeChart(),this.resizeOb=new ResizeObserver(function(e){for(var i=0,r=e;i<r.length;i+=1){var n=r[i].contentRect;n.width===t.state.width&&n.height===t.state.height||t.resizeChart()}}),this.resizeOb.observe(this.chartSVG.parentElement)},e.prototype.componentWillReceiveProps=function(t,e){var i=t.data.flat(),r=m(i,function(e){return e[t.x]}),n=[.95*r[0],1.05*r[1]],a=m(i,function(e){return e[t.y]});this.setState({yDomain:[.95*a[0],1.05*a[1]],xDomain:n})},e.prototype.componentWillUnmount=function(){this.resizeOb.disconnect()},e.prototype.resizeChart=function(){var t=this,e=this.chartSVG.parentElement.getBoundingClientRect(),a=e.width,o=e.height,h=a-this.props.margin.left-this.props.margin.right,s=o-this.props.margin.top-this.props.margin.bottom;this.brushSetup=n().extent([[0,0],[h,s]]).handleSize(10).on("end",function(){var e=r.selection;if(null===e){var n=t.props.data.flat(),a=m(n,function(e){return e[t.props.x]}),o=[.95*a[0],1.05*a[1]],h=m(n,function(e){return e[t.props.y]});t.setState({xDomain:o,yDomain:[.95*h[0],1.05*h[1]]})}else{var s=[e[0][0],e[1][0]].map(t.xScale.invert,t.xScale),c=[e[1][1],e[0][1]].map(t.yScale.invert,t.yScale);i(t.brush).call(t.brushSetup.move,null),t.setState({xDomain:s,yDomain:c})}}),i(this.brush).call(this.brushSetup),this.setState({innerWidth:h,innerHeight:s,height:o,width:a})},e}(y);T.defaultProps={height:500,width:500,margin:{top:25,right:25,bottom:75,left:75},radius:5,labels:!1};var H=function(t){function e(e){var i=this;t.call(this,e),this.componentDidMount=function(){i.resizeChart(),i.resizeOb=new ResizeObserver(function(t){for(var e=0,r=t;e<r.length;e+=1){var n=r[e].contentRect;n.width===i.state.width&&n.height===i.state.height||i.resizeChart()}}),i.resizeOb.observe(i.chartSVG.parentElement)},this.brushClass=w({$nest:{"&>rect.handle":{fill:e.brushColour}}}),this.state={width:e.width,height:e.height,innerWidth:e.width-e.margin.left-e.margin.right,innerHeight:e.height-e.margin.top-e.margin.bottom}}return t&&(e.__proto__=t),(e.prototype=Object.create(t&&t.prototype)).constructor=e,e.prototype.render=function(t,e){var i=this,r=e.width,n=e.height,a=e.innerWidth,h=e.innerHeight;this.xScale=c().range([0,a]).domain([g(t.data,function(t){return t.timestamp}),u(t.data,function(t){return t.timestamp})]);var s=o().range([h,0]).domain([g(t.data,function(e){return+e[t.y]}),u(t.data,function(e){return+e[t.y]})]),l=d().x(function(t){return i.xScale(t.timestamp)}).y0(h).y1(function(e){return s(+e[t.y])});return x("svg",{ref:function(t){return i.chartSVG=t},class:t.name,height:n,width:r},x("g",{transform:"translate("+t.margin.left+", "+t.margin.top+")"},x(C,{height:h,axisType:"x",scale:this.xScale}),x(C,{width:a,axisType:"y",scale:s,grid:!0,ticks:0}),x("path",{d:l(t.data),"stroke-linecap":"round",stroke:t.lineColour,fill:t.fillColour,"stroke-width":"1px"}),x("g",{ref:function(t){return i.brush=t},class:this.brushClass})))},e.prototype.componentWillUnmount=function(){this.resizeOb.disconnect(),i(this.brush).call(this.brushSetup.move,null)},e.prototype.resizeChart=function(){var t=this,e=this.chartSVG.parentElement.getBoundingClientRect(),n=e.width,o=e.height,h=n-this.props.margin.left-this.props.margin.right,s=o-this.props.margin.top-this.props.margin.bottom;this.xScale.range([0,h]),this.brushSetup=a().extent([[0,0],[h,s]]).handleSize(10).on("end",function(){var e=r.selection||[0,h],i=[t.xScale.invert(e[0]),t.xScale.invert(e[1])];t.setState({extent:r.selection?i:null}),t.props.onBrush(i)});var c=i(this.brush);c.call(this.brushSetup);var l=null==this.state.extent?null:[this.xScale(this.state.extent[0]),this.xScale(this.state.extent[1])];c.call(this.brushSetup.move,l),this.setState({innerWidth:h,innerHeight:s,height:o,width:n})},e}(y);H.defaultProps={height:200,width:1e3,margin:{top:25,right:25,bottom:75,left:75},lineColour:"steelblue",fillColour:"steelblue",onBrush:function(){},brushColour:"darkgoldenrod"};var G=w({strokeWidth:"1px"}),B=function(t){function e(e){t.call(this,e);var i=e.width-e.margin.left-e.margin.right,r=e.height-e.margin.top-e.margin.bottom,n=m(e.data,function(t){return t[e.x]}),a=[.95*n[0],1.05*n[1]],o=m(e.data,function(t){return t[e.y]});this.state={width:e.width,height:e.height,innerWidth:i,innerHeight:r,xDomain:a,yDomain:[.95*o[0],1.05*o[1]]}}return t&&(e.__proto__=t),(e.prototype=Object.create(t&&t.prototype)).constructor=e,e.prototype.render=function(t,e){var i=this,r=e.height,n=e.width,a=e.innerHeight,h=e.innerWidth,s=e.xDomain,c=e.yDomain;return this.xScale=o().range([0,h]).domain(s),this.yScale=o().range([a,0]).domain(c),x("svg",{ref:function(t){return i.chartSVG=t},class:t.name,height:r,width:n},x("g",{transform:"translate("+t.margin.left+", "+t.margin.top+")"},x("clipPath",{id:t.name+"_cp"},x("rect",{width:h,height:a})),x(C,{height:a,axisType:"x",scale:this.xScale,grid:!0}),x(C,{width:h,axisType:"y",scale:this.yScale,grid:!0}),t.data.map(function(e,r){return x("circle",{class:G,r:t.radius,cx:i.xScale(e[t.x]),cy:i.yScale(e[t.y]),key:r,"clip-path":"url(#"+t.name+"_cp)",fill:t.dotFill,stroke:t.dotBorder})}),t.labels&&x("text",{x:h/2,y:a+t.margin.bottom-15},t.x.replace(/_/g," ")),t.labels&&x("text",{x:-a/2,y:15-t.margin.left,transform:"rotate(-90)"},t.y.replace(/_/g," ")),x("g",{ref:function(t){return i.brush=t}})))},e.prototype.componentDidMount=function(){var t=this;this.resizeChart(),this.resizeOb=new ResizeObserver(function(e){for(var i=0,r=e;i<r.length;i+=1){var n=r[i].contentRect;n.width===t.state.width&&n.height===t.state.height||t.resizeChart()}}),this.resizeOb.observe(this.chartSVG.parentElement)},e.prototype.componentWillReceiveProps=function(t,e){var i=m(t.data,function(e){return e[t.x]}),r=[.95*i[0],1.05*i[1]],n=m(t.data,function(e){return e[t.y]});this.setState({yDomain:[.95*n[0],1.05*n[1]],xDomain:r})},e.prototype.componentWillUnmount=function(){this.resizeOb.disconnect()},e.prototype.resizeChart=function(){var t=this,e=this.chartSVG.parentElement.getBoundingClientRect(),a=e.width,o=e.height,h=a-this.props.margin.left-this.props.margin.right,s=o-this.props.margin.top-this.props.margin.bottom;this.brushSetup=n().extent([[0,0],[h,s]]).handleSize(10).on("end",function(){var e=r.selection;if(null===e){var n=m(t.props.data,function(e){return e[t.props.x]}),a=[.95*n[0],1.05*n[1]],o=m(t.props.data,function(e){return e[t.props.y]});t.setState({xDomain:a,yDomain:[.95*o[0],1.05*o[1]]})}else{var h=[e[0][0],e[1][0]].map(t.xScale.invert,t.xScale),s=[e[1][1],e[0][1]].map(t.yScale.invert,t.yScale);i(t.brush).call(t.brushSetup.move,null),t.setState({xDomain:h,yDomain:s})}}),i(this.brush).call(this.brushSetup),this.setState({innerWidth:h,innerHeight:s,height:o,width:a})},e}(y);B.defaultProps={height:500,width:500,margin:{top:25,right:25,bottom:75,left:75},radius:5,labels:!1,dotFill:"steelblue",dotBorder:"whitesmoke"};var E=w({fill:"none",pointerEvents:"all",borderTop:"none",borderStyle:"none"}),P=w({textAnchor:"middle",userSelect:"none",cursor:"pointer",$nest:{"&>text":{width:"12px",fontSize:"1.2em"}}}),j=function(t){function e(e){var i=this;t.call(this,e),this.handleChangeYDomain=function(t){var e=i.state.yDomain,r=e[1];switch(t){case"topup":e[1]*=1.05;break;case"topdown":e[1]*=.95;break;case"botup":e[0]+=.05*r;break;case"botdown":e[0]-=.05*r}e[0]=e[0]<0?0:e[0],i.setState({yDomain:e})},this.handleMouseOver=function(){i.setState({isMouseOver:!0})},this.handleMouseOut=function(){i.setState({isMouseOver:!1})},this.handleMouseMove=function(t){var e=t.offsetX-i.props.margin.left,r=i.xScale.invert(e),n=e<.1*i.state.innerWidth?"start":e<.9*i.state.innerWidth?"middle":"end",a=i.bisectDate(i.props.data,r,1),o=i.props.data[a-1],h=i.props.data[a],s=void 0===h?o:+r-+o.timestamp>+h.timestamp-+r?h:o;i.setState({tooltipValues:[s.timestamp,s[i.props.y]],textAnchor:n})},this.bisectDate=function(t,e,r){return b(function(t){return t[i.props.x]}).left(t,e,r)};var r=e.width-e.margin.left-e.margin.right,n=e.height-e.margin.top-e.margin.bottom,a=m(e.data,function(t){return+t[e.y]});this.state={width:e.width,height:e.height,innerWidth:r,innerHeight:n,isMouseOver:!1,tooltipValues:[null,null],textAnchor:"middle",yDomain:a}}return t&&(e.__proto__=t),(e.prototype=Object.create(t&&t.prototype)).constructor=e,e.prototype.render=function(t,e){var i=this,r=e.innerWidth,n=e.innerHeight,a=e.height,h=e.width,s=e.isMouseOver,p=e.tooltipValues,d=e.textAnchor,u=e.yDomain,g=this.props.children,f=t.extent.length>0?t.extent:m(t.data,function(e){return+e[t.x]});this.xScale=c().range([0,r]).domain(f);var b=o().range([n,0]).domain(u),y=l().x(function(e){return i.xScale(e[t.x])}).y(function(e){return b(+e[t.y])});return x("svg",{ref:function(t){return i.chartSVG=t},class:t.name,height:a,width:h},t.axisControl&&x("g",{class:P,stroke:t.controlColour,transform:"translate("+.3*t.margin.left+", "+(t.margin.top+5)+")"},x("text",{onClick:function(){return i.handleChangeYDomain("topup")}},"+"),x("text",{transform:"translate(0, 15)",onClick:function(){return i.handleChangeYDomain("topdown")}},"-")),t.axisControl&&x("g",{class:P,stroke:t.controlColour,transform:"translate("+.3*t.margin.left+", "+n+")"},x("text",{onClick:function(){return i.handleChangeYDomain("botup")}},"+"),x("text",{transform:"translate(0, 15)",onClick:function(){return i.handleChangeYDomain("botdown")}},"-")),x("g",{transform:"translate("+t.margin.left+", "+t.margin.top+")"},x("clipPath",{id:t.name+"_cp"},x("rect",{width:r,height:n})),x(C,{height:n,axisType:"x",scale:this.xScale}),x(C,{width:r,axisType:"y",scale:b,grid:!0}),x("path",{d:y(t.data),"clip-path":"url(#"+t.name+"_cp)","stroke-linecap":"round",stroke:t.lineColour,fill:"none","stroke-width":"2px"}),g[0]&&g.map(function(e){return v(e,{xScale:i.xScale,height:n,chartName:t.name})}),s&&null!==p[0]&&x("g",{transform:"translate("+this.xScale(p[0])+","+b(p[1])+")"},x("circle",{fill:"none","stroke-width":2,stroke:"gold",r:"6"}),x("text",{x:0,y:-15,dy:"0.5em","text-anchor":d},p[0].toLocaleDateString()+" "+p[0].toLocaleTimeString()+":\n                                        "+p[1].toFixed(4))),t.tooltip&&t.data.length>0&&x("rect",{class:E,width:r,height:n,onMouseMove:this.handleMouseMove,onMouseOver:this.handleMouseOver,onMouseOut:this.handleMouseOut}),g[0]&&g.map(function(e){return v(e,{xScale:i.xScale,height:n,chartName:t.name})})))},e.prototype.componentDidMount=function(){var t=this;this.resizeChart(),this.resizeOb=new ResizeObserver(function(e){for(var i=0,r=e;i<r.length;i+=1){var n=r[i].contentRect;n.width===t.state.width&&n.height===t.state.height||t.resizeChart()}}),this.resizeOb.observe(this.chartSVG.parentElement)},e.prototype.componentWillReceiveProps=function(t){var e=m(t.data,function(e){return+e[t.y]});this.setState({yDomain:e})},e.prototype.componentWillUnmount=function(){this.resizeOb.disconnect()},e.prototype.resizeChart=function(){var t=this.chartSVG.parentElement.getBoundingClientRect(),e=t.width,i=t.height;this.setState({innerWidth:e-this.props.margin.left-this.props.margin.right,innerHeight:i-this.props.margin.top-this.props.margin.bottom,height:i,width:e})},e}(y);j.defaultProps={height:200,width:1e3,margin:{top:25,right:25,bottom:75,left:75},lineColour:"lightblue",extent:[],tooltip:!0,axisControl:!0,controlColour:"goldenrod"};var F=w({fill:"gray",strokeWidth:1,strokeOpacity:.9,fillOpacity:.45,stroke:"lightgray",$nest:{"&:hover":{fill:"lightgray"}}}),U=w({fill:"red",fillOpacity:1}),A=w({fill:"lawngreen",fillOpacity:1}),L=function(t){function e(e){var i=this;t.call(this,e),this.handleFlagClick=function(t){t.stopPropagation(),i.props.onClick(i.props.event)}}return t&&(e.__proto__=t),(e.prototype=Object.create(t&&t.prototype)).constructor=e,e.prototype.render=function(t){var e=t.xScale,i=t.height,r=t.start,n=t.end,a=t.isClicked;return x("g",{class:F,onClick:this.handleFlagClick,"clip-path":"url(#"+t.chartName+"_cp)"},x("path",{d:"M "+e(r)+"                         "+i+" H "+e(n)+" V 20 H "+e(r)+" V "+i}),x("path",{class:a?A:U,d:"M "+e(n)+"                         20 L "+e(n)+" 0 L "+(e(n)-15)+" 8 L                         "+e(n)+" 16 V 20"}))},e}(y);L.defaultProps={onClick:function(){},idx:0,event:0,start:"",end:"",type:"",sub_type:"",comment:null,chartName:"",isClicked:!1};export{_ as DifferenceChart,D as GroupedBar,M as Histogram,V as HorizontalBar,T as LineScatter,H as RangeChart,B as ScatterPlot,j as TrendChart,L as Flag};
//# sourceMappingURL=preactCharts.mjs.map
