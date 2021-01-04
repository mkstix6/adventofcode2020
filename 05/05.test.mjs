import test from "ava";
import { seatCodeToProperties } from "./day5-functions.js";

/**
 * Here are some other boarding passes:
 * BFFFBBFRRR: row 70, column 7, seat ID 567.
 * FFFBBBFRRR: row 14, column 7, seat ID 119.
 * BBFFBBFRLL: row 102, column 4, seat ID 820.
 */
const idFunctionExamples = [
  {
    input: "BFFFBBFRRR",
    expected: {
      row: 70,
      column: 7,
      id: 567,
    },
  },
  {
    input: "FFFBBBFRRR",
    expected: {
      row: 14,
      column: 7,
      id: 119,
    },
  },
  {
    input: "BBFFBBFRLL",
    expected: {
      row: 102,
      column: 4,
      id: 820,
    },
  },
];

const macroTestSeatCodeToProperties = (t, { input, expected }) => {
  t.deepEqual(seatCodeToProperties(input), expected);
};

idFunctionExamples.forEach(({ input, expected }, index) => {
  test(
    `macroTestSeatCodeToProperties ${index}`,
    macroTestSeatCodeToProperties,
    { input, expected }
  );
});
