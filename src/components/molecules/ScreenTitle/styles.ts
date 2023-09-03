import styled from "styled-components/native";
import { verticalScale } from "react-native-size-matters";

import OScreenTitleSize from "../../../constants/OScreenTitleSize";
import { typographyStyles } from "../../atoms/Typography";

interface IStyledSubtitleProps {
  marginFromTitle: (typeof OScreenTitleSize)[keyof typeof OScreenTitleSize];
}

export const StyledTitleLarge = styled.Text`
  ${typographyStyles.headlineOne}
  text-align: center;
  color: ${({ theme }) => theme.colors["blue-dark"]};
`;

export const StyledTitleMedium = styled.Text`
  ${typographyStyles.headlineTwo}
  text-align: center;
  color: ${({ theme }) => theme.colors["blue-dark"]};
`;

export const StyledSubtitle = styled.Text<IStyledSubtitleProps>`
  ${typographyStyles.paragraphThree}
  color: ${({ theme }) => theme.colors["blue-dark-80"]};
  margin-top: ${(props) => {
    switch (props.marginFromTitle) {
      case OScreenTitleSize.medium:
        return `${verticalScale(4)}px`;
      case OScreenTitleSize.large:
        return `${verticalScale(12)}px`;
      default:
        return "0px";
    }
  }};
  text-align: center;
`;
