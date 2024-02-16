'use strict';

const paymentSample = {
    id: 'pmt_XXXXXXXXXXXXXX',
    attemptId: 'att_XXXXXXXX',
    amount: 1000,
    currency: 'AUD',
    description: '',
    applicationFee: 0,
    totalFee: 55,
    isSurcharged: false,
    sourceType: 'credit-card',
    transactionDate: '2021-04-26T07:15:52Z',
    status: 'approved',
    estimatedTransferDate: '2021-04-29',
    actualTransferDate: null,
    payer: {
      id: 'pyr_XXXXXXXXXXXXXX',
      firstName: '',
      lastName: '',
      emailAddress: '',
      mobileNumber: '',
      streetAddress: null,
      suburb: null,
      postcode: null,
      state: null,
      country: null,
      companyName: null,
      companyRegistrationNumber: null,
      metadata: null,
    },
    subscription: {
        id: "sub_XXXXXXXXXXXXXX",
        planId: "pln_XXXXXXXXXXXXXX",
        planName: "Monthly Payments"
    },
    attempts: [
      {
        id: 'att_XXXXXXXX',
        amount: 1000,
        currency: 'AUD',
        convertedAmount: null,
        conversionRate: null,
        convertedCurrency: null,
        estimatedSettlementDate: '2021-04-29T00:00:00Z',
        isSurcharged: false,
        transactionDate: '2021-04-26T07:15:52Z',
        estimatedTransferDate: '2021-04-29',
        actualTransferDate: null,
        source: {
          id: 'src_XXXXXXXXXXXXXX',
          sourceType: 'credit-card',
          bankAccountNumber: null,
          bankAccountBsb: null,
          bankAccountName: null,
          creditCardToken: 'tkn_XXXXX',
          cardHolderName: '',
          expiryDate: '2022-12-01T00:00:00Z',
          displayCardNumber: '4242',
          cardScheme: 'visa',
          origin: 'AU',
          funding: 'credit',
        },
        dishonour: null,
        settlement: null,
        fees: {
          transactionFee: 55,
          applicationFee: 0,
          totalFee: 55,
          currency: 'AUD',
          taxRate: 0.1,
          convertedTransactionFee: null,
          convertedApplicationFee: null,
          convertedTotalFee: null,
          convertedCurrency: null,
          conversionRate: null,
        },
        status: 'approved',
      },
    ],
    metadata: null,
};

const corePaymentOutputFields = [
  { key: 'id', type: 'string' },
  { key: 'attemptId', type: 'string' },
  { key: 'amount', type: 'integer' },
  { key: 'currency', type: 'string' },
  { key: 'description', type: 'string' },
  { key: 'applicationFee', type: 'integer' },
  { key: 'totalFee', type: 'integer' },
  { key: 'isSurcharged', type: 'boolean' },
  { key: 'sourceType', type: 'string' },
  { key: 'transactionDate', type: 'datetime' },
  { key: 'status', type: 'string' },
  { key: 'estimatedTransferDate', type: 'datetime' },
  { key: 'actualTransferDate', type: 'datetime' },
  { key: 'payer__id', type: 'string' },
  { key: 'payer__firstName', type: 'string' },
  { key: 'payer__lastName', type: 'string' },
  { key: 'payer__emailAddress', type: 'string' },
  { key: 'payer__mobileNumber', type: 'string' },
  { key: 'payer__streetAddress', type: 'string' },
  { key: 'payer__suburb', type: 'string' },
  { key: 'payer__postcode', type: 'string' },
  { key: 'payer__state', type: 'string' },
  { key: 'payer__country', type: 'string' },
  { key: 'payer__companyName', type: 'string' },
  { key: 'payer__companyRegistrationNumber', type: 'string' },
  { key: 'payer__metadata', dict: true },
  { key: 'subscription__id', type: 'string' },
  { key: 'subscription__planId', type: 'string' },
  { key: 'subscription__planName', type: 'string' },
  { key: 'metadata', dict: true },
];

const singlePaymentOutputFields = [
  ...corePaymentOutputFields,
  { key: 'attempts[]id', type: 'string' },
  { key: 'attempts[]amount', type: 'integer' },
  { key: 'attempts[]currency', type: 'string' },
  { key: 'attempts[]convertedAmount', type: 'number' },
  { key: 'attempts[]conversionRate', type: 'number' },
  { key: 'attempts[]convertedCurrency', type: 'string' },
  { key: 'attempts[]estimatedSettlementDate', type: 'datetime' },
  { key: 'attempts[]isSurcharged', type: 'boolean' },
  { key: 'attempts[]transactionDate', type: 'datetime' },
  { key: 'attempts[]estimatedTransferDate', type: 'datetime' },
  { key: 'attempts[]actualTransferDate', type: 'datetime' },
  { key: 'attempts[]source__id', type: 'string' },
  { key: 'attempts[]source__sourceType', type: 'string' },
  { key: 'attempts[]source__bankAccountNumber', type: 'string' },
  { key: 'attempts[]source__bankAccountBsb', type: 'string' },
  { key: 'attempts[]source__bankAccountName', type: 'string' },
  { key: 'attempts[]source__creditCardToken', type: 'string' },
  { key: 'attempts[]source__cardHolderName', type: 'string' },
  { key: 'attempts[]source__expiryDate', type: 'string' },
  { key: 'attempts[]source__displayCardNumber', type: 'string' },
  { key: 'attempts[]source__cardScheme', type: 'string' },
  { key: 'attempts[]source__origin', type: 'string' },
  { key: 'attempts[]source__funding', type: 'string' },
  { key: 'attempts[]dishonour' },
  { key: 'attempts[]settlement' },
  { key: 'attempts[]fees__transactionFee', type: 'number' },
  { key: 'attempts[]fees__applicationFee', type: 'number' },
  { key: 'attempts[]fees__totalFee', type: 'number' },
  { key: 'attempts[]fees__currency', type: 'string' },
  { key: 'attempts[]fees__taxRate', type: 'number' },
  { key: 'attempts[]fees__convertedTransactionFee', type: 'number' },
  { key: 'attempts[]fees__convertedApplicationFee', type: 'number' },
  { key: 'attempts[]fees__convertedTotalFee', type: 'number' },
  { key: 'attempts[]fees__convertedCurrency', type: 'string' },
  { key: 'attempts[]fees__conversionRate', type: 'number' },
  { key: 'attempts[]status' }
];

const eventSinglePaymentOutputFields = () => {
  var eventPaymentOutputs = [];
  corePaymentOutputFields.forEach(field => {
    var fieldClone = structuredClone(field);
    fieldClone.key = 'data__payment__' + fieldClone.key;
    eventPaymentOutputs.push(fieldClone);
  });
};

const eventPaymentsOutputFields = () => {
  var eventPaymentOutputs = [];
  corePaymentOutputFields.forEach(field => {
    var fieldClone = structuredClone(field);
    fieldClone.key = 'data__payments[]' + fieldClone.key;
    eventPaymentOutputs.push(fieldClone);
  });
};

module.exports = {
    paymentSample,
    singlePaymentOutputFields,
    eventSinglePaymentOutputFields,
    eventPaymentsOutputFields
};
