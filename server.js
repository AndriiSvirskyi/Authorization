const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
var db;
const app = express();
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

const userSchema = { username: String, password: String, mail: String };
const User = mongoose.model('User', userSchema);

MongoClient.connect('mongodb://localhost:27017/Users', function (err, database) {
  if (err) {
    return console.log(err);
  }
    db = database;
    console.log('database connect')
})

app.use(express.static('dist'));
app.use(bodyParser.json());

const database = {
    bull: false,
    getUsers: (username) => {
        User.find({}, (err, docs) => {
            docs.forEach((item)=>{
                if(item.username === username){
                    database.bull = true;
                }
            })
          });
          console.log(database.bull)
    },
    addUser: ({ ...user }) => {
    const users = new User({ username: user.username, password: user.password, mail: user.mail });
    users.save().then(() => console.log(`User ${user.username} is registration`));
    }
}

app.post('/singup', function (req, res) {
    if (!req.body) {
        res.status(500);
        res.send({ error: 'Body not found' });
        return null;
    }

    const {
        username,
        mail,
        password
    } = req.body;

    if(!database.getUsers(username)){
        database.addUser({ username, mail, password });
    }

    if (!username) {
        res.status(500);
        res.send({ error: 'Please enter username' });
        return null;
    }
});

app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/dist/index.html'));
});


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
