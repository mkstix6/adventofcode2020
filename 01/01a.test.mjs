import test from "ava";
import { sumTarget, sumIsCorrect } from "./01a.mjs";

test("sumIsCorrect good input", (t) => {
  t.true(sumIsCorrect(1010, 1010));
});

test("sumIsCorrect bad input", (t) => {
  t.false(sumIsCorrect(1, 1));
});
