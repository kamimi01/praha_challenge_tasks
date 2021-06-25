import { argsLengthCheck } from "../src/util";

export const add = (...args: number[]) => {
  argsLengthCheck(args);
  const result = args.reduce((previous, current) => {
    return previous + current;
  });
  if (result > 1000) {
    return "too big";
  }
  return result;
};

export const subtract = (...args: number[]) => {
  argsLengthCheck(args);
  const result = args.reduce((previous, current) => {
    return previous - current;
  });
  if (result < 0) {
    return "negative number";
  }
  return result;
};

export const multiply = (...args: number[]) => {
  argsLengthCheck(args);
  const result = args.reduce((previous, current) => {
    return previous * current;
  });
  if (result > 1000) {
    return "big big number";
  }
  return result;
};

export const divide = (...args: number[]) => {
  argsLengthCheck(args);
  const result = args.reduce((previous, current) => {
    return previous / current;
  });
  if (Number.isInteger(result)) {
    return result;
  }
  return Math.floor(result);
};
