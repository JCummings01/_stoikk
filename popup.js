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
    {quote: 'Ask not that events should happen as you will, but let your will be that events should happen as they do, and you shall have peace.', author: 'Epictetus'},
    {quote: 'If you have assumed a part beyond your power to play, then you have not only come to shame in that, but have missed one which you could have thoroughly fulfilled.', author: 'Epictetus'},
    {quote: 'These reasonings do not cohere: I am richer than you, therefore I am better than you; I am more eloquent than you, therefore I am better than you. On the contrary these rather cohere, I am richer than you, therefore my possessions are greater than yours: I am more eloquent than you, therefore my speech is superior to yours. But you are neither possession nor speech.', author: 'Epictetus'},
    {quote: 'There’s danger in regurgitating what you’ve only partly digested. And if someone tells you that you don’t know anything, and you aren’t bothered, then you’ve made a beginning at wisdom.', author: 'Epictetus'},
    {quote: 'Whatever principles you put before you, hold fast to them as laws which it will be impious to transgress. But pay no heed to what any one says of you; for this is something beyond your own control.', author: 'Epictetus'},
    {quote: 'How long will you wait before you consider yourself capable of the best, and of living in accord with reason? You’ve been through the reasoning and accepted the principles. What great master are you waiting for, so that you can stall your improvement until his arrival? ', author: 'Epictetus'},
    {quote: 'You’re no longer a child, but an adult. If you’re negligent and lazy, keep delaying and making a collection of one good intention after another, naming day after day on which you’ll start to take care of yourself, you’ll just go on without getting better, and you’ll live and die miserable.', author: 'Epictetus'},
    {quote: 'When you imagine some pleasure, beware that it does not carry you away, like other imaginations. Wait a while, and give yourself pause. Next remember two things: how long you will enjoy the pleasure, and also how long you will afterwards repent and revile yourself. And set on the other side the joy and self-satisfaction you will feel if you refrain.', author: 'Epictetus'},
    {quote: 'If any one tells you that such a person speaks ill of you, do not make excuses about what is said of you, but answer: “He was ignorant of my other faults, else he would not have mentioned these alone.”', author: 'Epictetus'},
    {quote: 'When any person does ill by you, or speaks ill of you, remember that he acts or speaks from an impression that it is right for him to do so.', author: 'Epictetus'},
    {quote: 'Sickness is a hindrance to the body, but not to the will, unless the will consent. Lameness is a hindrance to the leg, but not to the will. Say this to yourself at each event that happens, for you shall find that though it hinders something else it will not hinder you.', author: 'Epictetus'},
    {quote: 'Never say of anything, “I have lost it;” but, “ I have restored it.” Has your child died? It is restored. Has your wife died? She is restored. Has your estate been taken away? That likewise is restored. “ But it was a bad man who took it.” What is it to you by whose hands he who gave it has demanded it again? While he permits you to possess it, hold it as something not your own; as do travellers at an inn.', author: 'Epictetus'},
    {quote: 'Let death and exile, and all other things which appear terrible, be daily before your eyes, but death chiefly; and you will never entertain any abject thought, nor too eagerly covet anything.', author: 'Epictetus'},
    {quote: 'If a person gave your body to any stranger he met on his way, you would certainly be angry. And do you feel no shame in handing over your own mind to be confused and mystified by anyone who happens to verbally attack you?', author: 'Epictetus'},
    {quote: 'Provide things relating to the body no farther than absolute need requires; as meat, drink, clothing, house, retinue. But cut off everything that looks towards show and luxury.', author: 'Epictetus'},
    {quote: 'When you do anything from a clear judgment that it ought to be done, never shrink from being seen to do it, even though the world should misunderstand it; for if you are not acting rightly, shun the action itself; if you are, why fear those who wrongly censure you?', author: 'Epictetus'},
    {quote: 'Does any one bathe hastily? Do not say that he does it ill, but hastily. Does any one drink much wine? Do not say that he does ill, but that he drinks a great deal. For unless you perfectly understand his motives, how should you know if he acts ill? Thus you will not risk yielding to any appearances but such as you fully comprehend.', author: 'Epictetus'},
    {quote: 'When you have adopted the simple life, do not pride yourself upon it, and if you are a water-drinker do not say on every occasion, ‘I am a water-drinker.’ And if you ever want to train laboriously, keep it to yourself and do not make a show of it.', author: 'Epictetus'},
    {quote: 'Whatever principles you put before you, hold fast to them as laws which it will be impious to transgress. But pay no heed to what any one says of you; for this is something beyond your own control.', author: 'Epictetus'},
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
