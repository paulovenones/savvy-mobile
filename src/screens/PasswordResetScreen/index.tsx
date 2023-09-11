import { z } from "zod";
import { Flex } from "../../components/atoms/Flex";
import { ContentView } from "../../components/templates/ContentView";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useState } from "react";
import { MultiStepForm } from "../../components/molecules/MultiStepFrom";
import { PasswordResetStepEmail } from "./PasswordResetSteps/PasswordResetStepEmail";
import { PasswordResetStepCode } from "./PasswordResetSteps/PasswordResetStepCode";
import { PasswordResetStepNew } from "./PasswordResetSteps/PasswordResetStepNew";
import {
  checkHasRepeatedChars,
  checkIsPasswordTooLarge,
} from "../../utils/validate-password-strength";
import { api } from "../../lib/axios";

export type PasswordResetFormSchema = z.infer<typeof passwordResetFormSchema>;

const passwordResetFormSchema = z
  .object({
    email: z
      .string({ required_error: "Email é obrigatório" })
      .min(1, "Email é obrigatório")
      .email("Email inválido"),
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

export const PasswordResetScreen: React.FC = () => {
  const [passwordResetPin, setPasswordResetPin] = useState<string | null>(null);
  const [formCompletition, setFormCompletion] = useState([false, false, false]);

  const {
    control,
    formState: { errors, dirtyFields },
    trigger,
    clearErrors,
    handleSubmit,
    getValues,
  } = useForm<PasswordResetFormSchema>({
    mode: "onBlur",
    reValidateMode: "onChange",
    resolver: zodResolver(passwordResetFormSchema),
  });

  const completeFormStep = (formStep: number) => {
    setFormCompletion((prevState) => {
      const newState = [...prevState];
      newState[formStep] = true;
      return newState;
    });
  };

  const onSubmit: SubmitHandler<PasswordResetFormSchema> = async (data) => {
    const { email, password } = data;

    const requestBody = { email, password, verificationPin: passwordResetPin };

    await api.post("/user/forgot-password/complete", requestBody);
  };

  return (
    <ContentView>
      <Flex alignItems="center">
        <MultiStepForm formCompletition={formCompletition}>
          <PasswordResetStepEmail
            getValues={getValues}
            dirtyFields={dirtyFields}
            clearErrors={clearErrors}
            control={control}
            errors={errors}
            trigger={trigger}
            setIsStepCompleted={() => completeFormStep(0)}
          />
          <PasswordResetStepCode
            getValues={getValues}
            storePasswordResetPin={setPasswordResetPin}
            setIsStepCompleted={() => completeFormStep(1)}
          />
          <PasswordResetStepNew
            onFinishPasswordReset={handleSubmit(onSubmit)}
            getValues={getValues}
            dirtyFields={dirtyFields}
            clearErrors={clearErrors}
            control={control}
            errors={errors}
            trigger={trigger}
            setIsStepCompleted={() => completeFormStep(2)}
          />
        </MultiStepForm>
      </Flex>
    </ContentView>
  );
};
