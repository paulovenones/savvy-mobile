import { Control, FieldValues } from "react-hook-form";
import { Button } from "../../../../components/atoms/Button";
import { Input } from "../../../../components/atoms/Input";
import { Margin } from "../../../../components/atoms/Margin";
import { TouchableLink } from "../../../../components/atoms/TouchableLink";
import { Typography } from "../../../../components/atoms/Typography";
import { ScreenTitle } from "../../../../components/molecules/ScreenTitle";
import { StyledSignInTextContainer } from "../../styles";
import { useNavigation } from "@react-navigation/native";

interface ISignUpFormStepEmailProps {
  control: Control<FieldValues, any>;
  setIsStepCompleted: () => void;
}

export const SignUpFormStepEmail = ({
  control,
  setIsStepCompleted,
}: ISignUpFormStepEmailProps) => {
  const navigation = useNavigation();

  const handleSignInPress = () => {
    navigation.navigate("home");
  };

  return (
    <>
      <ScreenTitle title="Vamos começar" titleSize="LARGE" />
      <Margin mt={98}>
        <Input
          control={control}
          name="email"
          autoCapitalize="none"
          keyboardType="email-address"
          autoComplete="email"
          autoCorrect={false}
          spellCheck={false}
          label="Email"
        />
      </Margin>
      <Margin mt={16}>
        <Button onPress={setIsStepCompleted} priority="SECONDARY">
          Enviar código
        </Button>
      </Margin>
      <Margin mt={16}>
        <StyledSignInTextContainer>
          <Typography variant="paragraphThree">Já tem uma conta? </Typography>
          <TouchableLink onPress={handleSignInPress}>Entrar</TouchableLink>
        </StyledSignInTextContainer>
      </Margin>
    </>
  );
};
