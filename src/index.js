import { isBalancedExpression } from "../balanced-parentheses/index.js"



const testInput = ["{}()[]", "({{[]}})", "()", "{[)]", "([)]", "a]aa","[5(6)(5)(a)]", null]

testInput.forEach(expression => {
    console.log( isBalancedExpression (expression))
}); 
