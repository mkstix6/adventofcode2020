import fs from "file-system";
import { BagRulesProcessor } from "./07functions.mjs";

const fileNamePuzzleData = "day7-puzzle-input-data.txt";
const data = fs.readFileSync(fileNamePuzzleData, "utf8");

const bagProcessor = new BagRulesProcessor(data);

// Answer = the number of bag colors that can eventually contain at least one shiny gold bag
console.log("Puzzle 07a answer: ", bagProcessor.puzzleAnswer);
