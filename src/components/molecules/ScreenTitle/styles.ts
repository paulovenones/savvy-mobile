import styled from "styled-components/native";
import { verticalScale } from "react-native-size-matters";

import {
  HeadlineOne,
  HeadlineTwo,
  ParagraphThree,
} from "../../atoms/Typography";
import OScreenTitleSize from "../../../constants/OScreenTitleSize";

interface IStyledSubtitleProps {
  marginFromTitle: typeof OScreenTitleSize[keyof typeof OScreenTitleSize];
}

export const StyledTitleLarge = styled(HeadlineOne)`
  text-align: center;
  color: ${({ theme }) => theme.colors.darkBlue.standard};
`;

export const StyledTitleMedium = styled(HeadlineTwo)`
  text-align: center;
  color: ${({ theme }) => theme.colors.darkBlue.standard};
`;

export const StyledSubtitle = styled(ParagraphThree)<IStyledSubtitleProps>`
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
