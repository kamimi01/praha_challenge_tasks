const argsLengthCheck = (args: number[]) => {
  const argsLength = args.length;
  if (argsLength >= 31) {
    throw new Error("引数が31個以上指定されています");
  }
};

export function add(...args: number[]) {
  argsLengthCheck(args);
  const result = args.reduce((previous, current) => {
    return previous + current;
  });
  if (result > 1000) {
    return "too big";
  }
  return result;
}

export function subtract(...args: number[]) {
  argsLengthCheck(args);
  const result = args.reduce((previous, current) => {
    return previous - current;
  });
  if (result < 0) {
    return "negative number";
  }
  return result;
}

export function multiply(...args: number[]) {
  argsLengthCheck(args);
  const result = args.reduce((previous, current) => {
    return previous * current;
  });
  if (result > 1000) {
    return "big big number";
  }
  return result;
}

export function divide(...args: number[]) {
  argsLengthCheck(args);
  const result = args.reduce((previous, current) => {
    return previous / current;
  });
  if (Number.isInteger(result)) {
    return result;
  }
  return Math.floor(result);
}
