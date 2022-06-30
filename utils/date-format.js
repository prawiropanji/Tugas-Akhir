function ymFormat(date) {
  const dateObj = new Date(date);

  const year = dateObj.getFullYear();
  const month = '0' + (dateObj.getMonth() + 1);

  return `${year}-${month.slice(-2)}`;
}

function indonesiafullDateFormat(date) {
  const result = new Date(date).toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return result;
}

module.exports = {
  indonesiafullDateFormat,
  ymFormat,
};
