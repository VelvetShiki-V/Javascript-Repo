const path = require("path");

// console.log(path.join(__dirname, "src", "test.txt"));
// console.log(path.join(__dirname, "/src", "/test.txt"));
// console.log(path.join(__dirname, "./src", "./test.txt"));

const filename = path.basename(path.join(__dirname, "src", "test.txt"));
console.log(filename);

const filename2 = path.basename(path.join(__dirname, "src", "test.txt"), ".txt");
console.log(filename2);