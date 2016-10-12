// Copyright (c) 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
/**
 * Get the current URL.
 *
 * @param {function(string)} callback - called when the URL of the current tab
 *   is found.
 */

// TODO: ADD ARRAY OF QUOTES AND ARRAY OF BACKGROUND IMAGES TO RANDOMLY CYCLE THROUGH

function getCurrentTabUrl (callback) {
  // Query filter to be passed to chrome.tabs.query - see
  // https://developer.chrome.com/extensions/tabs#method-query
  var queryInfo = {
    active: true,
    currentWindow: true
  }

  chrome.tabs.query(queryInfo, function (tabs) {
    // chrome.tabs.query invokes the callback with a list of tabs that match the
    // query. When the popup is opened, there is certainly a window and at least
    // one tab, so we can safely assume that |tabs| is a non-empty array.
    // A window can only have one active tab at a time, so the array consists of
    // exactly one tab.
    var tab = tabs[0]

    // A tab is a plain object that provides information about the tab.
    // See https://developer.chrome.com/extensions/tabs#type-Tab
    var url = tab.url

    // tab.url is only available if the "activeTab" permission is declared.
    // If you want to see the URL of other tabs (e.g. after removing active:true
    // from |queryInfo|), then the "tabs" permission is required to see their
    // "url" properties.
    console.assert(typeof url == 'string', 'tab.url should be a string')

    callback(url)
  })

// Most methods of the Chrome extension APIs are asynchronous. This means that
// you CANNOT do something like this:
//
// var url
// chrome.tabs.query(queryInfo, function(tabs) {
//   url = tabs[0].url
// })
// alert(url); // Shows "undefined", because chrome.tabs.query is async.
}
$(document).ready(function () {
  // RANDOM NUMBER FUNCTION
  function randomIntFromInterval (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  // GENERATE RANDOM NUMBER
  var randomNumber = randomIntFromInterval(0, 5)

  // LIST OF STOIC QUOTES
  var quoteList = [
    {quote: 'Misfortune nobly born is good fortune.', author: 'Marcus Aurelius'},
    {quote: 'Difficulties strengthen the mind, as labor does the body.', author: 'Seneca'},
    {quote: 'We are disturbed not by what happens to us, but by our thoughts about what happens.', author: 'Epictetus'},
    {quote: 'Where is the good? In the will. Where is the evil? In the will. Where is neither of them? In those things that are independent of the will.', author: 'Epictetus'},
    {quote: 'Misfortune nobly born is good fortune.', author: 'Marcus Aurelius'},
    {quote: 'He who lives in harmony with himself lives in harmony with the universe.', author: 'Marcus Aurelius'}
  ]

  // LIST OF BACKGROUNDS
  var backgroundList = [
    {file: 'assets/italy.jpg'},
    {file: 'assets/rome.jpg'},
    {file: 'assets/rome2.jpg'},
    {file: 'assets/rome3.jpg'},
    {file: 'assets/rome4.jpg'},
    {file: 'assets/rome5.jpg'}
  ]

  // RANDOMLY POPULATE QUOTE, AUTHOR, & BACKGROUND
  var image = backgroundList[randomNumber]
  $('#background').css('background-image', 'url(' + image.file + ')')
  setTimeout(function () {
    var quote = quoteList[randomNumber]
    $('#message').html(quote.quote)
    $('#author').html(quote.author)
  }, 1250)

  // PRINT CURRENT RANDOM NUMBER
  console.log(randomNumber)
})
