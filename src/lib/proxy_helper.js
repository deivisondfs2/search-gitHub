/**
 * Outbound proxy helper library.
 * @module lib/proxy_helper
 */

// Reference: http://stackoverflow.com/a/29738070/400347


const defaultOverrideHosts = ['localhost', '127.0.0.1'];

const http = require('http');
const https = require('https');
const url = require('url');
const tunnel = require('tunnel');


const tunnels = [];

function getTunnelingAgent(isForHttpsRequests, proxyUrl) {
  if (!proxyUrl) { return undefined; }
  const proxy = url.parse(proxyUrl);

  const options = {
    proxy: {
      host: proxy.hostname,
      port: proxy.port
    }
  };

  const isHttpsProxy = (proxy.protocol === 'https:');
  if (isHttpsProxy) {
    if (isForHttpsRequests) {
      return tunnel.httpsOverHttps(options);
    }
    return tunnel.httpOverHttps(options);
  }
  if (isForHttpsRequests) {
    return tunnel.httpsOverHttp(options);
  }
  return tunnel.httpOverHttp(options);
}

function setOutboundProxy(library, isForHttpsRequests, proxyUrl, overrideHosts) {
  if (!proxyUrl) { return; }

  const skipHosts = (overrideHosts || defaultOverrideHosts).map(v => v.toLowerCase());

  const tunnelingAgent = getTunnelingAgent(isForHttpsRequests, proxyUrl);
  tunnels.push(tunnelingAgent);

  const oldReq = library.request;
  library.request = function (options, callback) {
    if (tunnels.indexOf(options.agent) != -1) {
      return oldReq.apply(library, arguments);
    }

    if (skipHosts.indexOf((options.hostname || options.host).toLowerCase()) != -1) {
      return oldReq.apply(library, arguments);
    }

    options.agent = tunnelingAgent;
    if (!options.port) { options.port = isForHttpsRequests ? 443 : 80; }
    if (!options.protocol) { options.protocol = isForHttpsRequests ? 'https:' : 'http:'; }

    return oldReq.call(null, options, callback);
  };
}

exports.setOutboundHttpProxy = (proxyUrl, overrideHosts) => {
  setOutboundProxy(http, false, proxyUrl, overrideHosts);
};

exports.setOutboundHttpsProxy = (proxyUrl, overrideHosts) => {
  setOutboundProxy(https, true, proxyUrl, overrideHosts);
};
