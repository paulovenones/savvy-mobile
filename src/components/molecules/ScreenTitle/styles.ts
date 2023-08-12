import styled from "styled-components/native";
import { verticalScale } from "react-native-size-matters";

import OScreenTitleSize from "../../../constants/OScreenTitleSize";
import {
  HeadlineOne,
  HeadlineTwo,
  ParagraphThree,
} from "../../atoms/Typography";

interface IStyledSubtitleProps {
  marginFromTitle: typeof OScreenTitleSize[keyof typeof OScreenTitleSize];
}

export const StyledTitleLarge = styled.Text`
  ${HeadlineOne}
  text-align: center;
  color: ${({ theme }) => theme.colors.darkBlue.standard};
`;

export const StyledTitleMedium = styled.Text`
  ${HeadlineTwo}
  text-align: center;
  color: ${({ theme }) => theme.colors.darkBlue.standard};
`;

export const StyledSubtitle = styled.Text<IStyledSubtitleProps>`
  ${ParagraphThree}
  color: ${({ theme }) => theme.colors.darkBlue.opacity[80]};
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
