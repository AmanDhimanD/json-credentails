const fs = require("fs");
const readline = require("readline");

function login() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  // Ask for login credentials
  rl.question("Enter your username: ", (username) => {
    rl.question("Enter your password: ", (password) => {
      // Read the credentials.json file
      fs.readFile("credentials.json", "utf8", (err, data) => {
        if (err) {
          console.error("Error reading credentials file:", err);
          rl.close();
          return;
        }

        // Parse the JSON data
        const credentials = JSON.parse(data);

        // Check if the entered credentials match
        const found = credentials.find(
          (cred) =>
            cred.username === username.toLowerCase() &&
            cred.password === password
        );

        if (found) {
          console.log("Login successful!");
        } else {
          console.log("Invalid username or password.");
        }

        rl.close();
      });
    });
  });
}

module.exports = { login };
