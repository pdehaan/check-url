# check-url

Check a remote URL's HTTP response.

## Why?

Because you want a poorly written link checker.

## Installation:

```sh
$ npm i check-url -S
```

## API:

```js
function checkUrl(url, method='HEAD', data={}) {...}
```

## Usage:

```js
const { checkUrl } = require('check-url');

checkUrl('http://latimes.com')
  .then((res) => console.log(res))
  .catch((err) => console.error(err.message));
```

### Output:
```json
{ "contentType": "text/html;charset=UTF-8",
  "ok": true,
  "origUrl": "http://latimes.com",
  "status": 200,
  "statusText": "OK",
  "url": "http://www.latimes.com/" }
```

In some cases, a server may not respond to a `method=HEAD` request, so you can override the request method by passing the optional second parameter, `method`, as seen in the following example:

```js
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
```

Similarly, if you want the promise to pass you back some data, you can pass an optional third parameter, `data`, which will be merged into the response:

```js
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
```

Or, if you're trying to process obscenely large lists of URLs, you may need to throttle yourself, before you wreck yourself:

```js
const { checkUrl } = require('check-url');

const Queue = require('promise-queue');
const tippyTopSites = require('tippy-top-sites');

const queue = new Queue(10);

tippyTopSites.forEach(({url}) => queue.add(() => {
  return checkUrl(url)
    .then((res) => console.log(res))
    .then(() => {
      if (queue.getQueueLength() === 0) {
        console.log('queue empty...');
        process.exit(0);
      }
    });
}));
```
