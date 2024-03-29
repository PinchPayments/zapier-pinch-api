const { BASE_URL } = require('../constants');
const samplePayer = require('../samples/sample_payer');

const perform = (z, bundle) => {
  const options = {
    url: `${BASE_URL}/${bundle.authData.environment}/events/list/payer-created`,
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
    const eventPayers = results.data;

    if (eventPayers && eventPayers.length > 0) {
      eventPayers.forEach(eventPayer => {
        if (eventPayer.data && eventPayer.data.payer) {
          // Setup the Pre-Approval link here so integrators don't have to build it themselves
          eventPayer.data.payer.preapprovalUrl = `https://app.getpinch.com.au/preapproval/${bundle.authData.merchant_id}/${eventPayer.data.payer.id}`;
        }
      });
    }
    return eventPayers;
  });
};

module.exports = {
  operation: {
    perform: perform,
    canPaginate: true,
    inputFields: [],
    sample: {
      id: 'evt_XXXXXXXXXXXXXX',
      type: 'payer-created',
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
      { key: 'data__payer__companyName', type: 'string' },
      { key: 'data__payer__preapprovalUrl', type: 'string' }
    ],
  },
  key: 'evt_payer_created',
  noun: 'Event',
  display: {
    label: 'Payer Created Event',
    description: 'Triggers when a Payer is created.'
  },
};
