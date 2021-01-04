import { seatCodeToProperties } from "./day5-functions";
// Read in puzzle input data.
import * as fs from "file-system";
const data = fs.readFileSync("./day5-puzzle-input.txt", "utf8");
const lines = data.split(/\r?\n/);

const seatProperties = lines.map(seatCodeToProperties)
const seatIDs = seatProperties.map(({id}) => id)
// Find max
const largest = Math.max(...seatIDs)
const answer = largest

console.log('Answer for 05a: ', answer)
// Your puzzle answer was 928.
