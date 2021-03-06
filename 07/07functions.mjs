class BagRulesProcessor {
  input;
  answer;
  terminatorBagColorString = "no other";
  regexMatchBagColor = /(?<colorname>\w+\W\w+)\Wbag/g;
  outerBagPossibilities = [];
  defaultTargetColor = "shiny gold";

  constructor(inputData) {
    this.input = inputData;
  }

  convertRuleStringToRuleStructure(ruleString) {
    // split container from contents
    const [containerColor, ...contentsColors] = this.regexColors(ruleString);
    return {
      color: containerColor,
      contents: contentsColors.sort(),
    };
  }

  regexColors(inputString) {
    return Array.from(
      inputString.matchAll(this.regexMatchBagColor),
      (matchResult) => {
        return matchResult.groups.colorname;
      }
    ).filter((color) => color.trim() !== this.terminatorBagColorString);
  }

  get bagRules() {
    const ruleStrings = this.input.split(/\r?\n/);
    const bagRuleStructures = ruleStrings.map((ruleString) => {
      return this.convertRuleStringToRuleStructure(ruleString);
    });
    return bagRuleStructures;
  }

  get countBagRules() {
    return this.bagRules.length;
  }

  get bagColors() {
    const colors = this.regexColors(this.input);
    let uniqueColors = [...new Set(colors)];
    // Remove null bag.
    uniqueColors = uniqueColors.filter(
      (text) => text !== this.terminatorBagColorString
    );
    // Sort
    uniqueColors = uniqueColors.sort();
    return uniqueColors;
  }

  get countBagColors() {
    return this.bagColors.length;
  }

  huntColorContainers(targetColor) {
    const colorsOfBagsThatContainTargetColor = this.bagRules
      .filter((rule) => rule.contents.includes(targetColor))
      .map((rule) => rule.color);
    // Follow chain if color hasn't already been searched before.
    colorsOfBagsThatContainTargetColor.forEach((containerColor) => {
      // Check if these colors have already been followed.
      if (!this.outerBagPossibilities.includes(containerColor)) {
        // Recursive search this next color.
        this.huntColorContainers(containerColor);
      }
    });
    // Add matched container colors to final list.
    this.outerBagPossibilities = [
      ...new Set([
        ...colorsOfBagsThatContainTargetColor,
        ...this.outerBagPossibilities,
      ]),
    ].sort();
  }

  huntColorContents(targetColor) {
    // FIXME write this function for puzzle 07b
    // TODO Find all the bag colors that can be nested inside targetColor bag
  }

  puzzleAnswer(targetColor = this.defaultTargetColor) {
    this.huntColorContainers(targetColor);
    // Count chains that can contain gold.
    // Filter out gold chain itself (because we're only interested in bags that contain gold bags).
    // Answer = the number of bag colors that can eventually contain at least one shiny gold bag
    return [...new Set(this.outerBagPossibilities)].length;
  }
}

export { BagRulesProcessor };
