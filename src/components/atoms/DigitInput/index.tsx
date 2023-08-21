import React, { useRef, useState } from "react";
import { StyledCodeInput } from "./styles";
import { TextInput, View } from "react-native";
import { Margin } from "../Margin";

interface IDigitInputProps {
  onComplete?: (value: string, index: number) => void;
}

const ForwardedStyledCodeInput = React.forwardRef<TextInput, any>(
  ({ ...props }, ref) => <StyledCodeInput ref={ref} {...props} />
);

export const DigitInput = ({ onComplete }: IDigitInputProps) => {
  const INPUT_LENGTH = 4;

  const [code, setCode] = useState(Array(INPUT_LENGTH).fill(""));
  const [focusedInputIndex, setFocusedInputIndex] = useState<number | null>(0);

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

  const handleKeyPress = (e: React.KeyboardEvent<TextInput>, index: number) => {
    const newCode = [...code];
    const pressedKey = e.nativeEvent.key;
    const isLastDigitIndex = index === code.length - 1;

    if (pressedKey === "Backspace" || pressedKey === "Delete") {
      retreatFocusedInput(index);
    } else {
      newCode[index] = pressedKey;
      setCode(newCode);
      advanceFocusedInput(index);
    }

    const isCodeFilled = newCode.every((digit) => !!digit);

    if (isCodeFilled && isLastDigitIndex && onComplete) {
      inputRefs.current[index]?.blur();
      onComplete(newCode.join(""), index);
    }
  };

  return (
    <View style={{ flexDirection: "row" }}>
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
            />
          </Margin>
        );
      })}
    </View>
  );
};
