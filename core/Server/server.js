"use strict";var init=function(a){var b=require("../Routes/Route"),c=require("../Socket"),d=require("../Routes/kernel"),e=d.ServerMiddelware,f=d.StaticMiddleware,g=d.ApiRoutes,h=d.AuthRoutes,i=d.WebRoutes,j=d.CreateSubdomain,k=d.Error404,l=require("../Template/engine"),m=l.TemplateEngine;// new CreateSubdomain("app").add(Route, (_, res) => {
//   res.status(200).json({ subdomain: "app" });
// });
// Init static middleware passing an array of paths.
// Requires in order to set custom auth logic to
// static files or folders
// Always the last route
// Set socket instance globally available
m.init(b),e.init(b),i.init(b,"/"),g.init(b,"/api"),h.init(b,"/auth"),f.init(b,[{pathname:"/public/assets",dir:"/public/assets"}]),k.init(b),b.set("io",c),b.listen(env.APP_PORT,function(){process.env.APP_DEBUG&&("cluster"===a?debug.success("Server successfully started on ".concat(env.APP_URL,":").concat(env.APP_PORT," in cluster mode."),!1):debug.success("Server successfully started on ".concat(env.APP_URL,":").concat(env.APP_PORT," in ").concat(env.APP_ENV," mode."),!1))}),module.exports=b.getApp()};module.exports=init;