const { BASE_URL } = require('../constants');
const { paymentSample, eventPaymentsOutputFields } = require('../samples/sample_payment');

const perform = (z, bundle) => {
  const options = {
    url: `${BASE_URL}/${bundle.authData.environment}/events/list/bank-results`,
    method: 'GET',
    headers: { },
    params: {
      page: bundle.meta.page + 1,
      pageSize: 10
    },
  };

  return z.request(options).then((response) => {
    response.throwForStatus();
    const results = response.data;
    return results.data;
  });
};

module.exports = {
  operation: {
    perform: perform,
    canPaginate: true,
    inputFields: [],
    sample: {
      id: 'evt_XXXXXXXXXXXXXX',
      type: 'bank-results',
      eventDate: '2024-01-01T01:01:00Z',
      metadata: {
        dishonourCount: 1,
        dishonourAmount: 1000,
        successCount: 0,
        successAmount: 0
      },
      data: {
        payments: [
          paymentSample
        ]
      }
    },
    outputFields: eventPaymentsOutputFields(),
  },
  key: 'evt_bank_results',
  noun: 'Event',
  display: {
    label: 'Bank Results Event',
    description: 'Triggers when a Payer is created.'
  },
};
