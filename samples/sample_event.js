const defaultEventOutputFields = [
    { key: 'id', type: 'string' },
    { key: 'type', type: 'string' },
    { key: 'eventDate', type: 'datetime' },
    { key: 'metadata', dict: true },
];

module.exports = {
    defaultEventOutputFields,
};