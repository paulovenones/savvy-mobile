import styled from "styled-components/native";
import { ContentView } from "../../components/templates/ContentView";

export const StyledContentView = styled(ContentView)`
  background: ${({ theme }) => theme.colors.darkBlue};
`;
