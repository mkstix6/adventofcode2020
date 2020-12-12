import fs from "fs";
import validPassword from "./validPassword.mjs";
// Use fs.readFile() method to read the file
const data = fs.readFileSync("input.txt", "utf8");
// split the contents by new line
let lines = data.split(/\r?\n/);
// Remove blank line at the end of file.
lines = lines.filter((line) => line !== "");
// Parse each line into an object.
const passwordItems = lines.map((plainText) => {
  const lineArray = plainText.split(" ");
  const [min, max] = lineArray[0].split("-");
  return {
    min: parseInt(min),
    max: parseInt(max),
    letter: lineArray[1].replace(":", ""),
    password: lineArray[2],
  };
});
// Data ready.
const numberOfValidPasswords = passwordItems.filter(validPassword).length;
// Log answer
console.log({ numberOfValidPasswords });
