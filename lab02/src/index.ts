import { MatchResult } from "ohm-js";
import grammar from "./rpn.ohm-bundle";
import { rpnCalc } from "./calculate";
import { rpnStackDepth, StackDepth } from "./stackDepth";

export class SyntaxError extends Error {}

const rpnSemantics = grammar.createSemantics();
rpnSemantics.addOperation<number>("calculate", rpnCalc);
rpnSemantics.addAttribute<StackDepth>("stackDepth", rpnStackDepth);

function parse(content: string): MatchResult {
  const match = grammar.match(content);
  if (match.failed()) {
    throw new SyntaxError(match.message);
  }
  return match;
}

export function evaluate(content: string): number {
  return rpnSemantics(parse(content)).calculate();
}

export function maxStackDepth(content: string): number {
  return rpnSemantics(parse(content)).stackDepth.max;
}