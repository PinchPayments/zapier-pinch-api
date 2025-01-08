const { BASE_URL } = require('../constants');
const { subscriptionSample, subscriptionOutputFields } = require('../samples/sample_subscription');

const perform = (z, bundle) => {
  const options = {
    url: `${BASE_URL}/${bundle.authData.environment}/events/list/subscription-complete`,
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
      type: 'subscription-completed',
      eventDate: '2024-01-01T01:01:00Z',
      metadata: {
        planName: "Monthly $10 Subscription",
        payerName: "John Smith"
      },
      data: {
        subscription: subscriptionSample
      }
    },
    outputFields: subscriptionOutputFields,
  },
  key: 'evt_subscription_complete',
  noun: 'Event',
  display: {
    label: 'Subscription Complete Event',
    description: 'Triggers when a Subscription is completed.'
  },
};
