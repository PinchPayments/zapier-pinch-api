
const { BASE_URL } = require('../constants');
const { paymentSample, singlePaymentOutputFields } = require('../samples/sample_payment');

const createPayment = (z, bundle) => {
  const options = {
    url: `${BASE_URL}/${bundle.authData.environment}/payments/realtime`,
    method: 'POST',
    body: {
      payerId: bundle.inputData.payerId,
      firstName: bundle.inputData.firstName,
      lastName: bundle.inputData.lastName,
      email: bundle.inputData.email,
      mobileNumber: bundle.inputData.mobileNumber,
      sourceId: bundle.inputData.sourceId,
      creditCardToken: bundle.inputData.creditCardToken,
      amount: bundle.inputData.amount,
      description: bundle.inputData.description,
      applicationFee: bundle.inputData.applicationFee,
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
        key: 'payerId',
        label: 'Payer Id',
        type: 'string',
        helpText:
          'Specify a payerId in `pyr_XXXXXXXXXXXXXX` format if linked to an existing payer. If left empty, a new payer will be created.',
        required: false,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'firstName',
        label: 'First Name',
        type: 'string',
        helpText: 'Only required if Payer Id is empty.',
        required: false,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'lastName',
        label: 'Last Name',
        type: 'string',
        helpText: 'Only required if Payer Id is empty',
        required: false,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'email',
        label: 'Email Address',
        type: 'string',
        helpText:
          'Not required if Payer Id is set. If not set - payer must have an Email Address, Mobile Number or both fields set.',
        required: false,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'mobileNumber',
        label: 'Mobile Number',
        type: 'string',
        helpText:
          'Not required if Payer Id is set. If not set - payer must have an Email Address, Mobile Number or both fields set.',
        required: false,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'sourceId',
        label: 'Source Id',
        type: 'string',
        helpText:
          'Optional. If you want to use an existing source on a Payer, the source can be found using the Find Payer action (in `src_XXXXXXXXXXXXXX` format) and set here. Otherwise, leave empty to set up a new payment source. Leave empty if Token is set.',
        required: false,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'creditCardToken',
        label: 'Token',
        type: 'string',
        helpText:
          'Optional. If you\'ve already added a token/source to the payer you do not need to specify this field as Pinch will default to using the oldest source. Please see [Pinch Documentation](https://docs.getpinch.com.au/docs/credit-card-payments) for instructions on how to tokenize a credit card. Leave empty if Source Id is set.',
        required: false,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'amount',
        label: 'Amount',
        type: 'integer',
        helpText: 'Amount (in cents) to be debited from the payment source.',
        required: true,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'description',
        label: 'Description',
        type: 'string',
        required: false,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'applicationFee',
        label: 'Application Fee',
        type: 'integer',
        required: false,
        list: false,
        altersDynamicFields: false,
      },
    ],
    sample: paymentSample,
    outputFields: singlePaymentOutputFields(),
  },
  key: 'payment_create_realtime',
  noun: 'Payment',
  display: {
    label: 'Create Realtime Payment',
    description:
      'Create a real-time payment against a credit card or bank account'
  },
};
