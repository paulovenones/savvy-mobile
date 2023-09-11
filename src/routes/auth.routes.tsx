import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { SignUpScreen } from "../screens/SignUpScreen";
import { WelcomeScreen } from "../screens/WelcomeScreen";
import { SignInScreen } from "../screens/SignInScreen";
import { PasswordResetScreen } from "../screens/PasswordResetScreen";

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
        <Screen name="passwordReset" component={PasswordResetScreen} />
      </>
    </Navigator>
  );
};
