const readline = require("readline");
const fs = require("fs");
const path = require("path");

const dataFolderPath = "jsondata";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Function to handle login page
function loginPage() {
  console.log("Welcome to the Login page!");

  rl.question("Enter your username: ", (username) => {
    rl.question("Enter your password: ", (password) => {
      const credentialsPath = path.join(dataFolderPath, "credentials.json");

      // Read the credentials.json file
      fs.readFile(credentialsPath, "utf8", (err, data) => {
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
            cred.username === username.toLowerCase() && cred.password === password
        );

        if (found) {
          console.log("Login successful!");

          // Show all users
          console.log("All Users:");
          credentials.forEach((cred) => {
            console.log("Username:", cred.username);
            console.log("Password:", cred.password);
            console.log("---------------------");
          });
        } else {
          console.log("Invalid username or password.");
        }

        rl.close();
      });
    });
  });
}

// Function to handle signup page
function signupPage() {
  console.log("Welcome to the Signup page!");

  rl.question("Enter your username: ", (username) => {
    rl.question("Enter your password: ", (password) => {
      const credentialsPath = path.join(dataFolderPath, "credentials.json");

      // Read the existing credentials data (if any)
      let credentials = [];
      try {
        const data = fs.readFileSync(credentialsPath, "utf8");
        credentials = JSON.parse(data);
      } catch (err) {
        // If the file doesn't exist or is empty, an empty array will be used
      }

      // Create a new credentials object
      const newCredentials = {
        username: username.toLowerCase(),
        password: password,
      };

      // Add the new credentials to the existing data
      credentials.push(newCredentials);

      // Convert the modified data back to a string
      const newData = JSON.stringify(credentials);

      // Write the modified data back to the JSON file
      fs.writeFileSync(credentialsPath, newData, "utf8");

      console.log("Signup successful!");

      rl.close();
    });
  });
}

// Function to handle main menu
function mainMenu() {
  console.log("Main Menu");
  console.log("1. Login");
  console.log("2. Signup");
  console.log("3. Exit");

  rl.question("Enter your choice: ", (choice) => {
    switch (choice) {
      case "1":
        loginPage();
        break;
      case "2":
        signupPage();
        break;
      case "3":
        rl.close();
        break;
      default:
        console.log("Invalid choice. Please try again.");
        mainMenu();
        break;
    }
  });
}

// Create the data folder if it doesn't exist
if (!fs.existsSync(dataFolderPath)) {
  fs.mkdirSync(dataFolderPath);
}

// Start the program
mainMenu();
