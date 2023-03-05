import { verticalScale } from "react-native-size-matters";
import styled from "styled-components";
import { HeadlineOne } from "../../atoms/Typography";

export const SytledPageHeadline = styled(HeadlineOne)`
  margin-top: ${verticalScale(88)}px;
  margin-bottom: ${verticalScale(56)}px;
  text-align: center;
  color: ${({ theme }) => theme.colors.white};
`;
