import { ReversePolishNotationActionDict } from "./rpn.ohm-bundle";


export type StackDepth = { max: number, out: number }; // max - максимальная глубина и out текущая.

export const rpnStackDepth: ReversePolishNotationActionDict<StackDepth> & Record<string, any> = {
  Expr(expr: any) {
    return expr.stackDepth;
  },

Add_plus(left: any, right: any, _plus: any) {
  const leftPart = left.stackDepth;
  const rightPart = right.stackDepth;
  const out = leftPart.out + rightPart.out - 1;
  const maxDuringLeft = leftPart.max;
  const maxDuringRight = leftPart.out + rightPart.max;

  return {
    max: Math.max(maxDuringLeft, maxDuringRight),
    out,
  };
},

Mul_times(left: any, right: any, _times: any) {
  const leftPart = left.stackDepth;
  const rightPart = right.stackDepth;

  const out = leftPart.out + rightPart.out - 1;
  const maxDuringLeft = leftPart.max;
  const maxDuringRight = leftPart.out + rightPart.max;

  return {
    max: Math.max(maxDuringLeft, maxDuringRight),
    out,
  };
},


  number(chars: any) {
    return { max: 1, out: 1 };
  }
};