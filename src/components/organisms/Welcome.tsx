import { StatusBar } from "expo-status-bar";
import { useIsFocused, useNavigation } from "@react-navigation/native";

import { ButtonGroupVertical } from "../molecules/ButtonGroupVertical";
import { PageHeadlineWithIcon } from "../molecules/PageHeadlineWithIcon";

export const Welcome = () => {
  const { navigate } = useNavigation();
  const isFocused = useIsFocused();

  return (
    <>
      {isFocused && <StatusBar style="light" />}
      <PageHeadlineWithIcon
        headlineText={`Faça valer \n cada centavo`}
        icon="START_INVESTING"
      />
      <ButtonGroupVertical
        primaryButtonText="Criar Conta"
        tertiaryButtonText="Entrar"
        primaryButtonOnPress={() => navigate("signup")}
        tertiaryButtonOnPress={() => navigate("signin")}
      />
    </>
  );
};
