const fs = require("fs");
const readline = require("readline");

 function signupFun() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  // Read existing JSON data (if any)
  let jsonData = [];
  try {
    const data = fs.readFileSync("credentials.json", "utf8");
    jsonData = JSON.parse(data);
  } catch (err) {
    // If the file doesn't exist or is empty, an empty array will be used
  }

  // Ask for login credentials
  rl.question("Enter your username: ", (username) => {
    rl.question("Enter your password: ", (password) => {
      // Create a JSON object for login credentials
      const date = Date.now();
      const credentials = {
        date,
        username: username.toLowerCase(),
        password,
      };

      // Add the new credentials to the existing JSON data
      jsonData.push(credentials);

      // Convert the modified JSON data back to a string
      const newData = JSON.stringify(jsonData);

      // Write the modified data back to the JSON file
      fs.writeFileSync("credentials.json", newData, "utf8");

      rl.close();
    });
  });
}

module.exports = { signupFun };
