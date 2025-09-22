import { ReversePolishNotationActionDict } from "./rpn.ohm-bundle";

export const rpnCalc: ReversePolishNotationActionDict<number> & Record<string, any> = {
  Expr(expr: any) {
    return expr.calculate();
  },

  Add_plus(left: any, right: any, _plus: any) {
    return left.calculate() + right.calculate();
  },

  Mul_times(left: any, right: any, _times: any) {
    return left.calculate() * right.calculate();
  },

  number(chars: any) {
    return parseInt(chars.sourceString, 10);
  }
};