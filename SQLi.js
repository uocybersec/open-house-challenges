const express = require('express');
const mysql = require('mysql');

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'db_user',
    password : process.env.db_pass,
    database : 'blog_db',
    multipleStatements: true
});

const app = express();

app.use(express.json());

app.get('/get-post/:id', (req, res) => {
    let postId = req.params['id'];
    let query = 'SELECT post_title, post_body, post_author FROM posts WHERE id = ' + postId;
    connection.query(query, (error, results, fields) => {
        res.status(200).send(results);
    });
});

app.listen(8080, () => {
    console.log('Server started.');
});