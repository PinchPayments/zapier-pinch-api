const { BASE_URL } = require('../constants');
const { subscriptionSample } = require('../samples/sample_subscription');

const perform = (z, bundle) => {
    const options = {
        url: `${BASE_URL}/${bundle.authData.environment}/subscriptions/${bundle.inputData.subscriptionId}`,
        method: 'GET',
        headers: {},
    };

    return z.request(options).then((response) => {
        response.throwForStatus();
        const results = response.data;
        return [results];
    });
};

module.exports = {
    operation: {
        perform: perform,
        inputFields: [
            {
                key: 'subscriptionId',
                label: 'Subscription Id',
                type: 'string',
                required: true,
                list: false,
                altersDynamicFields: false,
            },
        ],
        sample: subscriptionSample,
        outputFields: [
            { key: 'id' },
            { key: 'payer', dict: true },
            { key: 'planId' },
            { key: 'planName' },
            { key: 'status' },
            { key: 'startDate' },
            { 
                key: 'freePeriods',
                list: true,
                children: [
                    { key: 'durationInterval', type: 'string' },
                    { key: 'durationOffset', type: 'number' },
                    { key: 'metadata', dict: true },
                    { key: 'startDate', type: 'datetime' }
                ]
            },
            { 
                key: 'fixedPayments',
                list: true,
                children: [
                    { key: 'amount',type: 'number' },
                    { key: 'description', type: 'text' },
                    { key: 'cancelPlanOnFailure', type: 'string' },
                    { key: 'metadata', dict: true },
                    { key: 'transactionDate', type: 'datetime' }
                ]
            },            
            { 
                key: 'recurringPayment',
                dict: true,
                children: [
                    { key: 'amount', type: 'number' },
                    { key: 'endAfterNumberOfPayments', type: 'string' },
                    { key: 'endAfterTotalAmount', type: 'string' },
                    { key: 'frequencyInterval', type: 'string' },
                    { key: 'frequencyOffset', type: 'number' },
                    { key: 'description', type: 'string' },
                    { key: 'cancelPlanOnFailure', type: 'boolean' },
                    { key: 'metadata', dict: true },
                    { key: 'endAfterDate', type: 'datetime' },
                    { key: 'startDate', type: 'datetime' }
                ]
            },

            { key: 'totalAmount', type: 'number' },
            { key: 'metadata', dict: true },
            { key: 'surcharge', list: true },
        ],
    },
    key: 'subscription_find',
    noun: 'Subscription',
    display: {
        label: 'Find a Subscription',
        description: 'Finds a Subscription using the SubscriptionId'
    },
};
