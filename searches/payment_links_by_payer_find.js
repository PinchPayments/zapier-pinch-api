const { BASE_URL } = require('../constants');

const perform = (z, bundle) => {
  const options = {
    url: `${BASE_URL}/${bundle.authData.environment}/payment-links/payer/${bundle.inputData.payerId}`,
    method: 'GET',
    params: {
      page: bundle.inputData.page || 1,
      pageSize: bundle.inputData.pageSize || 50,
    },
  };

  return z.request(options).then((response) => {
    response.throwForStatus();
    const results = response.data;

    return results.data || results;
  });
};

module.exports = {
  operation: {
    perform: perform,
    inputFields: [
      {
        key: 'payerId',
        label: 'Payer Id',
        type: 'string',
        helpText: 'Id of the payer to get Payment Links for (string identifier starting with pyr_).',
        required: true,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'page',
        label: 'Page',
        type: 'integer',
        helpText: 'Page number to return (defaults to 1).',
        required: false,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'pageSize',
        label: 'Page Size',
        type: 'integer',
        helpText: 'Number of items to return per page (defaults to 50).',
        required: false,
        list: false,
        altersDynamicFields: false,
      },
    ],
    sample: {
      id: 'plk_XXXXXXXXXXXXXX',
      merchantId: 'mch_XXXXXXXXXXXXXX',
      amountInCents: 1200,
      currency: 'AUD',
      linkExpiryDate: null,
      description: 'Sample payment',
      url: 'https://pay.getpinch.com.au/pay/plk_XXXXXXXXXXXXXX',
      returnUrl: 'https://example.com/',
      metadata: null,
      surchargePaymentMethods: [],
      allowedPaymentMethods: ['credit-card'],
      payer: {
        id: 'pyr_XXXXXXXXXXXXXX',
        firstName: 'John',
        lastName: 'Smith',
        companyName: null,
        email: 'test@test.com',
      },
      payments: [
        {
          id: 'pmt_XXXXXXXXXXXXXX',
          status: 'approved',
        },
      ],
    },
    outputFields: [
      { key: 'id', type: 'string' },
      { key: 'merchantId', type: 'string' },
      { key: 'amountInCents', type: 'number' },
      { key: 'currency', type: 'string' },
      { key: 'linkExpiryDate', type: 'datetime' },
      { key: 'description', type: 'string' },
      { key: 'url', type: 'string' },
      { key: 'returnUrl', type: 'string' },
      { key: 'metadata', type: 'string' },
      { key: 'surchargePaymentMethods', type: 'string', list: true },
      { key: 'allowedPaymentMethods', type: 'string', list: true },
      { key: 'payer__id', label: 'Payer Id', type: 'string' },
      { key: 'payer__firstName', label: 'Payer First Name', type: 'string' },
      { key: 'payer__lastName', label: 'Payer Last Name', type: 'string' },
      { key: 'payer__companyName', label: 'Payer Company Name', type: 'string' },
      { key: 'payer__email', label: 'Payer Email', type: 'string' },
      { key: 'payments[]id', label: 'Payment Id', type: 'string' },
      { key: 'payments[]status', label: 'Payment Status', type: 'string' },
    ],
  },
  key: 'payment_links_by_payer_find',
  noun: 'Payment Links',
  display: {
    label: 'Find Payment Links by Payer',
    description: 'Finds all payment links for a specific payer.',
  },
};
