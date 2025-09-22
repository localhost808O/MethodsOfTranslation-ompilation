import { MatchResult } from "ohm-js";
import grammar, { AddMulActionDict, AddMulSemantics } from "./addmul.ohm-bundle";

// Create Semantics
export const addMulSemantics: AddMulSemantics = grammar.createSemantics();


const addMulCalc: AddMulActionDict<number> = {
  Expr(expr) {
     return expr.calculate(); 
  },

  AddExpr_plus(left, _plus, right) { // _plus - it's token. ingore minus and etc
    return left.calculate() + right.calculate();
  },

  AddExpr(expr) {
     return expr.calculate();
  },

  MulExpr_times(left, _times, right) {
    return left.calculate() * right.calculate();
  },
  MulExpr(expr) { 
    return expr.calculate(); 
  },

  PriExpr_paren(_open, expr, _close) { 
    return expr.calculate();
  },
  PriExpr(expr) {
     return expr.calculate(); 
  }, 

  number(chars) {
    return parseInt(chars.sourceString, 10);
  }
};

addMulSemantics.addOperation<number>("calculate", addMulCalc);