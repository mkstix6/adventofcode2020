import test from "ava";
import {
  evalMathString,
  evalSimpleExpressionOrderPrecedence,
} from "./18a-evaluate-math-expression.mjs";

const providedExamples = [
  { input: `1 + 2 * 3 + 4 * 5 + 6`, expected: 71 },
  { input: `1 + (2 * 3) + (4 * (5 + 6))`, expected: 51 },
  { input: `2 * 3 + (4 * 5)`, expected: 26 },
  { input: `5 + (8 * 3 + 9 + 3 * 4 * 3)`, expected: 437 },
  { input: `5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))`, expected: 12240 },
  { input: `((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2`, expected: 13632 },
];

function macroEvalMathString(t, { input, expected }) {
  t.is(evalMathString(input), expected);
}

// TODO reactivate these tests
providedExamples.forEach(({ input, expected }, index) => {
  test(`Evaluate expression ${index}`, macroEvalMathString, {
    input,
    expected,
  });
});

/////////////////////////
const simpleExpressionInputs = [
  { input: "3", expected: "3" },
  { input: "1 + 2", expected: "3" },
  { input: "2 * 3", expected: "6" },
  { input: "2 * 3 + 4", expected: "10" },
  { input: "2 + 3 * 4", expected: "20" }, // Weird order of operations intentional.
  { input: "5 * 4 + 6 * 2 + 8 * 2", expected: "120" }, // Weird order of operations intentional.
];

function macroSimpleExpression(t, { input, expected }) {
  t.is(evalSimpleExpressionOrderPrecedence(input), expected);
}

simpleExpressionInputs.forEach(({ input, expected }, index) => {
  test(`Simple expression ${index}`, macroSimpleExpression, {
    input,
    expected,
  });
});
