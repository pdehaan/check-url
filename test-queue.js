const { checkUrl } = require('./index');

const Queue = require('promise-queue');
const tippyTopSites = require('tippy-top-sites');

const queue = new Queue(10);

tippyTopSites.forEach(({url}) => queue.add(() => {
  return checkUrl(url)
    .then((res) => console.log(res))
    .then(() => {
      if (queue.getQueueLength() === 0) {
        console.log('queue empty?');
        process.exit(0);
      }
    });
}));
