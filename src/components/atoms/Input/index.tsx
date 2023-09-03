import React, { useEffect, useRef, useState } from "react";
import { StyledInput, StyledInputContainer, StyledInputLabel } from "./styles";
import { Animated, TextInputProps } from "react-native";
import { verticalScale } from "react-native-size-matters";
import {
  Control,
  UseFormClearErrors,
  UseFormTrigger,
  useController,
} from "react-hook-form";

import { Margin } from "../Margin";
import { Typography } from "../Typography";
import { Flex } from "../Flex";

interface IInputProps extends TextInputProps {
  label: string;
  name: string;
  control?: Control<any, any>;
  defaultValue?: string;
  hasError?: boolean;
  errorMessage?: string;
  trigger?: UseFormTrigger<any>;
  clearErrors?: UseFormClearErrors<any>;
}

export const Input = ({
  label,
  name,
  control,
  defaultValue,
  hasError,
  errorMessage,
  onChangeText,
  trigger,
  clearErrors,
  ...rest
}: IInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const { field, fieldState } = useController({
    control,
    name,
    defaultValue,
  });

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => {
    field.onBlur();
    fieldState.error = undefined;

    trigger && trigger(name);

    setIsFocused(false);
  };
  const handleChangeText = (text: string) => {
    field.onChange(text);
    clearErrors && clearErrors(name);
    setIsFilled(!!text?.length);

    onChangeText && onChangeText(text);
  };

  const labelDistanceFromTop = useRef(
    new Animated.Value(verticalScale(20))
  ).current;

  useEffect(() => {
    if (isFilled || isFocused) {
      Animated.timing(labelDistanceFromTop, {
        toValue: verticalScale(7),
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(labelDistanceFromTop, {
        toValue: verticalScale(20),
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [isFocused, isFilled]);

  return (
    <Flex alignItems="flex-start">
      <StyledInputContainer isFocused={isFocused} hasError={hasError}>
        <StyledInputLabel
          isFilled={isFilled}
          isFocused={isFocused}
          style={{ marginTop: labelDistanceFromTop }}
        >
          {label}
        </StyledInputLabel>
        <StyledInput
          {...rest}
          value={field.value}
          onChangeText={handleChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </StyledInputContainer>
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
