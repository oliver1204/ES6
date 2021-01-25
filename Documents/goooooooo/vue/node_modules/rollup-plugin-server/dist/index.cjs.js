'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var fs = require('fs');
var http = _interopDefault(require('http'));
var https = _interopDefault(require('https'));
var path = require('path');
var mime = _interopDefault(require('mime'));
var opener = _interopDefault(require('opener'));

var DEFAULT_SSL_KEY = "-----BEGIN RSA PRIVATE KEY-----\nMIIEowIBAAKCAQEAqoaZC9fLT4x5OABaNdzzIhGeeMSsshHYcvicgXYhOfkHdkV8\nzY0PL9Tl4e5URisRe4k4aV1+kiAwK4n74IsX8AR2qfmsopbOItZM1rW7Ok5V5q7a\nuzIYbdgMtokxlEcg8WGSNhCZgXIxf6Y6IhmX9BTtcdAwvbvWElzSvbWJEbpD+Q89\n7a9eWT10X9HAWnOYdJ6FamJHeKj9HQ766QvGlqFdGDSK14DyY3iWzAMO1lHSkmai\nVWHPlkxB58/0VcEcK8Yl4v8wxHgGdwK5r92Rz84nrQ1kG8oGaU39VDVJg9Sg8zBR\n/KFbVfVaOSA4vZaNYcSzXKTJiMztJVVj1WuE3wIDAQABAoIBAF90GoWLlO4BdvVH\nFTgjZyHB9RArH3RKEvxAd/Lr+itmX6vvt62j8UVYChpO+3OPtiiNpjssr6YCSJSG\nl6yYj5y2EuqQrPcSLW9IwBhL//LiWKlZZWz13MDX+D3RTCRxMFqNwHdtEVBpaJXI\nqa/e3bUuZb+Yxz/dvjXnKbwxuvllfTwFEH+OygviYi4SmLYuubnySlWL+sGYaqqa\nVgy4+4ufN+5uDLA07SbW6WlaGbVhYGumV2mEWQTXVZzdSCHnyos2S03ho0W4dly8\n97P936ebDon4HOxE0Y3NxJ5mRKKB2DuivdooFdw96r5GR98+Ou3mdhj9Fa66X/1A\nXxqfv1kCgYEA3lHCHxfqZWr2Hp/Ye5wWitSf4N1CmS352Mk7mmiC43r65a6XXK4d\nAMCAfwdRsEn1cfD4/kyOJzEoVFjIILVfr3Q72d1Q046qLCrBwo2bqN5vqoh4pe44\nqF3mn0U14Sd1/XiuqTx61smKiHgeraOXwhCPaXv0soMBswS+pymAQk0CgYEAxFwf\nIvnPfAjwmdIAEut9QkPKODiHvxzLH4h/g4o02ivpUmxCR5+yW1wjfUQrXTK3dcLC\nKW7mhgEqlQX0u+YbyrGvwMZ/7eHkPRazJEbjwPmAOJg24M1DAICvseGQBPL4/nrF\nlv3PuKAgKIcyh7v9UEgJMUo2fq4W/iTpsWFygdsCgYBjXBLwJpYhoX5CDZqJFCeX\nAJQ7wWeEYmHpm3ZB+jeVR19ey3rmdwKLVX2YSEMgEM3bkKEXtktKBNRLbipzQ9xx\n4/bj1d/LzVUMzEcwlm1dOZyakMerER7NULpDsID2EdbP4+HbzSXxXL3HZDgBzr2C\nhDg0IqwoJBjcU2CKAShLeQKBgBRo7uOXy7U8yKV0aoWM7Kwil7ZYSePXflV8vqRR\njUTQI6RplEoVk1hjr1yp5Uf+qYsX/06HNHbhUCfFQrb1KBZdecMz3sA/JpYi8ePn\namz4ghdf2vRq4Xf/6EM5Cts41iC9aiRTpW+vVShhRSNOqvnZQvtYl2l7dvBbrd6+\nHkTZAoGBANwkGgBr0LQ0rsy4gD/y9yn2mCC9Z9UEd1o3X1fKcXXRVAOSvTCUqA82\noB6BEaM4mG0De44Vp5haHAsjs6h3Twlhs1K7WZvDc/Y6/XngvLKuhFzp9for5/DR\nhIJLvMcAR/Un/CJbO28eGI/Fom/mdd3z3I1JGN4xTdh3+msQrs8X\n-----END RSA PRIVATE KEY-----";

