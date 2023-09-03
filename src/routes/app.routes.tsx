import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { DashboardScreen } from "../screens/DashboardScreen";

const { Navigator, Screen } = createNativeStackNavigator();

export const AppRoutes = () => {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        statusBarColor: "dark",
      }}
    >
      <>
        <Screen name="dashboard" component={DashboardScreen} />
      </>
    </Navigator>
  );
};
