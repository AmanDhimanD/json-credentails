const fs = require("fs");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Read existing JSON data (if any)
let jsonData = [];
try {
  const data = fs.readFileSync("data.json", "utf8");
  jsonData = JSON.parse(data);
} catch (err) {
  // If the file doesn't exist or is empty, an empty array will be used
}

// Ask for Date of Birth (DOB)
rl.question("Enter your Date of Birth (DOB): ", (dob) => {
  // Ask for Date of Joining (DOJ)
  rl.question("Enter your Date of Joining (DOJ): ", (doj) => {
    // Ask for Name
    rl.question("Enter your Name: ", (name) => {
      // Ask for Location
      rl.question("Enter your Location: ", (location) => {
        // Create a new JSON entry
        
        const date = Date.now();
        const entry = {
          date,
          dob,
          doj,
          name,
          location,
        };

        // Add the entry to the existing data
        jsonData.push(entry);

        // Convert the data back to JSON format
        const updatedData = JSON.stringify(jsonData);

        // Write the updated data to the file
        fs.writeFileSync("data.json", updatedData, "utf8");

        console.log("Data saved to data.json!");

        rl.close();
      });
    });
  });
});
