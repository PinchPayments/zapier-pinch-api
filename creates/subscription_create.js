const { BASE_URL } = require('../constants');
const { subscriptionSample, subscriptionOutputFields } = require('../samples/sample_subscription');

const createSubscription = (z, bundle) => {
  const options = {
    url: `${BASE_URL}/${bundle.authData.environment}/subscriptions`,
    method: 'POST',
    body: {
      planId: bundle.inputData.planId,
      payerId: bundle.inputData.payerId,
      totalAmount: bundle.inputData.totalAmount,
      startDate: bundle.inputData.startDate
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
    perform: createSubscription,
    inputFields: [
      {
        key: 'planId',
        label: 'Plan Id',
        type: 'string',
        helpText: 'Plan Id in `pln_XXXXXXXXXXXXXX` format to subscribe the Payer to.',
        required: true,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'payerId',
        label: 'Payer Id',
        type: 'string',
        helpText: 'Payer Id in `pyr_XXXXXXXXXXXXXX` format to subscription to the Plan.',
        required: true,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'totalAmount',
        label: 'Total Amount',
        type: 'integer',
        helpText: 'If the plan needs a total amount (percentage based plans) you must supply it here in cents. This will override the end date settings on a recurring plan to end after this total amount is paid.',
        required: false,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'startDate',
        label: 'Start Date',
        type: 'datetime',
        helpText: 'When the subscription should start. Leave blank for immediately.',
        required: false,
        list: false,
        altersDynamicFields: false,
      },
    ],
    sample: subscriptionSample,
    outputFields: [
      { key: 'id', type: 'string' },
      { key: 'planId', type: 'string' },
      { key: 'planName', type: 'string' },
      { key: 'status', type: 'string' },
      { key: 'startDate', type: 'datetime' },
      { key: 'recurringPayment__amount', type: 'integer' },
      { key: 'recurringPayment__endAfterNumberOfPayments', type: 'integer' },
      { key: 'recurringPayment__frequencyInterval', type: 'string' },
      { key: 'recurringPayment__frequencyOffset', type: 'integer' },
      { key: 'recurringPayment__startDate', type: 'datetime' },
      { key: 'fixedPayments[]amount', type: 'integer' },
      { key: 'fixedPayments[]description', type: 'string' },
      { key: 'fixedPayments[]cancelPlanOnFailure', type: 'boolean' },
      { key: 'fixedPayments[]metadata', type: 'string' },
      { key: 'fixedPayments[]transactionDate', type: 'datetime' },
      { key: 'payer__id', type: 'string' },
      { key: 'payer__firstName', type: 'string' },
      { key: 'payer__lastName', type: 'string' },
      { key: 'payer__emailAddress', type: 'string' },
      { key: 'payer__companyName', type: 'string' }
    ],
  },
  key: 'subscription_create',
  noun: 'Subscription',
  display: {
    label: 'Add a Subscription',
    description: 'Create a Subscription between a Payer and a Plan'
  },
};
