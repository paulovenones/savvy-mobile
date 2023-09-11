import { SubmitHandler, useForm } from "react-hook-form";
import { MultiStepForm } from "../../components/molecules/MultiStepFrom";
import { useEffect, useState } from "react";
import { SignUpFormStepEmail } from "./SignUpFormSteps/SignUpFormStepEmail";
import { SignUpFormStepCode } from "./SignUpFormSteps/SignUpFormStepCode";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ContentView } from "../../components/templates/ContentView";
import { SignUpFormStepName } from "./SignUpFormSteps/SignUpFormStepName";
import { SignUpFormStepPassword } from "./SignUpFormSteps/SignUpFormStepPassword";
import {
  checkIsPasswordTooLarge,
  checkHasRepeatedChars,
} from "../../utils/validate-password-strength";
import { getCalendars } from "expo-localization";
import { api } from "../../lib/axios";
import { useAuthApi } from "../../contexts/auth";

export type SignUpFormSchema = z.infer<typeof signUpFormSchema>;

const signUpFormSchema = z
  .object({
    email: z
      .string({ required_error: "Email é obrigatório" })
      .min(1, "Email é obrigatório")
      .email("Email inválido"),
    name: z
      .string({ required_error: "Nome é obrigatório" })
      .min(1, "Nome é obrigatório"),
    password: z
      .string({ required_error: "Senha é obrigatória" })
      .min(1, "Senha é obrigatória")
      .refine(
        (value) => {
          return !checkHasRepeatedChars(value);
        },
        { message: "Caracteres consecutivos ou repetidos" }
      )
      .refine(
        (value) => {
          return !checkIsPasswordTooLarge(value);
        },
        { message: "Senha muito grande" }
      ),
    passwordConfirm: z
      .string({ required_error: "Por favor confirme sua senha" })
      .min(1, "Por favor confirme sua senha"),
  })
  .refine(
    (data) => {
      const password = data.password;
      const passwordConfirm = data.passwordConfirm;
      return password === passwordConfirm;
    },
    {
      path: ["passwordConfirm"],
      message: "Senhas não coincidem",
    }
  );
export const SignUpScreen = () => {
  const {
    control,
    handleSubmit,
    clearErrors,
    watch,
    getValues,
    setError,
    trigger,
    formState: { errors, dirtyFields },
  } = useForm<SignUpFormSchema>({
    mode: "onBlur",
    reValidateMode: "onChange",
    resolver: zodResolver(signUpFormSchema),
  });
  const { postSignUp } = useAuthApi();

  const [formCompletition, setFormCompletion] = useState([
    false,
    false,
    false,
    false,
  ]);
  const [signUpToken, setSignUpToken] = useState<string | null>(null);

  const completeFormStep = (formStep: number) => {
    setFormCompletion((prevState) => {
      const newState = [...prevState];
      newState[formStep] = true;
      return newState;
    });
  };

  const onSubmit: SubmitHandler<SignUpFormSchema> = async (data) => {
    const timezone = getCalendars()[0].timeZone;

    const { name, email, password } = data;

    const requestBody = { name, email, password, timezone };

    const response = await api.post("/signup/complete", requestBody, {
      headers: {
        Authorization: signUpToken,
      },
    });

    const { token, refreshToken, user } = response.data;

    postSignUp({
      accessToken: token,
      refreshToken,
      user,
    });
  };

  const password = watch("password");
  const passwordConfirm = watch("passwordConfirm");

  useEffect(() => {
    if (
      dirtyFields?.password &&
      dirtyFields?.passwordConfirm &&
      password !== passwordConfirm
    ) {
      setError("passwordConfirm", {
        message: "Senhas não coincidem",
        type: "validate",
      });
    } else {
      clearErrors("passwordConfirm");
    }
  }, [password, passwordConfirm, setError]);

  return (
    <ContentView>
      <MultiStepForm formCompletition={formCompletition}>
        <SignUpFormStepEmail
          getValues={getValues}
          errors={errors}
          control={control}
          setIsStepCompleted={() => completeFormStep(0)}
          dirtyFields={dirtyFields}
          trigger={trigger}
          clearErrors={clearErrors}
        />
        <SignUpFormStepCode
          getValues={getValues}
          storeSignUpToken={setSignUpToken}
          setIsStepCompleted={() => completeFormStep(1)}
        />
        <SignUpFormStepName
          setIsStepCompleted={() => completeFormStep(2)}
          control={control}
          errors={errors}
          dirtyFields={dirtyFields}
          trigger={trigger}
          clearErrors={clearErrors}
        />
        <SignUpFormStepPassword
          setIsStepCompleted={() => completeFormStep(3)}
          control={control}
          errors={errors}
          dirtyFields={dirtyFields}
          onFinishSignUp={handleSubmit(onSubmit)}
          trigger={trigger}
          clearErrors={clearErrors}
        />
      </MultiStepForm>
    </ContentView>
  );
};
