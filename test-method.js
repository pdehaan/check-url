const { checkUrl } = require('./index');

checkUrl('https://www.wellsfargo.com', 'HEAD', {__method: 'HEAD'})
  .then((res) => console.log(res))
  .catch((err) => console.error(err.message));

/* OUTPUT:
{ __method: 'HEAD',
  contentType: 'text/html;charset=UTF-8',
  ok: false,
  origUrl: 'https://www.wellsfargo.com',
  status: 400,
  statusText: 'Bad request',
  url: 'https://www.wellsfargo.com' }
*/


checkUrl('https://www.wellsfargo.com', 'GET', {__method: 'GET'})
  .then((res) => console.log(res))
  .catch((err) => console.error(err.message));

/* OUTPUT
{ __method: 'GET',
  contentType: 'text/html;charset=UTF-8',
  ok: true,
  origUrl: 'https://www.wellsfargo.com',
  status: 200,
  statusText: 'OK',
  url: 'https://www.wellsfargo.com' }
*/
