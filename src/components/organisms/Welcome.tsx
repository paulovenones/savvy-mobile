import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";

import { ButtonGroupVertical } from "../molecules/ButtonGroupVertical";
import { PageHeadlineWithIcon } from "../molecules/PageHeadlineWithIcon";

export const Welcome = () => {
  const { navigate } = useNavigation();

  return (
    <>
      <PageHeadlineWithIcon
        headlineText={`Faça valer \n cada centavo`}
        icon="START_INVESTING"
      />
      <ButtonGroupVertical
        primaryButtonText="Criar Conta"
        tertiaryButtonText="Entrar"
        primaryButtonOnPress={() => navigate("signup")}
        tertiaryButtonOnPress={() => {}}
      />
      <StatusBar style="auto" />
    </>
  );
};
