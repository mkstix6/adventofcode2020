import { seatCodeToProperties } from "./day5-functions";
// Read in puzzle input data.
import * as fs from "file-system";
const data = fs.readFileSync("./day5-puzzle-input.txt", "utf8");
const lines = data.split(/\r?\n/);

const seatProperties = lines.map(seatCodeToProperties)
const seatIDs = seatProperties.map(({id}) => id)
// Find max
const largestSeatID = Math.max(...seatIDs)
const answerPartA = largestSeatID

console.log('Answer for 05a: ', answerPartA);
// Your puzzle answer was 928.

// Find missing numbers.
const sortedSeatIDs = new Set([...seatIDs].sort((a,b) => a-b))
const possibleSeats = []
for(let $i = 0; $i < 1030; $i++){
  if(sortedSeatIDs.has($i-1) && !sortedSeatIDs.has($i) && sortedSeatIDs.has($i+1)) {
    possibleSeats.push($i)
  }
}

if (possibleSeats.length === 1) {
  console.log('Answer for 05b: ', possibleSeats[0]);
  // Your puzzle answer was 610.
} else {
  console.error(`Multiple possible answers identified; there should only be one answer but we found ${possibleSeats.length}.`)
}
