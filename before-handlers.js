'use strict';

const includeJsonContentTypes = (request, z, bundle) => {
    request.headers = {
        'Content-Type': 'application/json',
        Accept: 'application/json'
    }

  return request;
};

const includeBearerToken = (request, z, bundle) => {
  if (bundle.authData.access_token) {
    request.headers.Authorization = `Bearer ${bundle.authData.access_token}`;
  }

  return request;
};

module.exports = {
  includeBearerToken,
  includeJsonContentTypes
};