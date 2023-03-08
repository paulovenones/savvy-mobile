import styled from "styled-components/native";
import { ContentView } from "../../components/templates/ContentView";

export const StyledContentView = styled(ContentView)`
  background-color: ${({ theme }) => theme.colors.darkBlue.standard};
`;
