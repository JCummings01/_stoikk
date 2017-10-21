// var _gaq = _gaq || [];
// _gaq.push(['_setAccount', 'UA-85882120-1']);
// _gaq.push(['_trackPageview']);

// (function() {
//   var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
//   ga.src = 'activate-ga.js';
//   var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
// })();

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
  // function load_options() {
  //   chrome.storage.sync.get(
  //     null, function(items) {
  //     if (items.authorAnimation == false) {
  //       document.getElementById('author').style.animationDuration="1s";
  //       $('#author').removeClass('slideInUp');
  //       $('#author').addClass('fadeIn');
  //     } else {
  //       $('#author').addClass('slideInUp');
  //     };
  //     if (items.quoteAnimation == false) {
  //       document.getElementById('message').style.animationDuration="1s";

  //       // $('#message').addClass('fadeIn');
  //   } else {
  //       $('#message').removeClass('slideInDown');
  //       $('#message').addClass('slideInDown');
  //     };
  //   });
  // }
  // load_options();

  // RANDOM NUMBER FUNCTION
  function randomIntFromInterval (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  };

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
    {quote: 'Man is affected, not by events, but by the view he takes of them.', author: 'Epictetus'},
    {quote: 'We are more often frightened than hurt; and we suffer more from imagination than from reality.', author: 'Seneca'},
    {quote: 'A ship should not ride on a single anchor, nor life on a single hope.', author: 'Epictetus'},
    {quote: 'You don`t have to turn this into something. It doesn`t have to upset you.', author: 'Marcus Aurelius'},
    {quote: 'The nearer a man comes to a calm mind, the closer he is to strength.', author: 'Marcus Aurelius'},
    {quote: 'Never let the future disturb you. You will meet it, if you have to, with the same weapons of reason which today arm you against the present.', author: 'Marcus Aurelius'},
    {quote: 'You have power over your mind - not outside events. Realize this, and you will find strength', author: 'Marcus Aurelius'},
    {quote: 'The man who has anticipated the coming of troubles takes away their power when they arrive.', author: 'Seneca'},
    {quote: 'First say to yourself what you would be; and then do what you have to do.', author: 'Epictetus'},
    {quote: 'The whole future lies in uncertainty: live immediately.', author: 'Seneca'},
    {quote: 'To accept without arrogance, to let go with indifference.', author: 'Marcus Aurelius'},
    {quote: 'You could leave life right now. Let that determine what you do and say and think.', author: 'Marcus Aurelius'},
    {quote: 'To bear trials with a calm mind robs misfortune of its strength and burden.', author: 'Seneca'},
    {quote: 'Meditate often on the interconnectedness and mutual interdependence of all things in the universe.', author: 'Marcus Aurelius'},
  ];

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
  ];

  // GENERATE RANDOM NUMBER
  var quoteListLength = quoteList.length;  
  var randomQuoteNumber = randomIntFromInterval(0, quoteListLength-1);
  var backgroundListLength = backgroundList.length;
  var randomBackgroundNumber = randomIntFromInterval(0, backgroundListLength-1);

  // RANDOMLY POPULATE QUOTE, AUTHOR, & BACKGROUND
  var image = backgroundList[randomBackgroundNumber];
  var background = document.getElementById('background');
  var imageUrl = 'url(' + image.file + ')';
  background.style.backgroundImage = imageUrl;
  setTimeout(function () {
    var quote = quoteList[randomQuoteNumber]
    var msg = document.getElementById('message');
    var author = document.getElementById('author');
    var spacer = document.getElementById('spacer');
    msg.innerHTML = quote.quote;
    author.innerHTML = quote.author;  
    spacer.style.width = '40px';
    spacer.style.opacity = '1';
  }, 250) ;

  // TWEET QUOTE FUNCTIONALITY
  setTimeout(function () {
    var msg = document.getElementById('message');
    var author = document.getElementById('author');
    var currentMsg = msg.innerHTML;
    var currentAuthor = author.innerHTML;    
    var url = 'https://twitter.com/intent/tweet?text=' + '%22' + encodeURIComponent(currentMsg) + '%22%20' + encodeURIComponent(currentAuthor) + '%20%23stoikk'
    var tweetLink = document.getElementById('tweetLink');
    tweetLink.href = url;
  }, 400);

  // TWEET HOVER EFFECT
  $('#tweetLink').hover(function(){
    $('#message').addClass('text-border');
    // $('#author').addClass('invisible');
    $('.quote-container').addClass('white-background');
    $('#author').addClass('darkgrey');
    $('#spacer').addClass('shrink');
  },function() {
    $('#message').removeClass('text-border');
    // $('#author').removeClass('invisible');
    $('.quote-container').removeClass('white-background');
    $('#author').removeClass('darkgrey');
    $('#spacer').removeClass('shrink');    
  });
});
