import { ReactNode } from "react";
import { scale, verticalScale } from "react-native-size-matters";
import { SimpleInterpolation } from "styled-components";
import styled, { css } from "styled-components/native";
import { StyleProp, Text, TextStyle } from "react-native";

interface ITypographyProps {
  variant: keyof typeof typographyStyles;
  children: ReactNode;
}

export const Typography: React.FC<ITypographyProps> = ({
  variant,
  children,
  ...props
}) => {
  const typographyStyle: SimpleInterpolation =
    typographyStyles[variant] || css``;
  const StyledText = styled(Text)`
    ${typographyStyle}
  `;

  return <StyledText {...props}>{children}</StyledText>;
};

export const typographyStyles = {
  // Headlines
  headlineOne: css`
    font-size: ${scale(36)}px;
    line-height: ${verticalScale(46)}px;
    font-weight: 700;
    letter-spacing: -1px;
  `,
  headlineTwo: css`
    font-size: ${scale(24)}px;
    line-height: ${verticalScale(24)}px;
    font-weight: 700;
    letter-spacing: -0.8px;
  `,
  headlineThree: css`
    font-size: ${scale(22)}px;
    line-height: ${verticalScale(32)}px;
    font-weight: 700;
    letter-spacing: -0.4px;
  `,
  headlineFour: css`
    font-size: ${scale(18)}px;
    line-height: ${verticalScale(28)}px;
    font-weight: 700;
    letter-spacing: -0.4px;
  `,
  headlineFive: css`
    font-size: ${scale(16)}px;
    line-height: ${verticalScale(26)}px;
    font-weight: 700;
    letter-spacing: -0.36px;
  `,
  headlineSix: css`
    font-size: ${scale(14)}px;
    line-height: ${verticalScale(24)}px;
    font-weight: 700;
    letter-spacing: -0.3px;
  `,

  // Paragraphs
  paragraphOne: css`
    font-size: ${scale(18)}px;
    line-height: ${verticalScale(28)}px;
    font-weight: 500;
    letter-spacing: -0.4px;
  `,
  paragraphTwo: css`
    font-size: ${scale(16)}px;
    line-height: ${verticalScale(26)}px;
    font-weight: 500;
    letter-spacing: -0.36px;
  `,
  paragraphThree: css`
    font-size: ${scale(14)}px;
    line-height: ${verticalScale(24)}px;
    font-weight: 500;
    letter-spacing: -0.3px;
  `,
};
