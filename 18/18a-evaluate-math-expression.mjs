/**
 * Test if the input looks like a simple integer e.g. "6".
 * with optional surrounding brackets e.g. "(6)".
 * @param inputExpression
 */
const checkIfIntegerString = (inputExpression) => {
  const regexMatchSimpleNumber = /\(?[0-9]+\)?/;
  return (
    inputExpression.match(regexMatchSimpleNumber)[0].length ===
    inputExpression.length
  );
};

/**
 * Resolve mathematical expressions but with custom order
 * of operator precedence whereby Rather than evaluating
 * multiplication before addition, the operators have the
 * same precedence, and are evaluated left-to-right regardless
 * of the order in which they appear.
 * @param inputExpression string a string representation of a mathematical expression e.g. "1 + 2 + 3".
 */
const evalSimpleExpressionOrderPrecedence = (inputExpression) => {
  // If input is just a number we are done, no recursion, return the number.
  if (checkIfIntegerString(inputExpression)) {
    // Remove any hanging brackets.
    let result = inputExpression.replace("(", "").replace(")", "");
    // We are done, return.
    return result;
  }
  // Resolve simple expressions.
  const regexFirstSubExpression = /[0-9]+\s[\+\*]\s[0-9]+/;
  const firstSubExpression = inputExpression.match(regexFirstSubExpression)[0];
  const firstEvaluated = eval(firstSubExpression);
  const newFullString = inputExpression.replace(
    firstSubExpression,
    firstEvaluated.toString()
  );
  // Evaluate the newly combined string again.
  return evalSimpleExpressionOrderPrecedence(newFullString);
};

const evalMathString = (inputMathExpression) => {
  // ***
  // Find inner expression.
  const regexInnermostBrackets = /\([^\(\)]*\)/;
  const nextInnerBrackets = inputMathExpression.match(regexInnermostBrackets);

  if (nextInnerBrackets === null) {
    // Evaluate inner expression.
    return parseInt(evalSimpleExpressionOrderPrecedence(inputMathExpression));
  } else {
    // Evaluate next inner.
    const evaluatedPart = evalSimpleExpressionOrderPrecedence(
      nextInnerBrackets[0]
    );
    // Replace original part with newly evaluated.
    const inputForNextRecursion = inputMathExpression.replace(
      nextInnerBrackets[0],
      evaluatedPart
    );
    return evalMathString(inputForNextRecursion);
  }
};

export { evalMathString, evalSimpleExpressionOrderPrecedence };
