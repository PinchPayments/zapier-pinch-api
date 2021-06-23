const { BASE_URL } = require('../constants');

const perform = (z, bundle) => {
  const options = {
    url: `${BASE_URL}/${bundle.authData.environment}/events`,
    method: 'GET',
    headers: { },
    params: {
      page: bundle.meta.page + 1,
      eventType: bundle.inputData.eventType,
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
    inputFields: [
      {
        key: 'eventType',
        type: 'string',
        label: 'Event Type',
        helpText:
          '(Optional) Filter by Event Type. See docs for all available event types. If left empty all events will be returned.',
        choices: [
          'bank-results',
          'scheduled-process',
          'transfer',
          'realtime-payment',
          'payment-created',
          'subscription-complete',
          'payer-created',
          'payer-updated',
        ],
        required: false,
        list: false,
        altersDynamicFields: false,
      },
    ],
    sample: {
      id: 'evt_XXXXXXXXXXXXXX',
      type: 'realtime-payment',
      eventDate: '2021-04-26T07:15:53Z',
      metadata: { status: 'approved', amount: 1000 },
    },
    outputFields: [
      { key: 'id', type: 'string' },
      { key: 'type', type: 'string' },
      { key: 'eventDate', type: 'datetime' },
      { key: 'metadata', dict: true }
    ],
  },
  key: 'new_event',
  noun: 'Event',
  display: {
    label: 'New Event',
    description: 'Triggers when a new Event is added.',
    hidden: false,
    important: true,
  },
};
