const currencyFormatter = require('currency-formatter');

function formatIDCurrency(price) {
  const formatedPrice = currencyFormatter.format(price, {
    locale: 'id-ID',
  });

  return `${formatedPrice},00`;
}

module.exports = formatIDCurrency;
