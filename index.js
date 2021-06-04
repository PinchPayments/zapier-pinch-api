const authentication = require('./authentication');
const newEventTrigger = require('./triggers/new_event.js');
const payerCreateCreate = require('./creates/payer_create.js');
const paymentCreateScheduledCreate = require('./creates/payment_create_scheduled.js');
const sourceCreateCreate = require('./creates/source_create.js');
const paymentCreateRealtimeCreate = require('./creates/payment_create_realtime.js');
const payerFindSearch = require('./searches/payer_find.js');
const eventFindSearch = require('./searches/event_find.js');
const {includeBearerToken, includeJsonContentTypes} = require('./before-handlers');

module.exports = {
  version: require('./package.json').version,
  platformVersion: require('zapier-platform-core').version,
  authentication: authentication,
  
  beforeRequest: [
    includeJsonContentTypes,
    includeBearerToken
  ],
  creates: {
    [payerCreateCreate.key]: payerCreateCreate,
    [paymentCreateScheduledCreate.key]: paymentCreateScheduledCreate,
    [sourceCreateCreate.key]: sourceCreateCreate,
    [paymentCreateRealtimeCreate.key]: paymentCreateRealtimeCreate,
  },
  searches: {
    [payerFindSearch.key]: payerFindSearch,
    [eventFindSearch.key]: eventFindSearch,
  },
  triggers: { [newEventTrigger.key]: newEventTrigger },
};
