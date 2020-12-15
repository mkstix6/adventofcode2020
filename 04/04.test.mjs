import test from "ava";
import { documentIsPassport } from "./functions-for-documents.mjs";
import {
  allDocumentFields,
  invalidPassportExamples,
  validPassportExamples,
} from "./constants.mjs";

function macroDocumentShouldBeValidPassport(t, input) {
  t.true(documentIsPassport(input));
}

function macroDocumentShouldBeInvalidPassport(t, input) {
  t.false(documentIsPassport(input));
}

validPassportExamples.forEach((document, index) => {
  test(
    `GoodPassport validate ${index}`,
    macroDocumentShouldBeValidPassport,
    document
  );
});

invalidPassportExamples.forEach((document, index) => {
  test(
    `BadPassport validate ${index}`,
    macroDocumentShouldBeInvalidPassport,
    document
  );
});

const getValidatorForKeyCode = (keyCode) =>
  allDocumentFields.find(({ code }) => code === keyCode).validator;

// byr valid: 2002
test(`Check byr validator 01 valid`, (t) => {
  t.true(getValidatorForKeyCode("byr")("2002"));
});
// byr invalid: 2003
test(`Check byr validator 02 invalid`, (t) => {
  t.false(getValidatorForKeyCode("byr")("2003"));
});
// hgt valid: 60in
test(`Check hgt validator 01 valid`, (t) => {
  t.true(getValidatorForKeyCode("hgt")("60in"));
});
// hgt valid: 190cm
test(`Check hgt validator 02 valid`, (t) => {
  t.true(getValidatorForKeyCode("hgt")("190cm"));
});
// hgt invalid: 190in
test(`Check hgt validator 03 invalid`, (t) => {
  t.false(getValidatorForKeyCode("hgt")("190in"));
});
// hgt invalid: 190
test(`Check hgt validator 04 invalid`, (t) => {
  t.false(getValidatorForKeyCode("hgt")("190"));
});
// hcl valid: #123abc
test(`Check hcl validator 01 valid`, (t) => {
  t.true(getValidatorForKeyCode("hcl")("#123abc"));
});
// hcl invalid: #123abz
test(`Check hcl validator 02 invalid`, (t) => {
  t.false(getValidatorForKeyCode("hcl")("#123abz"));
});
// hcl invalid: 123abc
test(`Check hcl validator 03 invalid`, (t) => {
  t.false(getValidatorForKeyCode("hcl")("123abc"));
});
// ecl valid: brn
test(`Check ecl validator 01 valid`, (t) => {
  t.true(getValidatorForKeyCode("ecl")("brn"));
});
// ecl invalid: wat
test(`Check ecl validator 02 invalid`, (t) => {
  t.false(getValidatorForKeyCode("ecl")("ecl"));
});
// pid valid: 000000001
test(`Check pid validator 01 valid`, (t) => {
  t.true(getValidatorForKeyCode("pid")("000000001"));
});
// pid invalid: 0123456789
test(`Check pid validator 02 invalid`, (t) => {
  t.false(getValidatorForKeyCode("pid")("0123456789"));
});
