const fs = require("fs");
const file = fs.createWriteStream("data.txt");

for (let i = 0; i < 1000000; i++) {
  file.write(`Lorem ipsum is a dummy text used for testing purposes only and is not meant to be read by humans or machines. ${i}`);
}

file.end();