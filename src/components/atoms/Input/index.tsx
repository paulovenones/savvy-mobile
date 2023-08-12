import React, { useEffect, useRef, useState } from "react";
import { StyledInput, StyledInputContainer, StyledInputLabel } from "./styles";
import { Animated } from "react-native";
import { verticalScale } from "react-native-size-matters";

export const Input = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);
  const handleChangeText = (value: string) => setIsFilled(!!value.length);

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
        Card holder
      </StyledInputLabel>
      <StyledInput
        onChangeText={handleChangeText}
        onFocus={handleFocus}
        onBlur={handleBlur}
        isFocused={isFocused}
      />
    </StyledInputContainer>
  );
};
