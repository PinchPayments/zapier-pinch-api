
const { BASE_URL } = require('../constants');
const { PaymentSample, PaymentOutputFields } = require('../samples/payment');


const createPayment = (z, bundle) => {
  const options = {
    url: `${BASE_URL}/${bundle.authData.environment}/payments`,
    method: 'POST',
    body: {
      id: bundle.inputData.id,
      payerId: bundle.inputData.payerId,
      amount: bundle.inputData.amount,
      transactionDate: bundle.inputData.transactionDate,
      description: bundle.inputData.description,
    },
  };

  return z.request(options).then((response) => {
    response.throwForStatus();
    const results = response.data;
    return results;
  });
}

module.exports = {
  operation: {
    perform: createPayment,
    inputFields: [
      {
        key: 'id',
        label: 'Payment Id',
        type: 'string',
        helpText:
          'PaymentId (In `pmt_XXXXXXXXXXXXXX` format) - if specified this will update the payment',
        required: false,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'payerId',
        label: 'Payer Id',
        type: 'string',
        helpText: 'PayerId in `pyr_XXXXXXXXXXXXXX` format.',
        required: true,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'amount',
        label: 'Amount',
        type: 'number',
        helpText:
          'Specified amount (in Cents) for the payment. Minimum value is 100 ($1)',
        required: true,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'transactionDate',
        label: 'Transaction Date',
        type: 'datetime',
        required: true,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'description',
        label: 'Description',
        type: 'text',
        required: false,
        list: false,
        altersDynamicFields: false,
      },
    ],
    sample: PaymentSample,
    outputFields: PaymentOutputFields,
  },     
  key: 'payment_create_scheduled',
  noun: 'Payment',
  display: {
    label: 'Create or Update Scheduled Payment',
    description: 'Create or update a scheduled payment',
    hidden: false,
    important: true,
  },
};
