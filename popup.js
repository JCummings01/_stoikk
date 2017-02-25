// Copyright (c) 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

function getCurrentTabUrl (callback) {
  var queryInfo = {
    active: true,
    currentWindow: true
  }

  chrome.tabs.query(queryInfo, function (tabs) {
    var tab = tabs[0]
    var url = tab.url
    console.assert(typeof url == 'string', 'tab.url should be a string')
    callback(url)
  })
}

$(document).ready(function () {
  // LOAD OPTIONS SETTINGS
  function load_options() {
    chrome.storage.sync.get(
      null, function(items) {
      console.log('storage work?',items)
      if (items.authorAnimation == false) {
        document.getElementById('author').style.animationDuration="1s";
        $('#author').removeClass('slideInUp');
        $('#author').addClass('fadeIn');
      } else {
        $('#author').addClass('slideInUp');
      };
      if (items.quoteAnimation == false) {
        document.getElementById('message').style.animationDuration="1s";
        $('#message').removeClass('slideInDown');
        $('#message').addClass('fadeIn');
      } else {
        $('#message').addClass('slideInDown');
      };
    });
  }
  load_options();

  // RANDOM NUMBER FUNCTION
  function randomIntFromInterval (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  // GENERATE RANDOM NUMBER
  var randomNumber = randomIntFromInterval(0, 11)

  // LIST OF STOIC QUOTES
  var quoteList = [
    {quote: 'Misfortune nobly born is good fortune.', author: 'Marcus Aurelius'},
    {quote: 'Difficulties strengthen the mind, as labor does the body.', author: 'Seneca'},
    {quote: 'We are disturbed not by what happens to us, but by our thoughts about what happens.', author: 'Epictetus'},
    {quote: 'Where is the good? In the will. Where is the evil? In the will. Where is neither of them? In those things that are independent of the will.', author: 'Epictetus'},
    {quote: 'Misfortune nobly born is good fortune.', author: 'Marcus Aurelius'},
    {quote: 'He who lives in harmony with himself lives in harmony with the universe.', author: 'Marcus Aurelius'},
    {quote: 'No man is free who is not master of himself.', author: 'Epictetus'},
    {quote: 'Cultivate these, then, for they are wholly within your power: sincerity, dignity, industriousness, sobriety.', author: 'Marcus Aurelius'},
    {quote: "For the passing minute is every man's equal possession, but what has once gone by is not ours.", author: 'Marcus Aurelius'},
    {quote: "Concentrate every minute on doing what's in front of you with precise and genuine seriousness, tenderly, willingly, with justice.", author: 'Marcus Aurelius'},
    {quote: 'Actions performed through anger are less detestable than actions performed through lust. A man acting through anger most likely has an external force causing the action. A man acting through lust is simply seeking pleasure and his actions are purely his own.', author: 'Marcus Aurelius'},
    {quote: 'Man is affected, not by events, but by the view he takes of them.', author: 'Epictetus'}
  ]

  // LIST OF BACKGROUNDS
  var backgroundList = [
    {file: 'assets/italy.jpg'},
    {file: 'assets/rome.jpg'},
    {file: 'assets/rome2.jpg'},
    {file: 'assets/rome4.jpg'},
    {file: 'assets/rome5.jpg'},
    {file: 'assets/italy2.jpg'},
    {file: 'assets/italy2.jpg'},
    {file: 'assets/italy3.jpg'},
    {file: 'assets/italy3.jpg'},
    {file: 'assets/italy4.jpg'},
    {file: 'assets/italy4.jpg'},
    {file: 'assets/italy5.jpg'}
  ]

  // RANDOMLY POPULATE QUOTE, AUTHOR, & BACKGROUND
  var image = backgroundList[randomNumber]
  $('#background').css('background-image', 'url(' + image.file + ')')
  setTimeout(function () {
    var quote = quoteList[randomNumber]
    $('#message').html(quote.quote)
    $('#author').html(quote.author)
  }, 1250) 

  //TWEET QUOTE FUNCTIONALITY
  setTimeout(function () {
    var msg = $('#message').html();
    var author = $('#author').html();
    var url = "https://twitter.com/intent/tweet?text=" + '%22' + encodeURIComponent(msg) + '%22%20' + encodeURIComponent(author) + '%20%23stoikk'
    $("#tweetLink").attr("href", url)
    console.log(url);
  }, 1250);
   
})
