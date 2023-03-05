import { NavigationContainer } from "@react-navigation/native";
import { View } from "react-native";
import styled from "styled-components/native";
import { Welcome } from "../components/organisms/Welcome";
import { WelcomeScreen } from "../screens/WelcomeScreen";
import { AppRoutes } from "./app.routes";

export function Routes() {
  return (
    <RootView>
      <NavigationContainer>
        <AppRoutes />
      </NavigationContainer>
    </RootView>
  );
}

const RootView = styled.View`
  flex: 1;
  background: ${({ theme }) => theme.colors.white};
`;
