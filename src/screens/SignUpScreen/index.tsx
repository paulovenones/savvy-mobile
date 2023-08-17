import { useState } from "react";
import { Button } from "../../components/atoms/Button";
import { ProgressBar } from "../../components/atoms/ProgressBar";
import { ContentView } from "../../components/templates/ContentView";
import { Input } from "../../components/atoms/Input";
import { ScreenTitle } from "../../components/molecules/ScreenTitle";
import { Margin } from "../../components/atoms/Margin";
import { Typography } from "../../components/atoms/Typography";
import { useNavigation } from "@react-navigation/native";
import { StyledSignInTextContainer } from "./styles";
import { TouchableLink } from "../../components/atoms/TouchableLink";

export const SignUpScreen = () => {
  const [signUpProgress, setSignUpProgress] = useState(0.08);

  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate("home");
  };

  return (
    <ContentView>
      <ProgressBar progress={signUpProgress} />
      <Margin mt={16}>
        <ScreenTitle title="Vamos começar" titleSize="LARGE" />
      </Margin>
      <Margin mt={98}>
        <Input
          autoCapitalize="none"
          keyboardType="email-address"
          autoComplete="email"
          autoCorrect={false}
          spellCheck={false}
          label="Email"
        />
      </Margin>
      <Margin mt={16}>
        <Button
          onPress={() => setSignUpProgress(signUpProgress + 0.25)}
          priority="SECONDARY"
        >
          Próximo
        </Button>
      </Margin>
      <Margin mt={16}>
        <StyledSignInTextContainer>
          <Typography variant="paragraphThree">Já tem uma conta? </Typography>
          <TouchableLink onPress={handlePress}>Entrar</TouchableLink>
        </StyledSignInTextContainer>
      </Margin>
    </ContentView>
  );
};
