"use strict";var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault"),_classCallCheck2=_interopRequireDefault(require("@babel/runtime/helpers/classCallCheck")),_defineProperty2=_interopRequireDefault(require("@babel/runtime/helpers/defineProperty")),permissionTypes=require("./define"),Permissions=function a(){(0,_classCallCheck2["default"])(this,a)};(0,_defineProperty2["default"])(Permissions,"Middleware",{check:function check(a,b,c){var d=a.method,e=a.user;// Authorization required
return Permissions.check(d,e)?(a.isGuaranted=!0,c()):b.status(403).json({error:"User not allowed to perform this action."})},checkSingle:function checkSingle(a){if(!a)throw new Error("Model name is required");return function(b,c,d){var e=b.method,f=b.user;// Authorization required
return Permissions.checkSingle(e,f,a)?(b.isGuaranted=!0,d()):c.status(403).json({error:"User not allowed to perform this action."})}}}),(0,_defineProperty2["default"])(Permissions,"check",function(a,b){// Expected permissions array property
var c=b.permissions,d=[];return permissionTypes.forEach(function(a){-1!==c.indexOf(a.type)&&a.methods.forEach(function(a){d.push(a.toUpperCase())})}),-1!==d.indexOf(a.toUpperCase())}),(0,_defineProperty2["default"])(Permissions,"checkSingle",function(a,b,c){var d=c.toLowerCase(),e=[],f=[];// Expected permissions array property
b.permissions.forEach(function(a){if(a.match(/\:/ig)){var b=a.split(":");d==b[0]&&e.push(a)}else f.push(a)});var g=[];return permissionTypes.forEach(function(a){-1!==e.indexOf("".concat(d,":").concat(a.type))&&a.methods.forEach(function(a){g.push(a.toUpperCase())})}),-1!==g.indexOf(a.toUpperCase())}),module.exports=Permissions;