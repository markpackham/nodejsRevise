const express = require("express");
const app = express();
const bcrypt = require("bcrypt");

app.use(express.json());

// under normal circumstances users would be stored in a database rather than in code
const users = [];

app.post("/users", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = { name: req.body.name, password: hashedPassword };
    users.push(user);
    //console.log(users);
    res.status(201).send();
  } catch (error) {
    res.status(500).send();
  }
});

app.post("/users/login", async (req, res) => {
  const user = users.find(user => user.name === req.body.name);
  if (user == null) {
    return res.status(400).send("Username not found");
  }
  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      res.send("Success");
    } else {
      res.send("Password incorrect");
    }
  } catch (error) {
    res.status(500).send();
  }
});

app.listen(3000);
