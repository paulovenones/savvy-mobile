import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { SignUpScreen } from "../screens/SignUpScreen";
import { WelcomeScreen } from "../screens/WelcomeScreen";

const { Navigator, Screen } = createNativeStackNavigator();

const PublicRoutes = () => {
  return (
    <>
      <Screen name="home" component={WelcomeScreen} />
    </>
  );
};

export const AppRoutes = () => {
  const isAuthenticated = false;

  return (
    <Navigator screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        <></>
      ) : (
        <>
          <Screen name="home" component={WelcomeScreen} />
          <Screen name="signup" component={SignUpScreen} />
        </>
      )}
    </Navigator>
  );
};
