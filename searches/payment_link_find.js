const { BASE_URL } = require('../constants');

const perform = (z, bundle) => {
  const options = {
    url: `${BASE_URL}/${bundle.authData.environment}/payment-links/${bundle.inputData.id}`,
    method: 'GET',
  };

  return z.request(options).then((response) => {
    response.throwForStatus();
    const results = response.data;

    return [results];
  });
};

module.exports = {
  operation: {
    perform: perform,
    inputFields: [
      {
        key: 'id',
        label: 'Payment Link Id',
        type: 'string',
        helpText: 'Payment Link Id (string identifier starting with plk_).',
        required: true,
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
  key: 'payment_link_find',
  noun: 'Payment Link',
  display: {
    label: 'Find Payment Link',
    description: 'Finds a payment link by ID.',
  },
};
