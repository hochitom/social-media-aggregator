'use strict';

var http = require('http');
var q = require('q');
var request = require('request');
var config = require('./config');

var get = q.nbind(request, get);

http.createServer(function (req, res) {
    // @TODO: add twitter, instagram
    q.allSettled([
        get('http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=hochitom&format=json&api_key=' + config.keys.lastfm),
        get('http://api.tumblr.com/v2/blog/hlbh.tumblr.com/posts?api_key=' + config.keys.tumblr)
    ])
    .spread(function (lastfm, tumblr) {
        lastfm = lastfm.value[0].body;
        tumblr = tumblr.value[0].body;

        // @TODO: normalize data

        res.end(tumblr);
    })
    .fail(function (err) {
        console.error(err);
        res.end(err);
    });
}).listen(1337, '127.0.0.1');

console.log('Server running at http://127.0.0.1:1337/');
