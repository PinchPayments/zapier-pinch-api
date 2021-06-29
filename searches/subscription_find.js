const { BASE_URL } = require('../constants');

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
        sample: {
            id: 'sub_XXXXXXXXXXXXXX',
            payer: {
                id: "pyr_XXXXXXXXXXXXXX",
                firstName: "Ben",
                lastName: "Hotdog",
                emailAddress: "ben.hotdog@mailinator.com",
                mobileNumber: null,
                streetAddress: null,
                suburb: null,
                postcode: null,
                state: null,
                country: null,
                companyName: null,
                companyRegistrationNumber: null,
                metadata: null
            },
            planId: "pln_XXXXXXXXXXXXXX",
            planName: "25% Deposit with 10% Monthly",
            status: "active",
            startDate: "2021-05-21T14:00:00.0000000Z",
            freePeriods: [
                {
                    startDate: "2021-05-21T14:00:00.0000000Z",
                    durationOffset: 1,
                    durationInterval: "months",
                    metadata: ""
                }
            ],
            fixedPayments: [
                {
                    amount: 25000,
                    description: "Upfront deposit",
                    cancelPlanOnFailure: true,
                    metadata: null,
                    transactionDate: "2021-05-21T14:00:00.0000000Z"
                }
            ],
            recurringPayment: {
                amount: 10000,
                endAfterNumberOfPayments: null,
                endAfterTotalAmount: null,
                frequencyInterval: "months",
                frequencyOffset: 1,
                description: "Monthly Repayment",
                cancelPlanOnFailure: false,
                metadata: null,
                endAfterDate: null,
                startDate: "2021-06-21T14:00:00.0000000Z"
            },
            totalAmount: 100000,
            metadata: "",
            surcharge: [
                "bank-account",
                "credit-card"
            ]
        },
        outputFields: [
            { key: 'id' },
            { key: 'payer' },
            { key: 'planId' },
            { key: 'planName' },
            { key: 'status' },
            { key: 'startDate' },
            { key: 'freePeriods', dict: true },
            { key: 'fixedPayments', dict: true },
            { key: 'recurringPayment' },
            { key: 'totalAmount' },
            { key: 'metadata', dict: true },
            { key: 'surcharge', dict: true },
        ],
    },
    key: 'subscription_find',
    noun: 'Subscription',
    display: {
        label: 'Find a subscription',
        description: 'Finds a subscription using the SubscriptionId',
        hidden: false,
        important: true,
    },
};
