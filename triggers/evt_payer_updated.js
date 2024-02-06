const { BASE_URL } = require('../constants');
const samplePayer = require('../samples/sample_payer');

const perform = (z, bundle) => {
  const options = {
    url: `${BASE_URL}/${bundle.authData.environment}/events/list/payer-updated`,
    method: 'GET',
    headers: { },
    params: {
      page: bundle.meta.page + 1
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
      type: 'payer-updated',
      eventDate: '2024-01-01T01:01:00Z',
      metadata: { payerName: "John Smith" },
      data: {
        payer: samplePayer
      }
    },
    outputFields: [
      { key: 'id', type: 'string' },
      { key: 'type', type: 'string' },
      { key: 'eventDate', type: 'datetime' },
      { key: 'metadata', dict: true },
      { key: 'data__payer__id', type: 'string' },
      { key: 'data__payer__firstName', type: 'string' },
      { key: 'data__payer__lastName', type: 'string' },
      { key: 'data__payer__emailAddress', type: 'string' },
      { key: 'data__payer__companyName', type: 'string' }
    ],
  },
  key: 'evt_payer_updated',
  noun: 'Event',
  display: {
    label: 'Payer Updated Event',
    description: 'Triggers when a Payer is updated.'
  },
};
