import { MatchResult } from "ohm-js";
import { addMulSemantics } from "./calculate";
import grammar from "./addmul.ohm-bundle";
import { Console } from "console";
import { inspect } from 'util';

export class SyntaxError extends Error {}

function parse(content: string): MatchResult {
  const match = grammar.match(content); // parse data.
  //console.log(match.getInterval.)
  
  if (match.failed()) {
    throw new SyntaxError(match.message);
  }

  return match;
}

function calculate(expression: MatchResult): number {
 
  // The semantics operation returns the result for the root node
  return addMulSemantics(expression).calculate();
}

export function evaluate(content: string): number {
  return calculate(parse(content));
}