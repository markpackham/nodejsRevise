const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

app.get('/api', (req, res) => {
        res.json(
            {
                message: "Welcome to my API"
            });
    }
);

//using post we need to visit here in postman http://localhost:5000/api/posts
app.post('/api/posts', verifyToken, (req, res) => {
        jwt.verify(req.token, 'secretkey', (err, authData) => {
                if (err) {
                    res.sendStatus(403);
                }
                else {
                    res.json({
                        message: 'Post created',
                        authData
                    });
                }
            }
        );

    }
);
/* An example of a successful post once we've got a login token
{
    "message": "Post created",
    "authData": {
        "user": {
            "id": 1,
            "username": "mark",
            "email": "mark@hotmail.com"
        },
        "iat": 1514414438,
        "exp": 1514415338
    }
}
 */

app.post('/api/login', (req, res) => {
        //Mock user (skip authentication & databases for demo purposes)
        const user = {
            id: 1,
            username: 'mark',
            email: 'mark@hotmail.com'
        }

        //we are using a callback function and doing this asynchronously
        jwt.sign({user}, 'secretkey', {expiresIn: '900s'}, (err, token) => {
                res.json({
                    token
                });
            }
        );
    }
);
//entering this should give us a token in Post http://localhost:5000/api/login


//Format of Token
//Authorization: Bearer <access_token>

/* Looks like this
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJ1c2VybmFtZSI6Im1hcmsiLCJlbWFpbCI6Im1hcmtAaG90bWFpbC5jb20ifSwiaWF0IjoxNTE0NDE0NjUwLCJleHAiOjE1MTQ0MTU1NTB9.1WhlOHzQ1Dwc8DmMgEPEl5prccoOcANY6kWtG3ykrUc"
}
 */


//Verify Token
function verifyToken(req, res, next) {
//get auth header value
    const bearerHeader = req.headers['authorization'];
    //Check if bearer is undefined
    if (typeof bearerHeader !== 'undefined') {
//Split the space (turn string into array)
        const bearer = bearerHeader.split(' ');
        //Get token from array
        const bearerToken = bearer[1];
        //Set the token
        req.token = bearerToken;
        //Next middleware
        next();
    } else {
        //Forbidden send http 403 error
        res.sendStatus(403);
    }
}


//run nodemon to start local server
//enter this in postman in Chrome http://localhost:5000/api using GET
app.listen(5000, () => console.log('Server started on port 5000'));