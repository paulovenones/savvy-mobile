import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { SignUpScreen } from "../screens/SignUpScreen";
import { WelcomeScreen } from "../screens/WelcomeScreen";
import { SignInScreen } from "../screens/SignInScreen";

const { Navigator, Screen } = createNativeStackNavigator();

export const AuthRoutes = () => {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        statusBarColor: "dark",
      }}
    >
      <>
        <Screen name="home" component={WelcomeScreen} />
        <Screen name="signup" component={SignUpScreen} />
        <Screen name="signin" component={SignInScreen} />
      </>
    </Navigator>
  );
};
