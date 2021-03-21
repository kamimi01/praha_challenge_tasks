export function add(...args: number[]) {
  return args.reduce((previous, current) => {
    return previous + current;
  });
}

export function subtract(...args: number[]) {
  return args.reduce((previous, current) => {
    return previous - current;
  })
}

export function multiply(...args: number[]) {
  return args.reduce((previous, current) => {
    return previous * current;
  })
}

export function divide(...args: number[]) {
  return args.reduce((previous, current) => {
    return previous / current;
  })
}
