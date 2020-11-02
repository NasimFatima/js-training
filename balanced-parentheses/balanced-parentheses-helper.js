/* eslint-disable require-jsdoc */
/* eslint-disable camelcase */

export function is_balanced(expression) {
  try {
    console.log("EXPRESSION TO CHECK: ", expression);
    if (!expression || expression.length == 0 ) return false;

    const stack = [];
    const Paranthesis_map = {
      "(": ")",
      "{": "}",
      "[": "]",
    };
    const close_parantheses = [")", "}", "]"];

    for (let i = 0; i < expression.length; i++) {
      if (expression[i] in Paranthesis_map) {
        stack.push(expression[i]);
      } else if (
        close_parantheses.includes(expression[i]) &&
        expression[i] != Paranthesis_map[stack.pop()]
      ) {
        return false;
      }
    }

    if (stack.length > 0) {
      return false;
    }

    return true;
  } catch (err) {
    console.error("EXCEPTION IN is_balanced FUNCTION ", err);
    return false;
  }
}
