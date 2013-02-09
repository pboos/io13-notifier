/*global require, __dirname*/
var request = require('request');
var qs = require('querystring');
var config = require(__dirname + '/config.json');
var pushover = new require('pushover-notifications');
var push = new pushover(config.apis.pushover);

var sent = {
  titles: [],
  links: []
};

var hasBeenSent = function(item) {
  return ~sent.titles.indexOf(item.title) || ~sent.links.indexOf(item.link);
};

var addSent = function(item) {
  sent.titles.push(item.title);
  sent.links.push(item.link);

  if (sent.titles.length > 20) {
    sent.titles.splice(0,1);
    sent.links.splice(0,10);
  }
};

var getLastGPlusPost = function(callback) {
  var params = {
    key: config.apis.gplus.api_key,
    query: '#io13',
    orderBy: 'recent',
    maxResults: 1
  };
  var url = 'https://www.googleapis.com/plus/v1/activities?' + qs.stringify(params);
  request(url, function(err, res, body) {
    if (err) { return callback(err); }

    var json = JSON.parse(body);
    if (!json || !json.items || json.items.length < 1) { return callback('No items'); }

    var item = json.items[0];
    callback(null, {title: item.title, link: item.url});
  });
};

var handleItem = function(item) {
  if (hasBeenSent(item)) { return; }

  console.log(item.title.replace(/\n/gi, '|') + ' (' + item.link + ')');
  var msg = {
    title: item.title,
    message: item.link
  };
  push.send(msg, function(err, result) {
    if (err) { return; }
    addSent(item);
  });
};

setInterval(function() {
  getLastGPlusPost(function(err, item) {
    if (err) { return; }
    handleItem(item);
  });
}, 60 * 1000);