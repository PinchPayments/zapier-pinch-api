
![Pinch Zapier](https://user-images.githubusercontent.com/241857/124198358-d89d9680-db13-11eb-9998-81e8ed11df1c.png)

[![Deploy](https://github.com/PinchPayments/zapier-pinch-api/actions/workflows/deploy.yml/badge.svg)](https://github.com/PinchPayments/zapier-pinch-api/actions/workflows/deploy.yml)

# Zapier CLI Integration

Source code for the Zapier integration with [Pinch](https://getpinch.com.au)

## Running the Zapier tests locally

Create a `.env` file in your root directory and fill it out with your pinch test keys.

```
ENVIRONMENT=test
MERCHANT_ID=app_test_XXXXXXXXXXX
SECRET_KEY=sk_test_XXXXXXXXXXXXXXXXXX
```

Run `npm ci` then `npm run zapier:test` in your console to run the zapier integration tests.

## Adding Pinch to your Zapier

**Step 1**: Find the [Integration on Zapier](https://zapier.com/apps/pinch-payments/integrations) and connect to your Zapier account.

**Step 2**: [Signup to Pinch](https://www.getpinch.com.au/) so that you can access your generated API keys from the portal.

**Step 3**: In Zapier, select new Zap and search for `Pinch Payments` and add connection. You will be presented with the screen below. Fill this out with the required details by clicking the links in the help text to be taken to the API keys area. 

![add-connection](https://user-images.githubusercontent.com/241857/123360850-5829e380-d5b1-11eb-8d6d-9f17e1bbf39a.PNG)

**Step 4**: Press confirm and Zapier will create a connection to Pinch.

![connections](https://user-images.githubusercontent.com/241857/123360864-5e1fc480-d5b1-11eb-8469-7c40bcf180d7.PNG)

**Note**: You can add as many connections as you would like. On the example above we have a test connection as well as a live connection. Useful if you would like to test out a Zap functionality without affecting your production merchant.

## Testing with Zapier CLI

You can test actions and searches locally against the real Pinch API using the Zapier CLI.

### Install the Zapier CLI globally

```sh
npm install -g zapier-platform-cli
```

### Authenticate with your Pinch credentials

```sh
zapier invoke auth start
```

Enter your Pinch API credentials when prompted:
- **Application ID**: Your Pinch Application ID (e.g., `app_test_XXXXXXXXXXX`)
- **Secret Key**: Your Pinch Secret Key (e.g., `sk_test_XXXXXXXXXXX`)
- **Environment**: `test` or `live`

### Test actions and searches

```sh
# Find a payer
zapier invoke search payer_find

# Create a payment link
zapier invoke create payment_link_create

# Find a payment link
zapier invoke search payment_link_find

# Find all payment links
zapier invoke search payment_links_find
```

You will be prompted to enter the required input fields interactively.

### Validate the integration

```sh
zapier validate
```

## Integrations

This integration contains 9 triggers, 7 actions, and 6 searches:

[__Triggers__](#triggers)
- New Event
- Bank Results Event
- Scheduled Payments Processed Event
- Payer Created Event
- Payer Updated Event
- Realtime Payment Event
- Subscription Created Event
- Subscription Cancelled Event
- Subscription Completed Event

[__Actions__](#actions)
- Create Payer
- Create Realtime Payment
- Create Scheduled Payment
- Create Payment Source
- Create Subscription
- Create Payment Link
- Delete Payment Link

[__Searches__](#searches)
- Find Payer
- Find Subscription
- Find Event
- Find Payment Link
- Find Payment Links
- Find Payment Links by Payer

## Triggers

The Pinch integration for Zapier has 8 different triggers, these are all related to events that happen within the Pinch platform.
The `New Event` trigger will return all event types without the specific payloads so will need to be used in conjunction with the `Find Event` action to get the data behind it, this trigger is for more advanced integrations that are not covered by the other event triggers.

`Bank Results Event` is triggered when a bank account transaction returns (as these take time to process) and could result in a dishonour status. If you are taking bank account transactions you will need to listen for this event otherwise you may miss failed payments.

`Payer Created Event` is triggered when a new Payer is created in Pinch.

`Payer Updated Event` is triggered when a Payer is updated in Pinch (This includes a Payment Source being added)

`Realtime Payment Event` is triggered when a new Realtime Payment is created in Pinch.

`Subscription Created Event` is triggered when a Subscription is created for a Payer.

`Subscription Cancelled Event` is triggered when a Subscription is cancelled.

`Subscription Completed Event` is triggered when a Subscription is run to completion.


## Actions

The integration contains actions to upsert payers, create a scheduled payment, create a realtime payment and also adding a payment source to a payer. For many of these steps, you are required to enter data in a particular format that Pinch will understand. See the Pinch documentation on what objects are expected and returned for each action.

* [Create or Update Payer](https://docs.getpinch.com.au/reference/save-payer)
* [Create Realtime Payment](https://docs.getpinch.com.au/reference/realtime-payment)
* [Create or Update Scheduled Payment](https://docs.getpinch.com.au/reference/save-payment)
* [Create a Payment Source](https://docs.getpinch.com.au/reference/create-payment-source)
* [Create Payment Link](https://docs.getpinch.com.au/reference/create-payment-link)
* [Delete Payment Link](https://docs.getpinch.com.au/reference/delete-payment-link)

## Searches

Because the event notification from Pinch only contains basic information such as a EventId and EntityId (such as PaymentId or PayerId), you may need to search Pinch for more information. For example, to load all data about a Payer you can use a __Find Payer__ action. You can search for an item based on the `id` returned from the event.

* [Find Payer](https://docs.getpinch.com.au/reference/get-payer)
* [Find Subscription](https://docs.getpinch.com.au/reference/get-subscription)
* [Find Event](https://docs.getpinch.com.au/reference/get-event)
* [Find Payment Link](https://docs.getpinch.com.au/reference/get-payment-link)
* [Find Payment Links](https://docs.getpinch.com.au/reference/get-payment-links)
* [Find Payment Links by Payer](https://docs.getpinch.com.au/reference/get-payment-links-by-payer)

## Examples
