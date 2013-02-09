io13-notifier
=============

Node.js script to watch the #io13 feed for new messages. Based on [node-google-io-watcher](https://github.com/SamDecrock/node-google-io-watcher) by [SamDecrock](https://github.com/SamDecrock).

## What it does ##
If a new post about #io13 shows up, it uses the [pushover](https://pushover.net/) to notify you.

## Installation ##
Get the [Pushover app](https://pushover.net/), create an app and add a device. This should give you a ***token*** and a ***userkey***.

Get a Google+ key at https://code.google.com/apis/console/b/1/. Don't forget to enable Google+ at ***Services tab***

```shell
cp config.sample.json config.json
vim config.json
```

## Usage ##
Just run

```shell
node app.js
```