const { checkUrl } = require('./index');

checkUrl('http://latimes.com', 'HEAD', {_id: '__LATIMES'})
  .then((res) => console.log(res))
  .catch((err) => console.error(err.message));

/* OUTPUT:
{ _id: '__LATIMES',
  contentType: 'text/html;charset=UTF-8',
  ok: true,
  origUrl: 'http://latimes.com',
  status: 200,
  statusText: 'OK',
  url: 'http://www.latimes.com/' }
*/
