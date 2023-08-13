import { verticalScale } from "react-native-size-matters";
import styled from "styled-components/native";
import { typographyStyles } from "../../atoms/Typography";

export const SytledPageHeadline = styled.Text`
  ${typographyStyles.headlineOne}
  margin-top: ${verticalScale(10)}px;
  margin-bottom: ${verticalScale(56)}px;
  text-align: center;
  color: ${({ theme }) => theme.colors.white};
`;
