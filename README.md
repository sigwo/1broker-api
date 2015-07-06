##1Broker.com API
Provide basic access to the www.1broker.com API found here:

https://1broker.com/?c=api_documentation

API provides a NodeJS wrapper for the API and returns the JSON formatted results per the API spec. Will update as API evolves and orders API is coming soon.

**Bitcoin:** 1MbRSzoCJkiydxfxAjZdMbej37dp5pkLNN

**1Broker:** https://1broker.com/m/r.php?i=2711

**BitGold:** https://BitGold.com/r/ARKmcl

####Usage
```
npm install 1broker
```
app.js
```
var oneBroker =  require('1broker');
var oB = new oneBroker('abcd1234'); // Replace with your API key
```
###Functions

** Acccount **

accountInfo()

accountAddress()

** Position **

positionList()

positionEdit(position_id)

** Market Data **

marketList()

marketDetail(symbol)

marketQuotes(symbols)
