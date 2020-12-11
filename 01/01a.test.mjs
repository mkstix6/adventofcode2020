import test from "ava";
import { sum, sumTarget, sumIsCorrect } from "./01a.mjs";

test(`sum() good input`, (t) => {
  t.is(sum(1, 2, 3), 6);
});

test(`sum() bad input`, (t) => {
  t.not(sum(1, 1, 1), 9);
});

test("sumIsCorrect() good input", (t) => {
  t.true(sumIsCorrect(sumTarget - 1, 1));
});

test("sumIsCorrect() bad input", (t) => {
  t.false(sumIsCorrect(sumTarget, sumTarget));
});
