import { StyleProp, View, ViewStyle } from "react-native";

import OScreenTitleSize from "../../../constants/OScreenTitleSize";
import { StyledSubtitle, StyledTitleLarge, StyledTitleMedium } from "./styles";

export type ScreenTitleSize =
  (typeof OScreenTitleSize)[keyof typeof OScreenTitleSize];

interface ITitleScreenProps {
  title: string;
  titleSize?: ScreenTitleSize;
  subtitle?: string;
  style?: StyleProp<ViewStyle>;
}

interface IRenderTitleProps {
  title: string;
  size: ScreenTitleSize;
}

const renderTitle = ({ title, size }: IRenderTitleProps) => {
  switch (size) {
    case OScreenTitleSize.medium:
      return <StyledTitleMedium>{title}</StyledTitleMedium>;
    case OScreenTitleSize.large:
      return <StyledTitleLarge>{title}</StyledTitleLarge>;
    default:
      return <></>;
  }
};

export const ScreenTitle = ({
  title,
  titleSize = "MEDIUM",
  subtitle,
  style,
}: ITitleScreenProps) => {
  return (
    <View style={style}>
      {renderTitle({ title, size: titleSize })}
      {subtitle && (
        <StyledSubtitle marginFromTitle={titleSize}>{subtitle}</StyledSubtitle>
      )}
    </View>
  );
};
