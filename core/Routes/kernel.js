"use strict";var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault"),_toConsumableArray2=_interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray")),_classCallCheck2=_interopRequireDefault(require("@babel/runtime/helpers/classCallCheck")),_inherits2=_interopRequireDefault(require("@babel/runtime/helpers/inherits")),_possibleConstructorReturn2=_interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn")),_getPrototypeOf2=_interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf")),_defineProperty2=_interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));function _createSuper(a){var b=_isNativeReflectConstruct();return function(){var c,d=(0,_getPrototypeOf2["default"])(a);if(b){var e=(0,_getPrototypeOf2["default"])(this).constructor;c=Reflect.construct(d,arguments,e)}else c=d.apply(this,arguments);return(0,_possibleConstructorReturn2["default"])(this,c)}}function _isNativeReflectConstruct(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch(a){return!1}}var Api=require("../../app/Routes/Api"),Auth=require("../../app/Routes/Auth"),Web=require("../../app/Routes/Web"),cors=require("cors"),path=require("path"),helmet=require("helmet"),morgan=require("morgan"),crypto=require("crypto"),bodyParser=require("body-parser"),contentSecurityPolicy=require("helmet-csp"),vhost=require("vhost"),ApiRoutes=/*#__PURE__*/function(a){function b(){return(0,_classCallCheck2["default"])(this,b),c.apply(this,arguments)}(0,_inherits2["default"])(b,a);var c=_createSuper(b);return b}(Api);(0,_defineProperty2["default"])(ApiRoutes,"init",function(a){var b,c=1<arguments.length&&arguments[1]!==void 0?arguments[1]:"/api";return(b=a.prefix(c)).group.apply(b,(0,_toConsumableArray2["default"])(Api.setup(a)))});var AuthRoutes=/*#__PURE__*/function(a){function b(){return(0,_classCallCheck2["default"])(this,b),c.apply(this,arguments)}(0,_inherits2["default"])(b,a);var c=_createSuper(b);return b}(Auth);(0,_defineProperty2["default"])(AuthRoutes,"init",function(a){var b,c=1<arguments.length&&arguments[1]!==void 0?arguments[1]:"/auth";return(b=a.prefix(c)).group.apply(b,(0,_toConsumableArray2["default"])(Auth.setup(a)))});var WebRoutes=/*#__PURE__*/function(a){function b(){return(0,_classCallCheck2["default"])(this,b),c.apply(this,arguments)}(0,_inherits2["default"])(b,a);var c=_createSuper(b);return b}(Web);(0,_defineProperty2["default"])(WebRoutes,"init",function(a){return Web.setup(a).forEach(function(a){return a})});var ServerMiddelware=function a(){(0,_classCallCheck2["default"])(this,a)};(0,_defineProperty2["default"])(ServerMiddelware,"init",function(a){a.use(cors()),a.use(helmet()),a.use(bodyParser.json()),a.use(bodyParser.urlencoded({extended:!0})),a.use(function(a,b,c){b.locals.nonce=crypto.randomBytes(16).toString("hex"),c()}),a.use(function(a,b,c){return contentSecurityPolicy({directives:{defaultSrc:["'self'","'unsafe-inline'","*"],scriptSrc:["'self'","'nonce-".concat(b.locals.nonce,"'")]}})(a,b,c)}),config.options.verbose&&a.use(morgan("tiny"))});var StaticMiddleware=function a(){(0,_classCallCheck2["default"])(this,a)};(0,_defineProperty2["default"])(StaticMiddleware,"init",function(a){var b=1<arguments.length&&arguments[1]!==void 0?arguments[1]:[{pathname:"/public/assets",dir:"/public/assets"}];b.forEach(function(b){var c=b.pathname,d=b.dir;a.getApp().use(c,a.getExpress()["static"](path.join(__dirname,"/../../",d)))})});var CreateSubdomain=function a(b){var c=this;(0,_classCallCheck2["default"])(this,a),(0,_defineProperty2["default"])(this,"add",function(a,b){a.use(vhost(c.subdomain,b))}),this.subdomain=b},Error404=function a(){(0,_classCallCheck2["default"])(this,a)};(0,_defineProperty2["default"])(Error404,"init",function(a){a.all("*",function(a,b){return b.status(404).json({error:"Sorry, we can't find the path you specified."})})}),module.exports.WebRoutes=WebRoutes,module.exports.AuthRoutes=AuthRoutes,module.exports.ApiRoutes=ApiRoutes,module.exports.ServerMiddelware=ServerMiddelware,module.exports.StaticMiddleware=StaticMiddleware,module.exports.CreateSubdomain=CreateSubdomain,module.exports.Error404=Error404;