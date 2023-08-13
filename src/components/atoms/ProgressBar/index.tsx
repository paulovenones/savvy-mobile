import { useEffect, useRef } from "react";
import { Animated, Easing, StyleProp, View, ViewStyle } from "react-native";
import { scale } from "react-native-size-matters";
import { StyledProgressBarContainer, StyledProgressBarFill } from "./styles";

const PROGRESS_BAR_WIDTH = scale(88);

interface IProgressBarProps {
  progress?: number;
  style?: StyleProp<ViewStyle>;
}

export const ProgressBar = ({ style, progress = 0 }: IProgressBarProps) => {
  const animationProgress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const newProgress = Math.min(
      PROGRESS_BAR_WIDTH,
      PROGRESS_BAR_WIDTH * progress
    );

    Animated.timing(animationProgress, {
      toValue: newProgress,
      easing: Easing.bounce,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  return (
    <View style={style}>
      <StyledProgressBarContainer width={PROGRESS_BAR_WIDTH}>
        <StyledProgressBarFill style={{ width: animationProgress }} />
      </StyledProgressBarContainer>
    </View>
  );
};
