
const { BASE_URL } = require('../constants');

const createPayer = (z, bundle) => {
  const options = {
    url: `${BASE_URL}/${bundle.authData.environment}/payers`,
    method: 'POST',
    headers: {},
    params: {},
    body: {
      firstName: bundle.inputData.firstName,
      lastName: bundle.inputData.lastName,
      emailAddress: bundle.inputData.emailAddress,
      mobileNumber: bundle.inputData.mobileNumber,
      companyName: bundle.inputData.companyName,
      companyRegistrationNumber: bundle.inputData.companyRegistrationNumber,
      id: bundle.inputData.id,
      streetAddress: bundle.inputData.streetAddress,
      suburb: bundle.inputData.suburb,
      state: bundle.inputData.state,
      postcode: bundle.inputData.postcode,
      country: bundle.inputData.country,
      source: {
        sourceType: bundle.inputData.sourceType,
      },
      metadata: JSON.stringify(bundle.inputData.metadata),
    },
  };

  return z.request(options).then((response) => {
    response.throwForStatus();
    const results = response.data;
    return results;
  });
};

module.exports = {
  operation: {
    perform: createPayer,
    inputFields: [
      {
        key: 'id',
        label: 'Payer Id',
        type: 'string',
        helpText:
          'Id of the payer in `pyr_XXXXXXXXXXXXXX` format. If left empty a new Payer will be created.',
        required: false,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'firstName',
        label: 'First Name',
        type: 'string',
        required: true,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'lastName',
        label: 'Last Name',
        type: 'string',
        required: true,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'emailAddress',
        label: 'Email Address',
        type: 'string',
        helpText:
          'Payer must have an Email Address, Mobile Number or both set.',
        required: false,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'mobileNumber',
        label: 'Mobile Number',
        type: 'string',
        helpText:
          'Payer must have an Email Address, Mobile Number or both set.',
        required: false,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'companyName',
        label: 'Company Name',
        type: 'string',
        required: false,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'companyRegistrationNumber',
        label: 'Company Registration Number',
        type: 'string',
        required: false,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'streetAddress',
        label: 'Street Address',
        type: 'string',
        required: false,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'suburb',
        label: 'Suburb',
        type: 'string',
        required: false,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'state',
        label: 'State',
        type: 'string',
        required: false,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'postcode',
        label: 'Postcode',
        type: 'string',
        required: false,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'country',
        label: 'Country',
        type: 'string',
        required: false,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'metadata',
        label: 'Metadata',
        dict: true,
        required: false,
        altersDynamicFields: false,
      },
    ],
    sample: {
      id: 'pyr_XXXXXXXXXXXXX',
      firstName: 'Test',
      lastName: 'Name',
      emailAddress: 'test.name@mailinator.com',
      mobileNumber: '',
      streetAddress: null,
      suburb: null,
      postcode: null,
      state: null,
      country: null,
      companyName: '',
      companyRegistrationNumber: '',
      metadata: null,
      sources: [],
      agreements: [],
    },
    outputFields: [
      { key: 'id', label: 'Id' },
      { key: 'firstName', label: 'First Name' },
      { key: 'lastName', label: 'Last Name' },
      { key: 'emailAddress', label: 'Email Address' },
      { key: 'mobileNumber', label: 'Mobile Number' },
      { key: 'streetAddress', label: 'Street Address' },
      { key: 'suburb', label: 'Suburb' },
      { key: 'postcode', label: 'Post Code' },
      { key: 'state', label: 'State' },
      { key: 'country', label: 'Country' },
      { key: 'companyName', label: 'Company Name' },
      { key: 'companyRegistrationNumber', label: 'Company Registration Number' },
      { key: 'metadata', label: 'Metadata' },
    ],
  },
  key: 'payer_create',
  noun: 'Payer',
  display: {
    label: 'Create or Update Payer',
    description: 'Create or Update a Payer',
    hidden: false,
    important: true,
  },
};
