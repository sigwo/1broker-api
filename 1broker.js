'use strict';
var request  = require('requestretry');
/**
 * 1broker connects to the OKCoin.cn API
 * @param {String} api_key
 */
function oneBroker(api_key) {
  var self = this;
  var config = {
    url: 'https://www.1broker.com/api',
    version: 'v1',
    api_key: api_key,
    timeoutMS: 10000
  };
  /**
  * Private methods supported
  * For information on the parameters, check 1broker website https://1broker.com/?c=api_documentation
  */

  /* Account */
  function accountInfo(callback) {
    var path  = '/' + config.version + '/account/info.php';
    var params = {};
    return apiMethod(path, params, callback);
  }
  function accountAddress(callback) {
    var path  = '/' + config.version + '/account/bitcoindepositaddress.php';
    var params = {};
    return apiMethod(path, params, callback);
  }
  /* Orders */

  function openOrder(callback) {
    var path = '/' + config.version + '/order/list_open.php';
    var params = {};
    return apiMethod(path, params, callback);
  }

  /* Position */
  function positionList(callback) {
    var path  = '/' + config.version + '/position/list_open.php';
    var params = {};
    return apiMethod(path, params, callback);
  }
  function positionEdit(position_id, callback) {
    var path  = '/' + config.version + '/position/list_open.php';
    var params = {};
    return apiMethod(path, params, callback);
  }
  /* Market Data */
  function marketList(callback) {
    var path  = '/' + config.version + '/market/list.php';
    var params = {};
    return apiMethod(path, params, callback);
  }
  function marketDetail(symbol, callback) {
    var path  = '/' + config.version + '/market/detail.php';
    var params = "symbol="+symbol;
    return apiMethod(path, params, callback);
  }
  function marketQuotes(symbols, callback) {
    var path  = '/' + config.version + '/market/quotes.php';
    var params = "symbols="+symbols;
    return apiMethod(path, params, callback);
  }
  /**
   * This method makes a private API request.
   * @param  {String}   path   The path to the API method
   * @param  {Object}   params   String of arguments to pass to the api call
   * @param  {Function} callback A callback function to be executed when the request is complete
   * @return {Object}            The request object
   */
  function apiMethod(path, params, callback) {
    var url    = config.url + path + '?token=' + config.api_key;
    if(params) url = url+= '&'+params;
    return apiRequest(url, callback);
  }
  /**
   * This method sends the actual HTTP request
   * @param  {String}   url      The URL to make the request
   * @param  {String}   requestType   POST or GET
   * @param  {Object}   params   POST or GET body
   * @param  {Function} callback A callback function to call when the request is complete
   * @return {Object}            The request object
   */
  function apiRequest(url, callback) {
    var options = {
      url: url,
      method: 'GET',
			timeout: config.timeoutMS,
      maxAttempts: 3,
      retryDelay: 2000,  // (default) wait for 2s before trying again
      retryStrategy: request.RetryStrategies.HTTPOrNetworkError // (default) retry on 5xx or network errors
    };

    var req = request(options, function(error, response, body) {
      if(typeof callback === 'function') {
        var data;
        if(error) {
          callback.call(self, new Error('Error in server response: ' + JSON.stringify(error)), null);
          return;
        }
        try {
          data = JSON.parse(body);
          if(data.error != false){
            callback.call(self, new Error('API error.'), null);
          } else {
            // All good.
            callback.call(self,null,data.response);
          }
        }
        catch(e) {
          callback.call(self, new Error('Could unknown server response occured.'), null);
          return;
        }
      }
    });

    return req;
  }

  self.accountInfo = accountInfo;
  self.accountAddress = accountAddress;
  self.openOrder = openOrder;
  self.positionList = positionList;
  self.positionEdit = positionEdit;
  self.marketList = marketList;
  self.marketDetail = marketDetail;
  self.marketQuotes = marketQuotes;
}

module.exports = oneBroker;
