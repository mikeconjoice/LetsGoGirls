console.log("One Taught Me Patience");

if (process.env.NODE_ENV === "develop") {
  require("dotenv").config();
};

// Create an Twitter object to connect to Twitter API
var Twit = require('twit');

// Pulling keys from another file
var config = require('./config.js');
// Making a Twit object for connection to the API
var T = new Twit(config);

// Setting up a user stream
// "this don't impress me much" - Daniel 2021 
var stream = T.stream('statuses/filter', { track: '@botianagrande' });

// Now looking for tweet events
// See: https://dev.twitter.com/streaming/userstreams
stream.on('tweet', tweetEvent);



// Here a tweet event is triggered!
function tweetEvent(tweet) {

  var id = tweet.id_str;
  var text = tweet.text;
  var name = tweet.user.screen_name;

    let eyesNails = /👀💅/;
    var str = text;
    
    let iWantItIGotIt = str.match(eyesNails) || [];

    var godIsAWoman = iWantItIGotIt.length>0;
  
      console.log(godIsAWoman)
  
  
  // checks text of tweet for mention of Shania Bot
  if ((text.includes('@botianagrande') && godIsAWoman === true)) {

    // Start a reply back to the sender
    var replyText = "@"+ name + " Thank you, next... ";
    
    // Post that tweet
    T.post('statuses/update', { status: replyText, in_reply_to_status_id: id}, tweeted);

    // Make sure it worked!
    function tweeted(err, reply) {
      if (err) {
        console.log(err.message);
      } else {
        console.log('Tweeted: ' + reply.text);
      }
    }    
  } else {
    console.log("One taught me pain");
  }
}




