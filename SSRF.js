const express = require('express');
const axios = require('axios');
const mysql = require('mysql');

axios.defaults.baseURL = 'http://localhost:8080';
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'db_user',
    password : process.env.db_pass,
    database : 'blog_db'
});

const app = express();
app.use(express.json());

app.post('/upload-post', (req, res) => {
    let postImage = req.body['image'];
    let caption = req.body['caption'];

    postImage = connection.escape(postImage);
    caption = connection.escape(caption);

    connection.query(`INSERT INTO posts (post_images, captions) VALUES (${postImage}, ${caption})`, (error, results, fields) => {
        res.status(200).send('Post uploaded!');
    });
});

app.post('/is-endpoint-working', (req, res) => {
    let endpoint = req.body['endpoint'];

    axios.post(endpoint)
    .then(response => {
        res.status(200).send(`The endpoint is up! It responded with: ${response.data}`);
    })
    .catch(err => {
        console.log(err);
        res.status(200).send('The endpoint does not seem to be working...');
    });
});

// this endpoint is a work in progess. made for future development. 
app.post('/retrieve-user-data/:id', (req, res) => {
    if (req.socket.remoteAddress.replace(/^.*:/, '') === '127.0.0.1') {
        let userID = req.params['id'];
        userID = connection.escape(userID, false);
        connection.query(`SELECT * FROM users WHERE id = ${userID};`, (error, results, fields) => {
            let results = 'ACCESS GRANTED'
            res.status(200).send(results);
        });
    } else {
        res.status(401).send('This endpoint can only be accessed locally.');
    }
});

app.listen(8080, () => {
    console.log('Server started.');
})