export const argsLengthCheck = (args: number[]) => {
  const argsLength = args.length;
  if (argsLength >= 31) {
    throw new Error("引数が31個以上指定されています");
  }
};