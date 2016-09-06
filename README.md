# check-url

Check a remote URL's HTTP response.

## Why?

Because you want a poorly written link checker.

## Installation:

```sh
$ npm i check-url -S
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
