import fs from "fs";
const data = fs.readFileSync("mapPattern.txt", "utf8");
const lines = data.split(/\r?\n/);

// Trees
const treeHits = lines.map((line) => {
  let position = 0;
  const hits = [];
  [...line].forEach((character) => {
    position++;
    if (character === "#") {
      hits.push(position);
    }
  });
  return hits;
});
console.log(treeHits[0]);
