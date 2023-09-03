import { NavigationContainer } from "@react-navigation/native";
import styled from "styled-components/native";

import { AppRoutes } from "./app.routes";
import { useAuthState } from "../contexts/auth";
import { AuthRoutes } from "./auth.routes";

export function Routes() {
  const { isAuthenticated } = useAuthState();

  return (
    <RootView>
      <NavigationContainer>
        {isAuthenticated ? <AppRoutes /> : <AuthRoutes />}
      </NavigationContainer>
    </RootView>
  );
}

const RootView = styled.View`
  flex: 1;
  background: ${({ theme }) => theme.colors.white};
`;
