const authentication = require('./authentication');
const newEventTrigger = require('./triggers/new_event.js');
const evtPayerCreatedTrigger = require('./triggers/evt_payer_created.js');
const evtPayerUpdatedTrigger = require('./triggers/evt_payer_updated.js');
const evtRealtimePaymentTrigger = require('./triggers/evt_realtime_payment.js');
const evtScheduledProcessTrigger = require('./triggers/evt_scheduled_process.js');
const payerCreateCreate = require('./creates/payer_create.js');
const paymentCreateScheduledCreate = require('./creates/payment_create_scheduled.js');
const sourceCreateCreate = require('./creates/source_create.js');
const paymentCreateRealtimeCreate = require('./creates/payment_create_realtime.js');
const payerFindSearch = require('./searches/payer_find.js');
const eventFindSearch = require('./searches/event_find.js');
const subscriptionFindSearch = require('./searches/subscription_find.js');
const {includeBearerToken, includePinchApiVersion} = require('./before-handlers');

module.exports = {
  version: require('./package.json').version,
  platformVersion: require('zapier-platform-core').version,
  authentication: authentication,
  
  beforeRequest: [
    includeBearerToken,
    includePinchApiVersion
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
    [subscriptionFindSearch.key]: subscriptionFindSearch
  },
  triggers: {
    [newEventTrigger.key]: newEventTrigger,
    [evtPayerCreatedTrigger.key]: evtPayerCreatedTrigger,
    [evtPayerUpdatedTrigger.key]: evtPayerUpdatedTrigger,
    [evtRealtimePaymentTrigger.key]: evtRealtimePaymentTrigger,
    [evtScheduledProcessTrigger.key]: evtScheduledProcessTrigger,
  },
};
