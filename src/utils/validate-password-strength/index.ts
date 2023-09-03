export const checkHasMinimumLength = (input: string, minLength: number = 8) => {
  return input.length >= minLength;
};

export const checkHasUppercaseLetter = (input: string): boolean => {
  const uppercaseRegex = /[A-Z]/;
  return uppercaseRegex.test(input);
};

export const checkHasSpecialCharacter = (input: string): boolean => {
  const specialCharRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/;
  return specialCharRegex.test(input);
};

export const checkHasRepeatedChars = (input: string): boolean => {
  const repeatedCharsRegex = /(.)\1{2,}/;

  if (repeatedCharsRegex.test(input)) {
    return true;
  }

  return false;
};

export const checkIsPasswordTooLarge = (input: string, maxLength = 30) => {
  return input.length >= maxLength;
};

export const checkHasNumber = (input: string) => {
  const hasNumberRegex = /.*\d.*/;
  return hasNumberRegex.test(input);
};
