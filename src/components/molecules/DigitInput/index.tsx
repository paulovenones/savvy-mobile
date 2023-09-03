import React, { useRef, useState } from "react";
import { StyledCodeInput } from "./styles";
import { TextInput } from "react-native";
import { Margin } from "../../atoms/Margin";
import { Typography } from "../../atoms/Typography";
import { Flex } from "../../atoms/Flex";

interface IDigitInputProps {
  onComplete?: (
    value: string,
    index: number
  ) => string | Promise<string | void> | void;
}

const ForwardedStyledCodeInput = React.forwardRef<TextInput, any>(
  ({ ...props }, ref) => <StyledCodeInput ref={ref} {...props} />
);

export const DigitInput = ({ onComplete }: IDigitInputProps) => {
  const INPUT_LENGTH = 4;

  const initialCodeStructure = Array(INPUT_LENGTH).fill("");

  const [code, setCode] = useState(initialCodeStructure);
  const [focusedInputIndex, setFocusedInputIndex] = useState<number | null>(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isInputDisabled, setIsInputDisabled] = useState(false);

  const inputRefs = useRef<Array<TextInput | null>>([]);

  const retreatFocusedInput = (currentIndex: number) => {
    const newCode = [...code];

    if (currentIndex === 0) {
      newCode[currentIndex] = "";
      setCode(newCode);
      return;
    }

    const newFocusedInputIndex = Math.max(currentIndex - 1, 0);
    newCode[currentIndex] = "";
    newCode[newFocusedInputIndex] = "";

    inputRefs.current[newFocusedInputIndex]?.focus();

    setCode(newCode);
    setFocusedInputIndex(newFocusedInputIndex);
  };

  const advanceFocusedInput = (currentIndex: number) => {
    const newFocusedInputIndex = Math.min(currentIndex + 1, INPUT_LENGTH - 1);
    inputRefs.current[newFocusedInputIndex]?.focus();
    setFocusedInputIndex(newFocusedInputIndex);
  };

  const focusFirstDigitInput = () => {
    const firstDigitInput = inputRefs.current[0];
    firstDigitInput?.focus();
    setFocusedInputIndex(0);
  };

  const resetInput = () => {
    setCode(initialCodeStructure);
    focusFirstDigitInput();
  };

  const clearErrorMessage = () => {
    if (errorMessage) {
      setErrorMessage(null);
    }
  };

  const handleBackspaceOrDelete = (key: string, index: number) => {
    if (key === "Backspace" || key === "Delete") {
      retreatFocusedInput(index);
    }
  };

  const handleCompletion = async (value: string, index: number) => {
    inputRefs.current[index]?.blur();
    const result = onComplete?.(value, index);

    if (result instanceof Promise) {
      setIsInputDisabled(true);
      const errorMessageFromComplete = await result;
      setIsInputDisabled(false);
      if (errorMessageFromComplete) {
        setErrorMessage(errorMessageFromComplete);
        resetInput();
      }
    } else if (result) {
      setErrorMessage(result);
      resetInput();
    }
  };

  const handleKeyPress = async (
    e: React.KeyboardEvent<TextInput>,
    index: number
  ) => {
    const newCode = [...code];
    const pressedKey = e.nativeEvent.key;
    const isLastDigitIndex = index === code.length - 1;

    clearErrorMessage();
    handleBackspaceOrDelete(pressedKey, index);

    if (pressedKey !== "Backspace" && pressedKey !== "Delete") {
      newCode[index] = pressedKey;
      setCode(newCode);
      advanceFocusedInput(index);
    }

    const isCodeFilled = newCode.every((digit) => !!digit);

    if (isCodeFilled && isLastDigitIndex && onComplete) {
      await handleCompletion(newCode.join(""), index);
      focusFirstDigitInput();
    }
  };

  return (
    <Flex alignItems="center">
      <Flex flexDirection="row">
        {code.map((codeValue, index) => {
          const isFirstElement = index === 0;

          return (
            <Margin ml={isFirstElement ? 0 : 14} key={index}>
              <ForwardedStyledCodeInput
                keyboardType="numeric"
                ref={(ref) => (inputRefs.current[index] = ref)}
                onFocus={() => setFocusedInputIndex(index)}
                onBlur={() => setFocusedInputIndex(null)}
                isActive={focusedInputIndex === index}
                onKeyPress={(e: React.KeyboardEvent<TextInput>) =>
                  handleKeyPress(e, index)
                }
                autoFocus={isFirstElement}
                value={codeValue}
                editable={!isInputDisabled}
              />
            </Margin>
          );
        })}
      </Flex>
      {errorMessage && (
        <Margin mt={8}>
          <Typography color="warning" variant="paragraphThree">
            {errorMessage}
          </Typography>
        </Margin>
      )}
    </Flex>
  );
};
