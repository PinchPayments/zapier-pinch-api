const { BASE_URL } = require('../constants');

const deletePaymentLink = (z, bundle) => {
  const options = {
    url: `${BASE_URL}/${bundle.authData.environment}/payment-links/${bundle.inputData.id}`,
    method: 'DELETE',
  };

  return z.request(options).then((response) => {
    response.throwForStatus();
    return { id: bundle.inputData.id, deleted: true };
  });
};

module.exports = {
  operation: {
    perform: deletePaymentLink,
    inputFields: [
      {
        key: 'id',
        label: 'Payment Link Id',
        type: 'string',
        helpText: 'Payment Link Id (string identifier starting with plk_).',
        required: true,
        list: false,
        altersDynamicFields: false,
      },
    ],
    sample: {
      id: 'plk_XXXXXXXXXXXXXX',
      deleted: true,
    },
    outputFields: [
      { key: 'id' },
      { key: 'deleted',type: 'boolean' },
    ],
  },
  key: 'payment_link_delete',
  noun: 'Payment Link',
  display: {
    label: 'Delete Payment Link',
    description: 'Deletes a payment link.',
  },
};
