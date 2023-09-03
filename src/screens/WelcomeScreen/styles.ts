import styled from "styled-components/native";

export const StyledContentView = styled.View`
  background-color: ${({ theme }) => theme.colors["blue-dark"]};
  flex: 1;
  align-items: center;
  justify-content: center;
`;
