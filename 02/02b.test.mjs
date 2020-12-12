import test from "ava";
import validPassword from "./validTobogganPassword.mjs";

test(`02b validPassword() good input 01`, (t) => {
  const passwordInput = {
    position1: 1,
    position2: 4, // this can't be 2 because exactly-1 letter much match
    letter: "a",
    password: "aabbbbbbb",
  };
  t.true(validPassword(passwordInput));
});

test(`02b validPassword() good input 02`, (t) => {
  const passwordInput = {
    position1: 1,
    position2: 7,
    letter: "a",
    password: "bbbbbba",
  };
  t.true(validPassword(passwordInput));
});

test(`02b validPassword() bad input`, (t) => {
  const passwordInput = {
    position1: 1,
    position2: 2,
    letter: "a",
    password: "bcd",
  };
  t.false(validPassword(passwordInput));
});
