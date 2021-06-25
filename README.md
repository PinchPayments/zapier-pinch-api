[![Deploy](https://github.com/PinchPayments/zapier-pinch-api/actions/workflows/deploy.yml/badge.svg)](https://github.com/PinchPayments/zapier-pinch-api/actions/workflows/deploy.yml)

# Zapier CLI Integration

Source code for the Zapier integration with [Pinch](https://getpinch.com.au)

## Running the Zapier tests locally

Create a `.env` file in your root directory and fill it out with your pinch test keys.

```
ENVIRONMENT=test
MERCHANT_ID=mch_test_XXXXXXXXXXX
SECRET_KEY=sk_test_XXXXXXXXXXXXXXXXXX
```

Run `npm ci` then `npm run zapier:test` in your console to run the zapier integration tests.

## Adding Pinch to your Zapier

**Step 1**: Pinch Zapier integration is still in beta so [use this link](https://zapier.com/developer/public-invite/132077/5e3cdd4e731d526ef35fe4e8aa2cef37/) to invite yourself to the beta.

**Step 2**: [Signup to Pinch](https://www.getpinch.com.au/get-pinch/) so that you can access your generated API keys from the portal.

**Step 3**: In Zapier, select new Zap and search for `Pinch` and add connection. You will be presented with a screen below. fill this out with the required details by clicking the links in the help text to be taken to the API keys area. 

![add-connection](https://user-images.githubusercontent.com/241857/123360850-5829e380-d5b1-11eb-8d6d-9f17e1bbf39a.PNG)

**Step 4**: Press confirm and Zapier will create a connection to Pinch.

![connections](https://user-images.githubusercontent.com/241857/123360864-5e1fc480-d5b1-11eb-8469-7c40bcf180d7.PNG)

**Note**: You can add as many connections as you would like. On the example above we have a test connection as well as a live connection. Useful if you would like to test out a Zap functionality without affecting your production merchant.

## Integrations

This integration contains 1 trigger, 4 actions, and 2 searches:

- [__Triggers__](#triggers)
    - New Webhook Event
- [__Actions__](#actions)
    - Create Payer
    - Create Realtime Payment
    - Create Scheduled Payment
    - Create Payment Source
- [__Searches__](#searches)
    - Find Webhook Event
    - Find Payer

## Triggers

Using the Pinch integration, you only need to configure the Zap in Zapier. The events are queried via polling and will trigger each time a webhook event is fired off.

The output of a trigger in Zapier is exactly what [Pinch's Event](https://docs.getpinch.com.au/reference#list-all-events) is retrieved by Zapier. It will looks something like this:

```js
{
    {
        "id": "evt_XXXX78",
        "type": "payment-created",
        "eventDate": "2021-04-21T00:05:52.2322638",
        "metadata": {
            "status": "scheduled",
            "amount": 5158
        }
    },
    {
        "id": "evt_XXXXZyCnCMGf",
        "type": "payment-created",
        "eventDate": "2021-04-21T00:05:52.1636637",
        "metadata": {
            "status": "scheduled",
            "amount": 10287
        }
    },
}
```

In each trigger, you have the option to provide an `event-type`. If you do, the Zap will be filtered for single types only. If you leave it empty, the Zap will proceed for all events.

## Actions

The integration contains actions to upsert payers, create a scheduled payment, create a realtime payment and also adding a payment source to a payer. For many of these steps, you are required to enter data in a particular format that Pinch will understand. See the Pinch documentation on what objects are expected and returned for each action.

* [Create or Update Payer](https://docs.getpinch.com.au/reference#payersid-1)
* [Create Realtime Payment](https://docs.getpinch.com.au/reference#execute-real-time-payment)
* [Create or Update Scheduled Payment](https://docs.getpinch.com.au/reference#save-a-payment)
* [Create a Payment Source](https://docs.getpinch.com.au/reference#save-a-payment-source)

## Searches

Because the event notification from Pinch only contains basic information such as a EventId and EntityId (such as PaymentId or PayerId), you may need to search Pinch for more information. For example, to load all data about a Payer you can use a __Find Payer__ action. You can search for an item based on the `id` returned from the event.

* [Find Payer](https://docs.getpinch.com.au/reference#get-payer)
* [Find Event](https://docs.getpinch.com.au/reference#get-event)

## Examples

### Hubspot Workflow with Pinch

TBA
