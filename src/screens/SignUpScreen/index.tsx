import { useForm } from "react-hook-form";
import { Alert, Text } from "react-native";
import { MultiStepForm } from "../../components/molecules/MultiStepFrom";
import { useState } from "react";
import { SignUpFormStepEmail } from "./SignUpFormSteps/SignUpFormStepEmail";
import { SignUpFormStepCode } from "./SignUpFormSteps/SignUpFormStepCode";

export const SignUpScreen = () => {
  const { control, handleSubmit } = useForm();
  const onSubmit = (data: any) => {
    Alert.alert(JSON.stringify(data));
    console.log(JSON.stringify(data));
  };

  const [formCompletition, setFormCompletion] = useState([
    false,
    false,
    false,
    false,
  ]);

  const completeFormStep = (formStep: number) => {
    setFormCompletion((prevState) => {
      const newState = [...prevState];
      newState[formStep] = true;
      return newState;
    });
  };

  return (
    <MultiStepForm formCompletition={formCompletition}>
      <SignUpFormStepEmail
        control={control}
        setIsStepCompleted={() => completeFormStep(0)}
      />
      <SignUpFormStepCode
        control={control}
        setIsStepCompleted={() => completeFormStep(1)}
      />
      <>
        <Text>OIOIOI</Text>
        <Text>OIOIOI</Text>
        <Text>OIOIOI</Text>
        <Text>OIOIOI</Text>
      </>
      <>
        <Text>TCHAU</Text>
        <Text>TCHAU</Text>
        <Text>TCHAU</Text>
        <Text>TCHAU</Text>
      </>
      <>
        <Text>BOA NOITE</Text>
        <Text>BOA NOITE</Text>
        <Text>BOA NOITE</Text>
        <Text>BOA NOITE</Text>
      </>
    </MultiStepForm>
  );
};
