const samplePayer = require('../samples/sample_payer');
const { defaultEventOutputFields } = require('../samples/sample_event');

const subscriptionSample = {
    id: "sub_XXXXXXXXXXXXXX",
    payer: samplePayer,
    planId: "pln_XXXXXXXXXXXXXX",
    planName: "Monthly $10 Subscription",
    status: "active",
    startDate: "2024-01-01T01:01:00Z",
    fixedPayments: [{
        amount: 2500,
        description: "Upfront deposit",
        cancelPlanOnFailure: true,
        metadata: "",
        transactionDate: "2024-01-01T01:01:00Z"
      }
    ],
    recurringPayment: {
        amount: 1000,
        endAfterNumberOfPayments: 12,
        endAfterTotalAmount: null,
        frequencyInterval: "months",
        frequencyOffset: 1,
        description: "Monthly $10 Subscription",
        cancelPlanOnFailure: false,
        metadata: "",
        endAfterDate: null,
        startDate: "2024-01-01T01:01:00Z"
    },
    totalAmount: 12000,
    metadata: "",
    surcharge: [
        "credit-card",
        "direct-debit"
    ]
}


const subscriptionOutputFields = [
    ...defaultEventOutputFields,
    { key: 'data__subscription__id', type: 'string' },
    { key: 'data__subscription__planId', type: 'string' },
    { key: 'data__subscription__planName', type: 'string' },
    { key: 'data__subscription__status', type: 'string' },
    { key: 'data__subscription__startDate', type: 'datetime' },
    { key: 'data__subscription__recurringPayment__amount', type: 'integer' },
    { key: 'data__subscription__recurringPayment__endAfterNumberOfPayments', type: 'integer' },
    { key: 'data__subscription__recurringPayment__frequencyInterval', type: 'string' },
    { key: 'data__subscription__recurringPayment__frequencyOffset', type: 'integer' },
    { key: 'data__subscription__recurringPayment__startDate', type: 'datetime' },
    { key: 'data__subscription__fixedPayments[]amount', type: 'integer' },
    { key: 'data__subscription__fixedPayments[]description', type: 'string' },
    { key: 'data__subscription__fixedPayments[]cancelPlanOnFailure', type: 'boolean' },
    { key: 'data__subscription__fixedPayments[]metadata', type: 'string' },
    { key: 'data__subscription__fixedPayments[]transactionDate', type: 'datetime' },
    { key: 'data__subscription__payer__id', type: 'string' },
    { key: 'data__subscription__payer__firstName', type: 'string' },
    { key: 'data__subscription__payer__lastName', type: 'string' },
    { key: 'data__subscription__payer__emailAddress', type: 'string' },
    { key: 'data__subscription__payer__companyName', type: 'string' }
  ];
  
module.exports = {
    subscriptionSample,
    subscriptionOutputFields
};