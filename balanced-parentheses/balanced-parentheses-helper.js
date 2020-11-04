/**
 * Check if expression has balanced paranthesis.
 * @param {string} expression The first number.
 * @return {boolean} The sum of the two numbers.
 */
export const isBalanced = expression => {
  console.log("EXPRESSION TO CHECK: ", expression);
  if (!expression || expression.length === 0) return false;

  const stack = [];
  const paranthesisMap = {
    "(": ")",
    "{": "}",
    "[": "]",
  };
  const closeParantheses = [")", "}", "]"];

  [...expression].every((item) => {
    if (item in paranthesisMap) stack.push(item);
    else if (
      closeParantheses.includes(item) &&
      item != paranthesisMap[stack.pop()]
    )
      return false;
  });

  return !Boolean(stack.length);
};
