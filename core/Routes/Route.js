"use strict";var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault"),_classCallCheck2=_interopRequireDefault(require("@babel/runtime/helpers/classCallCheck")),_defineProperty2=_interopRequireDefault(require("@babel/runtime/helpers/defineProperty")),Route=function a(){var b=this;(0,_classCallCheck2["default"])(this,a),(0,_defineProperty2["default"])(this,"use",function(a){var c=1<arguments.length&&void 0!==arguments[1]?arguments[1]:null;return null==c?b.app.use(a):b.app.use(a,c),b}),(0,_defineProperty2["default"])(this,"set",function(a,c){return b.app.set(a,c),b}),(0,_defineProperty2["default"])(this,"engine",function(a,c){return b.app.engine(a,c),b}),(0,_defineProperty2["default"])(this,"get",function(a){for(var c,d=arguments.length,e=Array(1<d?d-1:0),f=1;f<d;f++)e[f-1]=arguments[f];return(c=b.app).get.apply(c,[a].concat(e)),b.map.push({path:a,method:"GET"}),b}),(0,_defineProperty2["default"])(this,"post",function(a){for(var c,d=arguments.length,e=Array(1<d?d-1:0),f=1;f<d;f++)e[f-1]=arguments[f];return(c=b.app).post.apply(c,[a].concat(e)),b.map.push({path:a,method:"POST"}),b}),(0,_defineProperty2["default"])(this,"put",function(a){for(var c,d=arguments.length,e=Array(1<d?d-1:0),f=1;f<d;f++)e[f-1]=arguments[f];return(c=b.app).put.apply(c,[a].concat(e)),b.map.push({path:a,method:"PUT"}),b}),(0,_defineProperty2["default"])(this,"patch",function(a){for(var c,d=arguments.length,e=Array(1<d?d-1:0),f=1;f<d;f++)e[f-1]=arguments[f];return(c=b.app).patch.apply(c,[a].concat(e)),b.map.push({path:a,method:"PATCH"}),b}),(0,_defineProperty2["default"])(this,"delete",function(a){for(var c,d=arguments.length,e=Array(1<d?d-1:0),f=1;f<d;f++)e[f-1]=arguments[f];return(c=b.app)["delete"].apply(c,[a].concat(e)),b.map.push({path:a,method:"DELETE"}),b}),(0,_defineProperty2["default"])(this,"all",function(a){for(var c,d=arguments.length,e=Array(1<d?d-1:0),f=1;f<d;f++)e[f-1]=arguments[f];return(c=b.app).all.apply(c,[a].concat(e)),b.map.push({path:a,method:"ALL"}),b}),(0,_defineProperty2["default"])(this,"Router",{get:function get(a){for(var b,c=arguments.length,d=Array(1<c?c-1:0),e=1;e<c;e++)d[e-1]=arguments[e];return(b=this.router).get.apply(b,[a].concat(d)),this},post:function post(a){for(var b,c=arguments.length,d=Array(1<c?c-1:0),e=1;e<c;e++)d[e-1]=arguments[e];return(b=this.router).post.apply(b,[a].concat(d)),this},put:function put(a){for(var b,c=arguments.length,d=Array(1<c?c-1:0),e=1;e<c;e++)d[e-1]=arguments[e];return(b=this.router).put.apply(b,[a].concat(d)),this},patch:function patch(a){for(var b,c=arguments.length,d=Array(1<c?c-1:0),e=1;e<c;e++)d[e-1]=arguments[e];return(b=this.router).patch.apply(b,[a].concat(d)),this},delete:function _delete(a){for(var b,c=arguments.length,d=Array(1<c?c-1:0),e=1;e<c;e++)d[e-1]=arguments[e];return(b=this.router)["delete"].apply(b,[a].concat(d)),this},all:function all(a){for(var b,c=arguments.length,d=Array(1<c?c-1:0),e=1;e<c;e++)d[e-1]=arguments[e];return(b=this.router).all.apply(b,[a].concat(d)),this}}),(0,_defineProperty2["default"])(this,"prefix",function(a){return{/**
     * @param {array} routes Array of routes
     * @returns Express routes
     */group:function group(){for(var c,d=arguments.length,e=Array(d),f=0;f<d;f++)e[f]=arguments[f];(c=b.app).use.apply(c,[a].concat(e));var g=[];return e[0].stack.forEach(function(b){Array.isArray(b.route.path)?b.route.path.forEach(function(c){g.push({path:"".concat(a).concat(c),methods:Object.keys(b.route.methods).map(function(a){return a.toUpperCase()})})}):g.push({path:"".concat(a).concat(b.route.path),methods:Object.keys(b.route.methods).map(function(a){return a.toUpperCase()})})}),b.mapRoutes.push(g),b}}}),(0,_defineProperty2["default"])(this,"listen",function(a){var c=1<arguments.length&&void 0!==arguments[1]?arguments[1]:function(){};return b.app.listen(a,c),b}),(0,_defineProperty2["default"])(this,"getExpress",function(){return b.express}),(0,_defineProperty2["default"])(this,"getApp",function(){return b.app}),(0,_defineProperty2["default"])(this,"getRouter",function(){return b.router}),(0,_defineProperty2["default"])(this,"getRoutes",function(){return b.mapRoutes=b.mapRoutes.map(function(c,d){if(0===d)return c.map(function(a){return{path:a.path.replace("//","/"),methods:a.methods}});for(var e=0,f=d-2;0<=f;f-=1)e+=b.mapRoutes[f].length;var g=b.mapRoutes[d-1].length+e;return c.splice(0,g),c}),b.mapRoutes}),this.express=require("express"),this.app=this.express(),this.router=this.express.Router(),this.map=[],this.mapRoutes=[]};module.exports=new Route;