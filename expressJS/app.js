const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const app = express();
const jwt = require("jsonwebtoken");

const accessTokenSecret = "youraccesstokensecret";

const books = require("./json/books.json"); // console.log(books);

const users = require("./json/users.json");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json FIXED
app.use(bodyParser.json());

// Middleware => Status Codes -> 200 Ok  401 Unauthorized or 403 Forbidden
const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, accessTokenSecret, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }

      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

app.post("/login", (req, res) => {
  const { username, password } = req.body; // Read username and password from request body

  // console.log(req.body.username); Test for reading req or not
  // console.log(req.body.password);

  // Filter user from the users array by username and password
  const user = users.find((u) => {
    return u.username === username && u.password === password;
  });

  if (user) {
    // Generate an access token
    const accessToken = jwt.sign(
      { username: user.username, role: user.role },
      accessTokenSecret
    );

    res.json({
      accessToken,
    });
  } else {
    res.send(
      "Username or password incorrect " +
        users.find((u) => {
          return u.username === username && u.password === password;
        })
    );
  }
});

app.get("/books", authenticateJWT, (req, res) => {
  res.json(books);
});

app.listen(3000, () => console.log("server started on 3000"));
