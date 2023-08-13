import { useState } from "react";
import { Button } from "../../components/atoms/Button";
import { ProgressBar } from "../../components/atoms/ProgressBar";
import { ContentView } from "../../components/templates/ContentView";
import { Input } from "../../components/atoms/Input";
import { ScreenTitle } from "../../components/molecules/ScreenTitle";
import { Margin } from "../../components/atoms/Margin";
import { verticalScale } from "react-native-size-matters";
import { Typography } from "../../components/atoms/Typography";
import { useNavigation } from "@react-navigation/native";
import { StyledSignInLinkText, StyledSignInTextContainer } from "./styles";
import { TouchableOpacity } from "react-native";

export const SignUpScreen = () => {
  const [signUpProgress, setSignUpProgress] = useState(0.08);

  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate("home");
  };

  return (
    <ContentView>
      <ProgressBar progress={signUpProgress} />
      <ScreenTitle title="Vamos começar" titleSize="LARGE" />
      <Margin mt={verticalScale(98)}>
        <Input label="Email" />
      </Margin>
      <Margin mt={verticalScale(16)}>
        <Button
          onPress={() => setSignUpProgress(signUpProgress + 0.25)}
          priority="SECONDARY"
        >
          Próximo
        </Button>
      </Margin>
      <Margin mt={verticalScale(16)}>
        <StyledSignInTextContainer>
          <Typography variant="paragraphThree">Já tem uma conta? </Typography>
          <TouchableOpacity onPress={handlePress}>
            <StyledSignInLinkText variant="paragraphThree">
              Entrar
            </StyledSignInLinkText>
          </TouchableOpacity>
        </StyledSignInTextContainer>
      </Margin>
    </ContentView>
  );
};
