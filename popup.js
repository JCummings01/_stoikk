// TODO: Add Google Analytics (check dashboard)
// TODO: Add Typescript
// TODO: Add back options page
// TODO: Add badge/icon for extension page
//
//

function getCurrentTabUrl(callback) {
    var queryInfo = {
        active: true,
        currentWindow: true
    }

    chrome.tabs.query(queryInfo, function (tabs) {
        var tab = tabs[0]
        var url = tab.url
        console.assert(typeof url == "string", "tab.url should be a string")
        callback(url)
    })
}

$(document).ready(function () {
    // LOAD OPTIONS SETTINGS
    // function load_options() {
    //   chrome.storage.sync.get(
    //     null, function(items) {
    //     if (items.authorAnimation == false) {
    //       document.getElementById("author").style.animationDuration="1s";
    //       $("#author").removeClass("slideInUp");
    //       $("#author").addClass("fadeIn");
    //     } else {
    //       $("#author").addClass("slideInUp");
    //     };
    //     if (items.quoteAnimation == false) {
    //       document.getElementById("message").style.animationDuration="1s";

    //       // $("#message").addClass("fadeIn");
    //   } else {
    //       $("#message").removeClass("slideInDown");
    //       $("#message").addClass("slideInDown");
    //     };
    //   });
    // }
    // load_options();

    // RANDOM NUMBER FUNCTION
    function randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min)
    };

    // LIST OF STOIC QUOTES
    var quoteList = [
      {
            quote: "Misfortune nobly born is good fortune.",
            author: "Marcus Aurelius"
        },
        {
            quote: "That sort of person is bound to do that.<br>You might as well resent a fig tree for secreting juice.<br>(Anyway, before very long you'll both be dead-dead and soon forgotten)",
            author: "Marcus Aurelius"
        },
        {
            quote: "Forget everything else.<br>Keep hold of this alone and remember it: Each of us lives only now, this brief instant.<br>The rest has been lived already, or is impossible to see.<br>The span we live is small-small as the corner of the earth in which we live it.<br>Small as even the greatest renown, passed from mouth to mouth by short-lived stick figures, ignorant alike of themselves and those long dead.",
            author: "Marcus Aurelius"
        },
        {
            quote: "When you have adopted the simple life, do not pride yourself upon it, and if you are a water-drinker do not say on every occasion, 'I am a water-drinker.\' And if you ever want to train laboriously, keep it to yourself and do not make a show of it.",
            author: "Epictetus"
        },
        {
            quote: "Difficulties strengthen the mind, as labor does the body.",
            author: "Seneca"
        },
        {
            quote: "We are disturbed not by what happens to us, but by our thoughts about what happens.",
            author: "Epictetus"
        },
        {
            quote: "Where is the good? In the will.<br>Where is the evil? In the will.<br>Where is neither of them? In those things that are independent of the will.",
            author: "Epictetus"
        },
        {
            quote: "Misfortune nobly born is good fortune.",
            author: "Marcus Aurelius"
        },
        {
            quote: "He who lives in harmony with himself lives in harmony with the universe.",
            author: "Marcus Aurelius"
        },
        {
            quote: "No man is free who is not master of himself.",
            author: "Epictetus"
        },
        {
            quote: "Cultivate these, then, for they are wholly within your power: sincerity, dignity, industriousness, sobriety.",
            author: "Marcus Aurelius"
        },
        {
            quote: "For the passing minute is every man\'s equal possession, but what has once gone by is not ours.",
            author: "Marcus Aurelius"
        },
        {
            quote: "Concentrate every minute on doing what\'s in front of you with precise and genuine seriousness, tenderly, willingly, with justice.",
            author: "Marcus Aurelius"
        },
        {
            quote: "Actions performed through anger are less detestable than actions performed through lust.<br>A man acting through anger most likely has an external force causing the action.<br>A man acting through lust is simply seeking pleasure and his actions are purely his own.",
            author: "Marcus Aurelius"
        },
        {
            quote: "Man is affected, not by events, but by the view he takes of them.",
            author: "Epictetus"
        },
        {
            quote: "We are more often frightened than hurt; and we suffer more from imagination than from reality.",
            author: "Seneca"
        },
        {
            quote: "A ship should not ride on a single anchor, nor life on a single hope.",
            author: "Epictetus"
        },
        {
            quote: "You don't have to turn this into something.<br>It doesn't have to upset you.",
            author: "Marcus Aurelius"
        },
        {
            quote: "The nearer a man comes to a calm mind, the closer he is to strength.",
            author: "Marcus Aurelius"
        },
        {
            quote: "Never let the future disturb you.<br>You will meet it, if you have to, with the same weapons of reason which today arm you against the present.",
            author: "Marcus Aurelius"
        },
        {
            quote: "You have power over your mind - not outside events.<br>Realize this, and you will find strength.",
            author: "Marcus Aurelius"
        },
        {
            quote: "The man who has anticipated the coming of troubles takes away their power when they arrive.",
            author: "Seneca"
        },
        {
            quote: "First say to yourself what you would be; and then do what you have to do.",
            author: "Epictetus"
        },
        {
            quote: "The whole future lies in uncertainty: live immediately.",
            author: "Seneca"
        },
        {
            quote: "To accept without arrogance, to let go with indifference.",
            author: "Marcus Aurelius"
        },
        {
            quote: "You could leave life right now.<br>Let that determine what you do and say and think.",
            author: "Marcus Aurelius"
        },
        {
            quote: "To bear trials with a calm mind robs misfortune of its strength and burden.",
            author: "Seneca"
        },
        {
            quote: "Meditate often on the interconnectedness and mutual interdependence of all things in the universe.",
            author: "Marcus Aurelius"
        },
        {
            quote: "Ask not that events should happen as you will, but let your will be that events should happen as they do, and you shall have peace.",
            author: "Epictetus"
        },
        {
            quote: "If you have assumed a part beyond your power to play, then you have not only come to shame in that, but have missed one which you could have thoroughly fulfilled.",
            author: "Epictetus"
        },
        {
            quote: "These reasonings do not cohere: I am richer than you, therefore I am better than you; I am more eloquent than you, therefore I am better than you.<br>On the contrary these rather cohere, I am richer than you, therefore my possessions are greater than yours: I am more eloquent than you, therefore my speech is superior to yours.<br>But you are neither possession nor speech.",
            author: "Epictetus"
        },
        {
            quote: "There\'s danger in regurgitating what you\'ve only partly digested.<br>And if someone tells you that you don\'t know anything, and you aren\'t bothered, then you\'ve made a beginning at wisdom.",
            author: "Epictetus"
        },
        {
            quote: "Whatever principles you put before you, hold fast to them as laws which it will be impious to transgress.<br>But pay no heed to what any one says of you; for this is something beyond your own control.",
            author: "Epictetus"
        },
        {
            quote: "How long will you wait before you consider yourself capable of the best, and of living in accord with reason? You\'ve been through the reasoning and accepted the principles.<br>What great master are you waiting for, so that you can stall your improvement until his arrival? ",
            author: "Epictetus"
        },
        {
            quote: "You\'re no longer a child, but an adult.<br>If you\'re negligent and lazy, keep delaying and making a collection of one good intention after another, naming day after day on which you\'ll start to take care of yourself, you\'ll just go on without getting better, and you\'ll live and die miserable.",
            author: "Epictetus"
        },
        {
            quote: "When you imagine some pleasure, beware that it does not carry you away, like other imaginations.<br>Wait a while, and give yourself pause.<br>Next remember two things: how long you will enjoy the pleasure, and also how long you will afterwards repent and revile yourself.<br>And set on the other side the joy and self - satisfaction you will feel if you refrain.",
            author: "Epictetus"
        },
        {
            quote: "If any one tells you that such a person speaks ill of you, do not make excuses about what is said of you, but answer: 'He was ignorant of my other faults, else he would not have mentioned these alone.'",
            author: "Epictetus"
        },
        {
            quote: "When any person does ill by you, or speaks ill of you, remember that he acts or speaks from an impression that it is right for him to do so.",
            author: "Epictetus"
        },
        {
            quote: "Sickness is a hindrance to the body, but not to the will, unless the will consent.<br>Lameness is a hindrance to the leg, but not to the will.<br>Say this to yourself at each event that happens, for you shall find that though it hinders something else it will not hinder you.",
            author: "Epictetus"
        },
        {
            quote: "Never say of anything, 'I have lost it', but, 'I have restored it.' Has your child died? It is restored.<br>Has your wife died? She is restored.<br>Has your estate been taken away? That likewise is restored.<br>'But it was a bad man who took it.' What is it to you by whose hands he who gave it has demanded it again? While he permits you to possess it, hold it as something not your own; as do travellers at an inn.",
            author: "Epictetus"
        },
        {
            quote: "Let death and exile, and all other things which appear terrible, be daily before your eyes, but death chiefly; and you will never entertain any abject thought, nor too eagerly covet anything.",
            author: "Epictetus"
        },
        {
            quote: "If a person gave your body to any stranger he met on his way, you would certainly be angry.<br>And do you feel no shame in handing over your own mind to be confused and mystified by anyone who happens to verbally attack you?",
            author: "Epictetus"
        },
        {
            quote: "Provide things relating to the body no farther than absolute need requires; as meat, drink, clothing, house, retinue.<br>But cut off everything that looks towards show and luxury.",
            author: "Epictetus"
        },
        {
            quote: "When you do anything from a clear judgment that it ought to be done, never shrink from being seen to do it, even though the world should misunderstand it; for if you are not acting rightly, shun the action itself; if you are, why fear those who wrongly censure you?",
            author: "Epictetus"
        },
        {
            quote: "Does any one bathe hastily? Do not say that he does it ill, but hastily.<br>Does any one drink much wine? Do not say that he does ill, but that he drinks a great deal.<br>For unless you perfectly understand his motives, how should you know if he acts ill? Thus you will not risk yielding to any appearances but such as you fully comprehend.",
            author: "Epictetus"
        },
        {
            quote: "Whatever principles you put before you, hold fast to them as laws which it will be impious to transgress.<br>But pay no heed to what any one says of you; for this is something beyond your own control.",
            author: "Epictetus"
        },
        {
            quote: "You need to avoid certain things in your train of thought: everything random, everything irrelevant.<br>And certainly everything self-important or malicious.<br>You need to get used to winnowing your thoughts, so that if someone says, 'What are you thinking about?' you can respond at once (and truthfully) that you are thinking this or thinking that.",
            author: "Marcus Aurelius"
        },
        {
            quote: "Let the spirit in you represent a man, an adult, a citizen, a Roman, a ruler.<br>Taking up his post like a soldier and patiently awaiting his recall from life.<br>Needing no oath or witness.",
            author: "Marcus Aurelius"
        },
        {
            quote: "The mind of one set straight and purified: no pus, no dirt, no scabs.<br>And not a life cut short by death, like an actor who stops before the play is done, the plot wound up.<br>Neither servility nor arrogance.<br>Neither cringing nor disdain.<br>Neither excuses nor evasions.",
            author: "Marcus Aurelius"
        },
        {
            quote: "No random actions, none not based on underlying principles.",
            author: "Marcus Aurelius"
        },
        {
            quote: "People who are excited by posthumous fame forget that the people who remember them will soon die too.<br>And those after them in turn.<br>Until their memory, passed from one to another like a candle flame, gutters and goes out.",
            author: "Marcus Aurelius"
        },
        {
            quote: "To be like the rock that the waves keep crashing over.<br>It stands unmoved and the raging of the sea falls still around it.",
            author: "Marcus Aurelius"
        },
        {
            quote: "Some people, when they do someone a favor, are always looking for a chance to call it in.<br>And some aren\'t, but they\'re still aware of it - still regard it as a debt.<br>But others don\'t even do that.<br>They\'re like a vine that produces grapes without looking for anything in return.",
            author: "Marcus Aurelius"
        },
        {
            quote: "Not to feel exasperated, or defeated, or despondent because your days aren\'t packed with wise and moral actions.<br>But to get back up when you fail, to celebrate behaving like a human - however imperfectly - and fully embrace the pursuit that you\'ve embarked on.",
            author: "Marcus Aurelius"
        },
        {
            quote: "The things you think about determine the quality of your mind.<br>Your soul takes on the color of your thoughts.",
            author: "Marcus Aurelius"
        },
        {
            quote: "In a sense, people are our proper occupation.<br>Our job is to do them good and put up with them.<br>But when they obstruct our proper tasks, they become irrelevant to us - like sun, wind, animals.<br>Our actions may be impeded by them, but there can be no impeding our intentions or our dispositions.<br>Because we can accommodate and adapt.",
            author: "Marcus Aurelius"
        },
        {
            quote: "So other people hurt me? That\'s their problem.<br>Their character and actions are not mine.<br>What is done to me is ordained by nature, what I do by my own.",
            author: "Marcus Aurelius"
        },
        {
            quote: "The best revenge is not to be like that.",
            author: "Marcus Aurelius"
        },
        {
            quote: "Not to assume it\'s impossible because you find it hard.<br>But to recognize that if it\'s humanly possible, you can do it too.",
            author: "Marcus Aurelius"
        },
        {
            quote: "If anyone can refute me - show me I\'m making a mistake or looking at things from the wrong perspective - I\'ll gladly change.<br>It\'s the truth I\'m after, and the truth never harmed anyone.<br>What harms us is to persist in self-deceit and ignorance.",
            author: "Marcus Aurelius"
        },
        {
            quote: "How cruel - to forbid people to want what they think is good for them.<br>And yet that\'s just what you won\'t let them do when you get angry at their misbehavior.<br>They\'re drawn toward what they think is good for them - but it's not good for them - then show them that.<br>Prove it to them.<br>Instead of losing your temper.",
            author: "Marcus Aurelius"
        },
        {
            quote: "When you need encouragement, think of the qualities the people around you have: this one\'s energy, that one\'s modesty, another\'s generosity, and so on.<br>Nothing is as encouraging as when virtues are visibly embodied in the people around us, when we're practically showered with them.",
            author: "Marcus Aurelius"
        },
        {
            quote: "Do your best to convince them.<br>But act on your own, if justice requires it.<br>If met with force, then fall back on acceptance and peaceability.<br>Use the setback to practice other virtues.<br>Remember that our efforts are subject to circumstances; you weren't aiming to do the impossible.",
            author: "Marcus Aurelius"
        },
        {
            quote: "Ambition means tying your well-being to what other people say or do.<br>Self-indulgence means tying it to the things that happen to you.<br>Sanity means tying it to your own actions.",
            author: "Marcus Aurelius"
        },
        {
            quote: "Honey tastes bitter to a man with jaundice.<br>People with rabies are terrified of water.<br>And a child\'s idea of beauty is a ball.<br>Why does that upset you? Do you think falsehood is less powerful than bile or a rabid dog?",
            author: "Marcus Aurelius"
        },
        {
            quote: "Don\'t be ashamed to need help.<br>Like a soldier storming a wall, you have a mission to accomplish.<br>And if you\'ve been wounded and you need a comrade to pull you up? So what?",
            author: "Marcus Aurelius"
        },
        {
            quote: "Wash yourself clean.<br>With simplicity, with humility, with indifference to everything but right and wrong.",
            author: "Marcus Aurelius"
        },
        {
            quote: "Not a dancer but a wrestler: waiting, poised and dug in, for sudden assaults.",
            author: "Marcus Aurelius"
        },
        {
            quote: "Look at who they really are, the people whose approval you long for, and what their minds are really like.<br>Then you won\'t blame the ones who make mistakes they can\'t help, and you won\'t feel a need for their approval.",
            author: "Marcus Aurelius"
        },
        {
            quote: "It\'s silly to try to escape other people\'s faults.<br>They are inescapable.<br>Just try to escape your own.",
            author: "Marcus Aurelius"
        },
        {
            quote: "Concentrate on what you have to do.<br>Fix your eyes on it.<br>Remind yourself that your task is to be a good human being; remind yourself what nature demands of people.<br>Then do it, without hesitation, and speak the truth as you see it.<br>But with kindness.<br>With humility.<br>Without hypocrisy.",
            author: "Marcus Aurelius"
        },
        {
            quote: "Remember: you shouldn\'t be surprised that a fig tree produces figs, nor the world what it produces.<br>A good doctor isn\'t surprised when his patients have fevers, or a helmsman when the wind blows against him.",
            author: "Marcus Aurelius"
        },
        {
            quote: "Blame no one.<br>Set people straight, if you can.<br>If not, just repair the damage.<br>And suppose you can\'t do that either.<br>Then where does blaming people get you? No pointless actions.",
            author: "Marcus Aurelius"
        },
        {
            quote: "The cucumber is bitter? Then throw it out.<br>There are brambles in the path? Then go around them.",
            author: "Marcus Aurelius"
        },
        {
            quote: "You want praise from people who kick themselves every fifteen minutes, the approval of people who despise themselves.<br>(Is it a sign of self-respect to regret nearly everything you do?)",
            author: "Marcus Aurelius"
        },
        {
            quote: "People exist for one another.<br>You can instruct or endure them.",
            author: "Marcus Aurelius"
        },
    ];

    // LIST OF BACKGROUNDS
    var backgroundList = [
      {
            file: "assets/italy.jpg"
        },
        {
            file: "assets/rome.jpg"
        },
        {
            file: "assets/rome2.jpg"
        },
        {
            file: "assets/rome4.jpg"
        },
        {
            file: "assets/rome5.jpg"
        },
        {
            file: "assets/italy2.jpg"
        },
        {
            file: "assets/italy2.jpg"
        },
        {
            file: "assets/italy3.jpg"
        },
        {
            file: "assets/italy3.jpg"
        },
        {
            file: "assets/italy4.jpg"
        },
        {
            file: "assets/italy4.jpg"
        },
        {
            file: "assets/italy5.jpg"
        }
    ];

    // var number = 50;
    // var msg = document.getElementById("message");
    // var author = document.getElementById("author");
    // var spacer = document.getElementById("spacer");

    // $("#foo").click(function(){
    //   if (number >= quoteList.length) return;
    //   var quote = quoteList[number++];
    //   console.log(quoteList.length - number);

    //   msg.innerHTML = quote.quote;
    //   author.innerHTML = quote.author; 
    // });

    // GENERATE RANDOM NUMBER
    var quoteListLength = quoteList.length;
    var randomQuoteNumber = randomIntFromInterval(0, quoteListLength - 1);
    var backgroundListLength = backgroundList.length;
    var randomBackgroundNumber = randomIntFromInterval(0, backgroundListLength - 1);

    // RANDOMLY POPULATE QUOTE, AUTHOR, & BACKGROUND
    var image = backgroundList[randomBackgroundNumber];
    var background = document.getElementById("background");
    var imageUrl = "url(" + image.file + ")";
    background.style.backgroundImage = imageUrl;
    setTimeout(function () {
        var quote = quoteList[randomQuoteNumber]
        var msg = document.getElementById("message");
        var author = document.getElementById("author");
        var spacer = document.getElementById("spacer");
        msg.innerHTML = quote.quote;
        author.innerHTML = quote.author;
        spacer.style.width = "40px";
        spacer.style.opacity = "1";
    }, 250);

    // TODO: Fix Tweet-Quote method

    // TWEET QUOTE METHOD
    setTimeout(function () {
        var msg = document.getElementById("message");
        var author = document.getElementById("author");
        var currentMsg = msg.innerHTML;
        var currentAuthor = author.innerHTML;
        var sanitizedQuote = currentMsg.split('<br>').join('');
        var url = "https://twitter.com/intent/tweet?text=" + "%22" + encodeURIComponent(sanitizedQuote) + "%22%20" + encodeURIComponent(currentAuthor) + "%20%23stoikk"
        // TODO: Check length of tweet before redirect
        var tweetLink = document.getElementById("tweetLink");
        tweetLink.href = url;
    }, 400);

    // TWEET HOVER EFFECT
    $("#tweetLink").hover(function () {
        $("#message").addClass("text-border");
        // $("#author").addClass("invisible");
        $(".quote-container").addClass("white-background");
        $("#author").addClass("darkgrey");
        $("#spacer").addClass("shrink");
    }, function () {
        $("#message").removeClass("text-border");
        // $("#author").removeClass("invisible");
        $(".quote-container").removeClass("white-background");
        $("#author").removeClass("darkgrey");
        $("#spacer").removeClass("shrink");
    });
});