import { isBalancedExpression } from "../balanced-parentheses/index.js"



const testinput = ["{}()[]", "({{[]}})", "()", "{[)]", "([)]", "a]aa","[5(6)(5)(a)]", null]

testinput.forEach(element => {
    console.log( isBalancedExpression (element))
}); 
