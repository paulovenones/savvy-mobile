import React, { useEffect, useRef, useState } from "react";
import { StyledInput, StyledInputContainer, StyledInputLabel } from "./styles";
import { Animated, TextInputProps } from "react-native";
import { verticalScale } from "react-native-size-matters";
import { Control, FieldValues, useController } from "react-hook-form";

interface IInputProps extends TextInputProps {
  label: string;
  name: string;
  control: Control<FieldValues, any>;
  defaultValue?: string;
}

export const Input = ({
  label,
  name,
  control,
  defaultValue,
  ...rest
}: IInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const { field } = useController({
    control,
    name,
    defaultValue,
  });

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);
  const handleChangeText = (text: string) => {
    field.onChange(text);
    setIsFilled(!!field.value);
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
    <StyledInputContainer isFocused={isFocused}>
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
  );
};
