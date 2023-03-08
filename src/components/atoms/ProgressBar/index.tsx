import { useEffect, useRef } from "react";
import { Animated, Easing } from "react-native";
import { scale } from "react-native-size-matters";
import { StyledProgressBarContainer, StyledProgressBarFill } from "./styles";

const PROGRESS_BAR_WIDTH = scale(88);

export const ProgressBar = () => {
  const animationProgress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animationProgress, {
      toValue: PROGRESS_BAR_WIDTH * 0.7,
      easing: Easing.bounce,
      duration: 800,
      useNativeDriver: false,
    }).start();
  }, []);

  return (
    <StyledProgressBarContainer width={PROGRESS_BAR_WIDTH}>
      <StyledProgressBarFill style={{ width: animationProgress }} />
    </StyledProgressBarContainer>
  );
};
