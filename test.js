const { checkUrl } = require('./index');

checkUrl('http://latimes.com')
  .then((res) => console.log(res))
  .catch((err) => console.error(err.message));
