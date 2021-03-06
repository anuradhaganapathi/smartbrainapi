/**
 * Created by aga on 31.01.2019.
 */

const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors()); //Middleware used to connect fronend and backend

const database = {
    users: [
        {
            id: '123',
            name: 'John',
            email: 'john@gmail.com',
            password: 'cookies',
            entries: 0,
            joined: new Date()
        },
        {
            id: '124',
            name: 'Sally',
            email: 'sally@gmail.com',
            password: 'cooked',
            entries: 0,
            joined: new Date()
        }
    ],
    login: [
        {
            id: '987',
            hash: '',
            email: 'john@gmail.com'
        }
    ]
};

app.get('/', (req,res) => {
    res.send(database.users);
});

app.post('/signin', (req,res) => {
    console.log("res", req.body);
    if(req.body.email === database.users[0].email && req.body.password === database.users[0].password) {
        res.json('Success');
    } else {
        res.json('Fail');
    }

});

app.post('/register', (req,res) => {
    const {email, name , password} = req.body;
    database.users.push({
        id: '125',
        name: name,
        email: email,
        password: password,
        entries: 0,
        joined: new Date()
    });
    res.json(database.users[database.users.length-1]);
});

app.post('/image', (req,res) => {
   const {id} = req.body;
   let found = false;
    database.users.forEach(user => {
        if(user.id === id) {
            found = true;
            user.entries++;
            return res.json(user.entries);
        }
    if(!found) {
        res.status(400).json('not found');
    }
    });
});

app.get('/profile/:id', (req,res) => {
    const {id} = req.params;
    let found = false;
    database.users.forEach(function(user){
        if(user.id === id) {
            found = true;
            return res.json(user);
        } else {
            res.status(400).json('no such user');
        }
    })
    if(!found) {
        res.json(400).json('Not found');
    }
});

app.listen(3000, () => {
    console.log('app is running on port 3000');
});