const { BASE_URL } = require('../constants');

const perform = (z, bundle) => {
  const options = {
    url: `${BASE_URL}/${bundle.authData.environment}/payment-links`,
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
      { key: 'id' },
      { key: 'merchantId' },
      { key: 'amountInCents' },
      { key: 'currency' },
      { key: 'linkExpiryDate' },
      { key: 'description' },
      { key: 'url' },
      { key: 'returnUrl' },
      { key: 'metadata' },
      { key: 'surchargePaymentMethods' },
      { key: 'allowedPaymentMethods' },
      { key: 'payer__id', label: 'Payer Id' },
      { key: 'payer__firstName', label: 'Payer First Name' },
      { key: 'payer__lastName', label: 'Payer Last Name' },
      { key: 'payer__companyName', label: 'Payer Company Name' },
      { key: 'payer__email', label: 'Payer Email' },
      { key: 'payments[]id', label: 'Payment Id' },
      { key: 'payments[]status', label: 'Payment Status' },
    ],
  },
  key: 'payment_links_find',
  noun: 'Payment Links',
  display: {
    label: 'Find Payment Links',
    description: 'Finds all payment links.',
  },
};
