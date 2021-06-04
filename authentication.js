'use strict';

const baseOauthUrl = 'https://api.getpinch.com.au';


module.exports = {
  type: 'session',
  test: {
    url: `${baseOauthUrl}/{{bundle.authData.environment}}/health/auth`,
    method: 'GET',
    params: {},
    headers: {},
    body: {},
    removeMissingValuesFrom: {},
  },
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
      inputFormat: 'sk_{{input}}',
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
  sessionConfig: {
    perform: {
      source:
        "let Base64={_keyStr:\"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=\",encode:function(e){var t=\"\";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t=\"\";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9\\+\\/\\=]/g,\"\");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/\\r\\n/g,\"\\n\");var t=\"\";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t=\"\";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}};\nlet username = bundle.authData.merchant_id;\nlet password = bundle.authData.secret_key;\nlet authHeader = 'Basic ' + Base64.encode(username + \":\" + password);\n\nconst options = {\n  url: `${process.env.BASE_AUTH_URL}/connect/token`,\n  method: 'POST',\n  headers: {\n    'content-type': 'application/x-www-form-urlencoded',\n    'authorization': authHeader\n  },\n  params: {\n\n  },\n  body: {\n    'grant_type': 'client_credentials',\n    'scope': 'api1'\n  }\n}\n\nreturn z.request(options)\n  .then((response) => {\n    response.throwForStatus();\n    const results = response.json;\n\n    // You can do any parsing you need for results here before returning them\n\n    return {\n      'access_token': results.access_token\n    };\n  });",
    },
  },
  connectionLabel:
    '{{bundle.inputData.merchant}} - {{bundle.inputData.email}} ({{bundle.authData.environment}})',
};
