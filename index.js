const fetch = require('node-fetch');

exports.checkUrl = checkUrl;

/**
 * Fetch a remote URL and return status code information.
 * @param  {String} url    Remote URL to check.
 * @param  {String} method HTTP method to use (ie: 'GET', or 'HEAD'). Optional. Default: 'HEAD'.
 * @param  {Object} data   Object to return with the response. Optional.
 * @return {Promise}       A Promise which resolves with the `content-type`, `ok`, `status`, `statusText`, `url`, and optional `data` values.
 */
function checkUrl(url, method='HEAD', data={}) {
  return fetch(url, {method})
    .then((res) => {
      return Object.assign(data, {
        contentType: res.headers.get('content-type'),
        ok: res.ok,
        origUrl: url,
        status: res.status,
        statusText: res.statusText,
        url: res.url
      });
    });
}
