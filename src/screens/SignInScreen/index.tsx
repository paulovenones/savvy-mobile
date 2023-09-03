import React, { useCallback, useEffect, useMemo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../../components/atoms/Input";
import { Margin } from "../../components/atoms/Margin";
import { Typography } from "../../components/atoms/Typography";
import { ContentView } from "../../components/templates/ContentView";
import { Flex } from "../../components/atoms/Flex";
import { TouchableLink } from "../../components/atoms/TouchableLink";
import { IconButton } from "../../components/atoms/IconButton";

import NavigateNext from "../../assets/navigateNext.svg";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthApi, useAuthState } from "../../contexts/auth";

type SignInFormSchema = z.infer<typeof signInFormSchema>;

const signInFormSchema = z.object({
  email: z
    .string({ required_error: "Email é obrigatório" })
    .min(1, "Email é obrigatório")
    .email("Email inválido"),
  password: z
    .string({ required_error: "Senha é obrigatória" })
    .min(6, "Insira uma senha válida"),
});

export const SignInScreen = () => {
  const {
    control,
    formState: { errors, isValid },
    trigger,
    setError,
    clearErrors,
    handleSubmit,
  } = useForm<SignInFormSchema>({
    mode: "onBlur",
    reValidateMode: "onChange",
    resolver: zodResolver(signInFormSchema),
  });

  const { signIn, clearSignInError } = useAuthApi();
  const { isLoadingSignIn, signInErrorMessage } = useAuthState();

  const onSubmit: SubmitHandler<SignInFormSchema> = async (data) => {
    await signIn(data);
  };

  const isSignInButtonDisabled = useMemo(
    () => !!(isLoadingSignIn || !isValid),
    [isLoadingSignIn, isValid]
  );

  useEffect(() => {
    if (signInErrorMessage) {
      setError("password", { message: signInErrorMessage });
    } else {
      clearErrors("password");
    }
  }, [signInErrorMessage]);

  const onChangeCredentials = useCallback(() => {
    if (signInErrorMessage) {
      clearSignInError();
    }
  }, [clearSignInError, signInErrorMessage]);

  return (
    <ContentView>
      <Flex alignItems="center">
        <Typography variant="headlineOne" color="blue-dark">
          {"Bem-vindo(a)"}
        </Typography>
        <Margin mt={12}>
          <Typography variant="paragraphThree" color="grey">
            Acesse sua conta
          </Typography>
        </Margin>
      </Flex>
      <Margin mt={40}>
        <Input
          control={control}
          trigger={trigger}
          clearErrors={clearErrors}
          label="Email"
          name="email"
          autoCapitalize="none"
          keyboardType="email-address"
          autoComplete="email"
          autoCorrect={false}
          spellCheck={false}
          onChangeText={onChangeCredentials}
          hasError={!!errors.email}
          errorMessage={errors.email?.message}
        />
        <Margin mt={16}>
          <Input
            control={control}
            trigger={trigger}
            clearErrors={clearErrors}
            onChangeText={onChangeCredentials}
            name="password"
            label="Senha"
            secureTextEntry={true}
            hasError={!!errors.password}
            errorMessage={errors.password?.message}
          />
        </Margin>
      </Margin>
      <Margin mt={24}>
        <Flex flexDirection="row" justifyContent="space-between">
          <TouchableLink variant="paragraphThree" color="blue-dark">
            Esqueceu sua senha?
          </TouchableLink>
          <IconButton
            disabled={isSignInButtonDisabled}
            onPress={handleSubmit(onSubmit)}
            priority="PRIMARY"
            size="LARGE"
          >
            <NavigateNext />
          </IconButton>
        </Flex>
      </Margin>
    </ContentView>
  );
};
