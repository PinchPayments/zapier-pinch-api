'use strict';

const includeBearerToken = (request, z, bundle) => {
  if (bundle.authData.access_token && !request.headers.Authorization) {
    request.headers.Authorization = `Bearer ${bundle.authData.access_token}`;
  }

  return request;
};

const includePinchApiVersion = (request, z, bundle) => {
  request.headers['pinch-version'] = "2020.1";
  return request;
};

module.exports = {
  includeBearerToken,
  includePinchApiVersion
};