var DEFAULT_SSL_CERT = "-----BEGIN CERTIFICATE-----\nMIIC6DCCAdACCQCgMy/JzfSHEzANBgkqhkiG9w0BAQUFADA2MQswCQYDVQQGEwJB\nVTETMBEGA1UECBMKU29tZS1TdGF0ZTESMBAGA1UEChMJbG9jYWxob3N0MB4XDTE3\nMDgwNDAyMjc0OFoXDTI3MDgwMjAyMjc0OFowNjELMAkGA1UEBhMCQVUxEzARBgNV\nBAgTClNvbWUtU3RhdGUxEjAQBgNVBAoTCWxvY2FsaG9zdDCCASIwDQYJKoZIhvcN\nAQEBBQADggEPADCCAQoCggEBAKqGmQvXy0+MeTgAWjXc8yIRnnjErLIR2HL4nIF2\nITn5B3ZFfM2NDy/U5eHuVEYrEXuJOGldfpIgMCuJ++CLF/AEdqn5rKKWziLWTNa1\nuzpOVeau2rsyGG3YDLaJMZRHIPFhkjYQmYFyMX+mOiIZl/QU7XHQML271hJc0r21\niRG6Q/kPPe2vXlk9dF/RwFpzmHSehWpiR3io/R0O+ukLxpahXRg0iteA8mN4lswD\nDtZR0pJmolVhz5ZMQefP9FXBHCvGJeL/MMR4BncCua/dkc/OJ60NZBvKBmlN/VQ1\nSYPUoPMwUfyhW1X1WjkgOL2WjWHEs1ykyYjM7SVVY9VrhN8CAwEAATANBgkqhkiG\n9w0BAQUFAAOCAQEAHEu6k+Gjdt4f8phRTlMA/1JVqcwcsBeP+EEOlk34HEgfdOma\nPYwPISjUE28YzDvfHyK6R5dTLt3wijbTOAvXU2mDwW10/aR/e+uKsK09cKeFPMY6\nI9fpz+FPeJqKqBXcpkN4qwCzOoEZNm3PV0+l9AP2VKvCjN6i5Hnaq8vlsIe2SPe2\nQUbvUEDSXzBrhr+JT/IM75ytusGAL3iY1toVxHV4sxUvLKqE87Z5dRYV5h3avfQt\nxwVRsytOuj2lP0GeTqx1u0J3txIGAvd981qQx+fM5YuewTJHwyR+FdQKNXBchGOx\nGy3dZ2DCszBrC8Hmzr1t/5FBhy7wi1ihQ0dE4Q==\n-----END CERTIFICATE-----";

// Intermediate compatibility (default) @see https://wiki.mozilla.org/Security/Server_Side_TLS
var DEFAULT_SSL_CIPHERS = 'ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES128-SHA256:ECDHE-RSA-AES128-SHA256:ECDHE-ECDSA-AES128-SHA:ECDHE-RSA-AES256-SHA384:ECDHE-RSA-AES128-SHA:ECDHE-ECDSA-AES256-SHA384:ECDHE-ECDSA-AES256-SHA:ECDHE-RSA-AES256-SHA:DHE-RSA-AES128-SHA256:DHE-RSA-AES128-SHA:DHE-RSA-AES256-SHA256:DHE-RSA-AES256-SHA:ECDHE-ECDSA-DES-CBC3-SHA:ECDHE-RSA-DES-CBC3-SHA:EDH-RSA-DES-CBC3-SHA:AES128-GCM-SHA256:AES256-GCM-SHA384:AES128-SHA256:AES256-SHA256:AES128-SHA:AES256-SHA:DES-CBC3-SHA:!DSS';

