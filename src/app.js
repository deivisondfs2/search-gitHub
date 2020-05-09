const app = require("./configExpress");
const ProxyHelper = require("./lib/proxy_helper");
ProxyHelper.setOutboundHttpProxy(process.env.http_proxy);
ProxyHelper.setOutboundHttpsProxy(process.env.https_proxy);

const routes = require("./routes");

app.use(routes);

app.use((req, res, next) => {
  const err = new Error("Not found");
  err.status = 404;
  err.code = "not_found";
  next(err);
});

//next is required by express, even if it's not used
/*eslint no-unused-vars: off*/
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error_description: err.message,
    status_code: err.status,
    error: err.code,
  });
});

module.exports = app;
