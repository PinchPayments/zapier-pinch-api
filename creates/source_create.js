const { BASE_URL } = require('../constants');

const createSource = (z, bundle) => {
  const options = {
    url: `${BASE_URL}/${bundle.authData.environment}/payers/${bundle.inputData.payerId}/sources`,
    method: 'POST',
    body: {
      sourceType: bundle.inputData.sourceType,
      payerId: bundle.inputData.payerId,
      bankAccountBsb: bundle.inputData.bankAccountBsb,
      bankAccountNumber: bundle.inputData.bankAccountNumber,
      bankAccountName: bundle.inputData.bankAccountName,
      creditCardToken: bundle.inputData.creditCardToken
    },
  };

  return z.request(options).then((response) => {
    response.throwForStatus();
    const results = response.json;
    return results;
  });
}

module.exports = {
  operation: {
    perform: createSource,
    inputFields: [
      {
        key: 'payerId',
        label: 'Payer Id',
        type: 'string',
        helpText: 'Payer Id in `pyr_XXXXXXXXXXXXXX` format.',
        required: true,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'sourceType',
        label: 'Source Type',
        type: 'string',
        helpText: 'Source type to add to a Payer',
        choices: ['bank-account', 'credit-card'],
        required: true,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'bankAccountBsb',
        label: 'Bank Account BSB',
        type: 'string',
        helpText: 'Required if `bank-account` is selected in source type.',
        required: false,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'bankAccountNumber',
        label: 'Bank Account Number',
        type: 'string',
        helpText: 'Required if `bank-account` is selected in source type.',
        required: false,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'bankAccountName',
        label: 'Bank Account Name',
        type: 'string',
        helpText: 'Required if `bank-account` is selected in source type.',
        required: false,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'creditCardToken',
        label: 'Credit Card Token',
        type: 'string',
        helpText:
          'Required if `credit-card` is selected in source type. Please see [Pinch Documentation](https://docs.getpinch.com.au/docs/credit-card-payments) for instructions on how to tokenize a credit card.',
        required: false,
        list: false,
        altersDynamicFields: false,
      },
    ],
    sample: {
      id: 'src_XXXXXXXXXXXXXX',
      sourceType: 'bank-account',
      bankAccountNumber: '000000000',
      bankAccountBsb: '000000',
      bankAccountName: 'Test Usr',
      creditCardToken: null,
      cardHolderName: null,
      expiryDate: null,
      displayCardNumber: null,
      cardScheme: null,
      origin: 'AU',
      funding: null,
    },
    outputFields: [
      { key: 'id', label: 'Source Id' },
      { key: 'sourceType', label: 'Source Type' },
      { key: 'bankAccountNumber', label: 'Bank Account Number' },
      { key: 'bankAccountBsb', label: 'Bank Account BSB' },
      { key: 'bankAccountName', label: 'Bank Account Name' },
      { key: 'creditCardToken', label: 'Credit Card Token' },
      { key: 'cardHolderName', label: 'Cardholder Name' },
      { key: 'expiryDate', label: 'Expiry Date' },
      { key: 'displayCardNumber', label: 'Display Card Number' },
      { key: 'cardScheme', label: 'Card Scheme' },
      { key: 'origin', label: 'Origin' },
      { key: 'funding', label: 'Funding' },
    ],
  },
  key: 'source_create',
  noun: 'Source',
  display: {
    label: 'Add a Source to a Payer',
    description: 'Add a Source to a payer',
    hidden: false,
    important: true,
  },
};
