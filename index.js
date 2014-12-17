'use strict';

var http = require('http');
var q = require('q');
var request = require('request');
var config = require('./config');

var get = q.nbind(request, get);

http.createServer(function (req, res) {
    // @TODO: add twitter, instagram
    q.all([
        get('http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=hochitom&format=json&api_key=' + config.keys.lastfm),
    ])
    .spread(function (lastfm, twitter) {
        lastfm = lastfm[0];

        // @TODO: normalize data

        res.end(lastfm);
    })
    .fail(function (err) {
        console.error(err);
        res.end(err);
    });
}).listen(1337, '127.0.0.1');

console.log('Server running at http://127.0.0.1:1337/');
