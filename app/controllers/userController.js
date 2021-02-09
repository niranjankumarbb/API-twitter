const User = require('../models/user');
const Twitter = require('Twitter');

module.exports.showTweets = (req, res) => {
    const username = req.query.username;
    console.log(username);
    User.find({username})
        .then(user => {
            console.log("old user", user);
            if(user.length){
                res.json(user[0].tweets)
            }
            else{
                const client = new Twitter({
                    consumer_key: '',
                    consumer_secret: '',
                    access_token_key: '',
                    access_token_secret: ''
                })
                client.get(`https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=${username}`, function(err, data){
                    console.log(err, data, "CALL");
                    if(!data){
                        res.json("no data");
                    }
                    const user = new User({
                        username
                    });
                    data.forEach(tweetDetails => {
                        user.tweets.push(tweetDetails.text);
                    });
                    user.save()
                        .then(user => {
                            console.log("NEW USER SAVED", user);
                            res.json(user);
                        })
                })                   
            }
        })
}

module.exports.createUser = (req, res) => {

}
