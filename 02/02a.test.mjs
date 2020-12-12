import test from "ava";
import validPassword from "./validPassword.mjs";

test(`validPassword() good input`, (t) => {
  const goodInput = { min: 1, max: 2, letter: "a", password: "aabbbbbbb" };
  t.true(validPassword(goodInput));
});

test(`validPassword() bad input`, (t) => {
  const badInput = { min: 1, max: 2, letter: "a", password: "bcd" };
  t.false(validPassword(badInput));
});
