import test from "ava";
import { BagRulesProcessor } from "./07functions.mjs";

const example = {
  firstRuleInput: `light red bags contain 1 bright white bag, 2 muted yellow bags.`,
  input: `light red bags contain 1 bright white bag, 2 muted yellow bags.
dark orange bags contain 3 bright white bags, 4 muted yellow bags.
bright white bags contain 1 shiny gold bag.
muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.
shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.
dark olive bags contain 3 faded blue bags, 4 dotted black bags.
vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.
faded blue bags contain no other bags.
dotted black bags contain no other bags.`,
  bagColors: [
    "bright white",
    "dark olive",
    "dark orange",
    "dotted black",
    "faded blue",
    "light red",
    "muted yellow",
    "shiny gold",
    "vibrant plum",
  ],
  bagRules: [
    { color: "bright white", contents: ["shiny gold"] },
    { color: "dark olive", contents: ["dotted black", "faded blue"] },
    { color: "dark orange", contents: ["bright white", "muted yellow"] },
    { color: "dotted black", contents: [] },
    { color: "faded blue", contents: [] },
    { color: "light red", contents: ["bright white", "muted yellow"] },
    { color: "muted yellow", contents: ["faded blue", "shiny gold"] },
    { color: "shiny gold", contents: ["dark olive", "vibrant plum"] },
    { color: "vibrant plum", contents: ["dotted black", "faded blue"] },
  ],
  countBagColors: 9,
  countBagRules: 9,
  puzzleAnswer: 4,
};

let bagsObject;
test.beforeEach((t) => {
  bagsObject = new BagRulesProcessor(example.input);
});

test(`get bagColors test`, (t) => {
  t.deepEqual(bagsObject.bagColors, example.bagColors);
});

test(`get countBagColors test`, (t) => {
  t.is(bagsObject.countBagColors, example.countBagColors);
});

test(`get bagRules test`, (t) => {
  const sortRules = ({ color: a }, { color: b }) =>
    a > b ? 1 : b > a ? -1 : 0;
  t.deepEqual(
    bagsObject.bagRules.sort(sortRules),
    example.bagRules.sort(sortRules)
  );
});

test(`get countBagRules test`, (t) => {
  t.is(bagsObject.countBagRules, example.countBagRules);
});

test(`get puzzleAnswer test`, (t) => {
  t.is(bagsObject.puzzleAnswer, example.puzzleAnswer);
});

test(`convertRuleStringToRuleStructure test`, (t) => {
  t.deepEqual(
    bagsObject.convertRuleStringToRuleStructure(example.firstRuleInput),
    {
      color: "light red",
      contents: ["bright white", "muted yellow"],
    }
  );
});

// test(`validPassword() bad input`, (t) => {
//   const badInput = { min: 1, max: 2, letter: "a", password: "bcd" };
//   t.false(validPassword(badInput));
// });