function server(options) {
  if ( options === void 0 ) options = {contentBase: ''};

  if (Array.isArray(options) || typeof options === 'string') {
    options = {contentBase: options};
  }
  options.contentBase = Array.isArray(options.contentBase) ? options.contentBase : [options.contentBase];
  options.host = options.host || 'localhost';
  options.port = options.port || 10001;

  // SSL Support
  options.ssl = !!options.ssl;
  if (options.ssl) {
    options.ssl_key = options.ssl_key || DEFAULT_SSL_KEY;
    options.ssl_cert = options.ssl_cert || DEFAULT_SSL_CERT;
    options.ssl_ciphers = options.ssl_ciphers || DEFAULT_SSL_CIPHERS;
  }

  // Custom response header
  options.customResponseHeaders = options.customResponseHeaders || {};

  mime.default_type = 'text/plain';

  function handler(request, response) {
    // Set custom response headers.
    Object.keys(options.customResponseHeaders).forEach(function (key) {
      response.setHeader(key, options.customResponseHeaders[key]);
    });

    // Remove querystring
    var urlPath = decodeURI(request.url.split('?')[0]);

    readFileFromContentBase(options.contentBase, urlPath, function (error, content, filePath) {

      if (!error) {
        return found(response, filePath, content)
      }
      if (error.code !== 'ENOENT') {
        response.writeHead(500);
        response.end('500 Internal Server Error' +
          '\n\n' + filePath +
          '\n\n' + Object.keys(error).map(function (k) {
            return error[k];
          }).join('\n') +
          '\n\n(rollup-plugin-server)', 'utf-8');
        return
      }
      if (request.url === '/favicon.ico') {
        filePath = path.resolve(__dirname, '../dist/favicon.ico');
        fs.readFile(filePath, function (error, content) {
          if (error) {
            notFound(response, filePath);
          } else {
            found(response, filePath, content);
          }
        });
      } else if (options.historyApiFallback) {
        readFileFromContentBase(options.contentBase, '/index.html', function (error, content, filePath) {
          if (error) {
            notFound(response, filePath);
          } else {
            found(response, filePath, content);
          }
        });
      } else {
        notFound(response, filePath);
      }
    });
  }

  if (options.ssl) { // HTTPS
    https.createServer({
      key: options.ssl_key,
      cert: options.ssl_cert,
      ciphers: options.ssl_ciphers,
    }, handler).listen(options.port);
  } else { // HTTP
    http.createServer(handler).listen(options.port);
  }

  var running = options.verbose === false;

  return {
    name: 'server',
    ongenerate: function ongenerate() {
      if (!running) {
        running = true;

        // Log which url to visit
        var url = "http" + (options.ssl ? 's' : '') + "://" + (options.host) + ":" + (options.port);
        options.contentBase.forEach(function (base) {
          console.log(green(url) + ' -> ' + path.resolve(base));
        });

        // Open browser
        if (options.open) {
          opener(url);
        }
      }
    }
  }
}

function readFileFromContentBase(contentBase, urlPath, callback) {
  var filePath = path.resolve(contentBase[0] || '.', '.' + urlPath);

  // Load index.html in directories
  if (urlPath.endsWith('/')) {
    filePath = path.resolve(filePath, 'index.html');
  }

  fs.readFile(filePath, function (error, content) {
    if (error && contentBase.length > 1) {
      // Try to read from next contentBase
      readFileFromContentBase(contentBase.slice(1), urlPath, callback);
    } else {
      // We know enough
      callback(error, content, filePath);
    }
  });
}

function notFound(response, filePath) {
  response.writeHead(404);
  response.end('404 Not Found' +
    '\n\n' + filePath +
    '\n\n(rollup-plugin-server)', 'utf-8');
}

function found(response, filePath, content) {
  response.writeHead(200, {'Content-Type': mime.lookup(filePath)});
  response.end(content, 'utf-8');
}

function green(text) {
  return '\u001b[1m\u001b[32m' + text + '\u001b[39m\u001b[22m'
}

module.exports = server;
