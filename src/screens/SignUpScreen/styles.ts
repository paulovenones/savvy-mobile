import styled from "styled-components/native";
import { Typography } from "../../components/atoms/Typography";

export const StyledSignInTextContainer = styled.View`
  flex-direction: row;
`;

export const StyledSignInLinkText = styled(Typography)`
  color: ${({ theme }) => theme.colors.blue.standard};
`;
