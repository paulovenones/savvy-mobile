import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";

import { ButtonGroupVertical } from "../molecules/ButtonGroupVertical";
import { PageHeadlineWithIcon } from "../molecules/PageHeadlineWithIcon";

export const Welcome = () => {
  const { navigate } = useNavigation();

  return (
    <>
      <PageHeadlineWithIcon
        headlineText={`Easiest way \n to start saving`}
        icon="START_INVESTING"
      />
      <ButtonGroupVertical
        primaryButtonText="Create Account"
        tertiaryButtonText="Sign In"
        primaryButtonOnPress={() => navigate("signup")}
        tertiaryButtonOnPress={() => {}}
      />
      <StatusBar style="auto" />
    </>
  );
};
