const { BASE_URL } = require('../constants');
const { paymentSample, eventSinglePaymentOutputFields } = require('../samples/sample_payment');

const perform = (z, bundle) => {
  const options = {
    url: `${BASE_URL}/${bundle.authData.environment}/events/list/realtime-payment`,
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
      type: 'realtime-payment',
      eventDate: '2024-01-01T01:01:00Z',
      metadata: { 
        status: "approved",
        amount: 1000
      },
      data: {
        payment: paymentSample
      }
    },
    outputFields: eventSinglePaymentOutputFields(),
  },
  key: 'evt_realtime_payment',
  noun: 'Event',
  display: {
    label: 'Realtime Payment Event',
    description: 'Triggers when a realtime Payment occurs.'
  },
};
