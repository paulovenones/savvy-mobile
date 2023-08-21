import styled from "styled-components/native";
import { Typography } from "../Typography";

export const StyledSignInLinkText = styled(Typography)`
  color: ${({ theme }) => theme.colors.blue.standard};
  font-weight: 700;
`;
