const { BASE_URL } = require('../constants');
const { paymentSample, eventProcessedPaymentsOutputFields } = require('../samples/sample_payment');

const perform = (z, bundle) => {
  const options = {
    url: `${BASE_URL}/${bundle.authData.environment}/events/list/scheduled-process`,
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
      type: 'scheduled-process',
      eventDate: '2024-01-01T01:01:00Z',
      metadata: { 
        status: "approved",
        amount: 1000
      },
      data: {
        payments: [
          paymentSample
        ]
      }
    },
    outputFields: eventProcessedPaymentsOutputFields(),
  },
  key: 'evt_scheduled_process',
  noun: 'Event',
  display: {
    label: 'Scheduled Process Event',
    description: 'Triggers when a Scheduled Payments are processed.'
  },
};
