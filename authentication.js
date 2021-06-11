'use strict';

const { BASE_URL } = require('./constants');


const performTest = (z, bundle) => z.request({
  url: `${BASE_URL}/{{bundle.authData.environment}}/health/auth`,
  method: 'GET'
});


const getSessionKey = async (z, bundle) => {

  let Base64 = { _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", encode: function (e) { var t = ""; var n, r, i, s, o, u, a; var f = 0; e = Base64._utf8_encode(e); while (f < e.length) { n = e.charCodeAt(f++); r = e.charCodeAt(f++); i = e.charCodeAt(f++); s = n >> 2; o = (n & 3) << 4 | r >> 4; u = (r & 15) << 2 | i >> 6; a = i & 63; if (isNaN(r)) { u = a = 64 } else if (isNaN(i)) { a = 64 } t = t + this._keyStr.charAt(s) + this._keyStr.charAt(o) + this._keyStr.charAt(u) + this._keyStr.charAt(a) } return t }, decode: function (e) { var t = ""; var n, r, i; var s, o, u, a; var f = 0; e = e.replace(/[^A-Za-z0-9\+\/\=]/g, ""); while (f < e.length) { s = this._keyStr.indexOf(e.charAt(f++)); o = this._keyStr.indexOf(e.charAt(f++)); u = this._keyStr.indexOf(e.charAt(f++)); a = this._keyStr.indexOf(e.charAt(f++)); n = s << 2 | o >> 4; r = (o & 15) << 4 | u >> 2; i = (u & 3) << 6 | a; t = t + String.fromCharCode(n); if (u != 64) { t = t + String.fromCharCode(r) } if (a != 64) { t = t + String.fromCharCode(i) } } t = Base64._utf8_decode(t); return t }, _utf8_encode: function (e) { e = e.replace(/\r\n/g, "\n"); var t = ""; for (var n = 0; n < e.length; n++) { var r = e.charCodeAt(n); if (r < 128) { t += String.fromCharCode(r) } else if (r > 127 && r < 2048) { t += String.fromCharCode(r >> 6 | 192); t += String.fromCharCode(r & 63 | 128) } else { t += String.fromCharCode(r >> 12 | 224); t += String.fromCharCode(r >> 6 & 63 | 128); t += String.fromCharCode(r & 63 | 128) } } return t }, _utf8_decode: function (e) { var t = ""; var n = 0; var r = c1 = c2 = 0; while (n < e.length) { r = e.charCodeAt(n); if (r < 128) { t += String.fromCharCode(r); n++ } else if (r > 191 && r < 224) { c2 = e.charCodeAt(n + 1); t += String.fromCharCode((r & 31) << 6 | c2 & 63); n += 2 } else { c2 = e.charCodeAt(n + 1); c3 = e.charCodeAt(n + 2); t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63); n += 3 } } return t } };
  let username = bundle.authData.merchant_id;
  let password = bundle.authData.secret_key;
  let authHeader = 'Basic ' + Base64.encode(username + ":" + password);

  const options = {
    url: `${process.env.BASE_AUTH_URL}/connect/token`,
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'authorization': authHeader
    },
    body: {
      'grant_type': 'client_credentials',
      'scope': 'api1'
    }
  }

  const response = await z.request(options)
    .then((response) => {
      response.throwForStatus();
      const results = response.json;
      return {
        'access_token': results.access_token
      };
    });

  return response;
};

module.exports = {
  type: 'session',
  fields: [
    {
      computed: false,
      key: 'merchant_id',
      required: true,
      label: 'Merchant Id',
      type: 'string',
    },
    {
      computed: false,
      key: 'secret_key',
      required: true,
      label: 'Secret Key',
      type: 'password',
    },
    {
      computed: false,
      key: 'environment',
      required: true,
      type: 'string',
      label: 'Environment',
      default: 'test',
      choices: ['test', 'live'],
    },
  ],
  sessionConfig: { perform: getSessionKey },
  test: performTest,
  connectionLabel:
    '{{bundle.inputData.merchant}} - {{bundle.inputData.email}} ({{bundle.authData.environment}})',
};
