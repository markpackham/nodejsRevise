const bcrypt = require("bcryptjs");

async function hashPassword(plaintext) {
  const user = {
    name: "Mark",
    email: "moo@gmail.com",
    password: plaintext
  };

  const salt = await bcrypt.getSalt(10);

  user.password = await bcrypt.hash(plaintext, salt);

  console.log(user);
}

async function comparePasswords(plaintext, hash) {
  const isMatch = await bcrypt.compare(plaintext, hash);
  if (isMatch) {
    console.log("Match");
  } else {
    console.log("Not Match");
  }
}

//hashPassword("1234567");
comparePasswords("123", "HASHY_MC_HASH");
