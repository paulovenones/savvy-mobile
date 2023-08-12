import { scale, verticalScale } from "react-native-size-matters";
import { css } from "styled-components/native";

// Headlines
export const HeadlineOne = css`
  font-size: ${scale(36)}px;
  line-height: ${verticalScale(46)}px;
  font-weight: 700;
  letter-spacing: -1px;
`;

export const HeadlineTwo = css`
  font-size: ${scale(24)}px;
  line-height: ${verticalScale(24)}px;
  font-weight: 700;
  letter-spacing: -0.8px;
`;

export const HeadlineThree = css`
  font-size: ${scale(22)}px;
  line-height: ${verticalScale(32)}px;
  font-weight: 700;
  letter-spacing: -0.4px;
`;
export const HeadlineFour = css`
  font-size: ${scale(18)}px;
  line-height: ${verticalScale(28)}px;
  font-weight: 700;
  letter-spacing: -0.4px;
`;
export const HeadlineFive = css`
  font-size: ${scale(16)}px;
  line-height: ${verticalScale(26)}px;
  font-weight: 700;
  letter-spacing: -0.36px;
`;
export const HeadlineSix = css`
  font-size: ${scale(14)}px;
  line-height: ${verticalScale(24)}px;
  font-weight: 700;
  letter-spacing: -0.3px;
`;

// Paragraphs
export const ParagraphOne = css`
  font-size: ${scale(18)}px;
  line-height: ${verticalScale(28)}px;
  font-weight: 500;
  letter-spacing: -0.4px;
`;

export const ParagraphTwo = css`
  font-size: ${scale(16)}px;
  line-height: ${verticalScale(26)}px;
  font-weight: 500;
  letter-spacing: -0.36px;
`;

export const ParagraphThree = css`
  font-size: ${scale(14)}px;
  line-height: ${verticalScale(24)}px;
  font-weight: 500;
  letter-spacing: -0.3px;
`;
