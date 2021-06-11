const { BASE_URL } = require('../constants');

const perform = (z, bundle) => {
  const options = {
    url: `${BASE_URL}/${bundle.authData.environment}/events/${bundle.inputData.eventId}`,
    method: 'GET',
    headers: {},
  };

  return z.request(options).then((response) => {
    response.throwForStatus();
    const results = response.json;

    // You can do any parsing you need for results here before returning them

    return [results];
  });
};

module.exports = {
  operation: {
    perform: perform,
    inputFields: [
      {
        key: 'eventId',
        label: 'Event Id',
        type: 'string',
        required: true,
        list: false,
        altersDynamicFields: false,
      },
    ],
    sample: {
      id: 'evt_hTitMnSkelhXYS',
      type: 'payer-created',
      eventDate: '2021-04-25T03:41:06Z',
      metadata: { payerName: 'Test usr' },
      data: {
        payer: {
          id: 'pyr_XXXXXXXXXXXXXX',
          firstName: 'Test',
          lastName: 'usr',
          emailAddress: 'test.usr@mailinator.com',
          mobileNumber: null,
          streetAddress: null,
          suburb: null,
          postcode: null,
          state: null,
          country: null,
          companyName: null,
          companyRegistrationNumber: null,
          metadata: null,
          sources: [
            {
              id: 'src_XXXXXXXXXXXXXX',
              sourceType: 'bank-account',
              bankAccountNumber: '000000000',
              bankAccountBsb: '000000',
              bankAccountName: 'Test Usr',
              creditCardToken: null,
              cardHolderName: null,
              expiryDate: null,
              displayCardNumber: null,
              cardScheme: null,
              origin: 'AU',
              funding: null,
            },
          ],
          agreements: [
            {
              id: 'agr_XXXXXXXXXXXXXX',
              anonymousViewToken: '',
              agreementDateUtc: '2021-04-25T23:26:41Z',
              confirmedDateUtc: '2021-04-25T23:26:41Z',
              status: 'active',
            },
          ],
        },
      },
      webhooks: [],
    },
    outputFields: [
      { key: 'id' },
      { key: 'type' },
      { key: 'eventDate' },
      { key: 'metadata', dict: true },
      { key: 'data', dict: true },
    ],
  },
  key: 'event_find',
  noun: 'Event',
  display: {
    label: 'Find an Event',
    description: 'Finds an Event using the EventId',
    hidden: false,
    important: true,
  },
};
