# SteamTradeLink for Node.js

This module provides a SteamTradeLink object which makes Steam trade link usage easy.

# Installation

Install it from npm:

    $ npm install @nolddor/steam-tradelink

# Brief Overview

A SteamTradeLink is made up of two parts: its **token** and its **partner**.

# SteamTradeLink Creation

You can create a SteamTradeLink object from a tradelink URL, or from the four parts that make up a SteamTradeLink.

## SteamTradeLink URL
```js
const SteamTradeLink = require('@nolddor/steam-tradelink')
let tradelink = new SteamTradeLink('https://steamcommunity.com/tradeoffer/new/?partner=1022946155&token=gIfL8D7z')
let partner = tradelink.getPartner()
let token = tradelink.getToken()
```

## SteamTradeLink Parts
```js
const SteamTradeLink = require('@nolddor/steam-tradelink')
let tradelink = SteamTradeLink.of(1022946155, 'gIfL8D7z')
let url = tradelink.toURL()
```

# Using a SteamTradeLink

Once you have created a `SteamTradeLink` object, you can access its properties (`token`, and `partner`),
or you can render it as URL.

## getToken()

Returns this `token` SteamTradeLink part.

## getPartner()

Returns this `partner` SteamTradeLink part as **[SteamID](https://www.npmjs.com/package/steamid)** class.

## isValid()

Returns whether Steam would consider a given tradelink to be "well-formed". This does not check whether the given tradelink belongs to a
real account that exists, nor does it check that the given tradelink is valid to send trades.


## getURL()

Returns the SteamTradeLink object as URL. Throws an error if the tradelink isn't valid.

# Tests

Use `npm run test` to run the included test suite.
