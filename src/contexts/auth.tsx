import React, {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { api } from "../lib/axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { isAxiosError } from "axios";
import { CONSTANTS } from "../constants";

interface IUser {
  id: string;
  name: string;
  email: string;
}

interface IAuthStateCtx {
  isAuthenticated: boolean;
  user: IUser | null;
  isLoadingSignIn: boolean;
  signInErrorMessage: string;
}

interface ISignInProps {
  email: string;
  password: string;
}

interface IPostSignUpProps {
  accessToken: string;
  refreshToken: string;
  user: IUser;
}

interface IAuthApiCtx {
  signIn: (object: ISignInProps) => Promise<void>;
  postSignUp: (object: IPostSignUpProps) => Promise<void>;
  logout: () => void;
  clearSignInError: () => void;
}

const AuthStateCtx = createContext<IAuthStateCtx>({} as IAuthStateCtx);
const AuthApiCtx = createContext<IAuthApiCtx>({} as IAuthApiCtx);

export const AuthProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoadingSignIn, setIsLoadingSignIn] = useState(false);
  const [signInErrorMessage, setSignInErrorMessage] = useState("");

  const signIn: IAuthApiCtx["signIn"] = async ({ email, password }) => {
    setIsLoadingSignIn(true);

    try {
      const response = await api.post("/login", {
        email,
        password,
      });

      const { accessToken, refreshToken, user } = response.data;

      await AsyncStorage.multiSet([
        ["@Savvy:accessToken", accessToken],
        ["@Savvy:refreshToken", refreshToken],
        ["@Savvy:user", JSON.stringify(user)],
      ]);

      await AsyncStorage.setItem("@Savvy:accessToken", accessToken);
      await AsyncStorage.setItem("@Savvy:refreshToken", refreshToken);
      await AsyncStorage.setItem("@Savvy:user", JSON.stringify(user));
      setUser(user);
    } catch (err) {
      if (isAxiosError(err)) {
        const statusCode = err.response?.status;
        if (statusCode === CONSTANTS.STATUS_CODES.UNAUTHORIZED) {
          setSignInErrorMessage("Senha ou email inválido");
        } else {
          console.error(err.message);
        }
      }
    } finally {
      setIsLoadingSignIn(false);
    }
  };

  const postSignUp: IAuthApiCtx["postSignUp"] = async ({
    accessToken,
    refreshToken,
    user,
  }) => {
    await AsyncStorage.multiSet([
      ["@Savvy:accessToken", accessToken],
      ["@Savvy:refreshToken", refreshToken],
      ["@Savvy:user", JSON.stringify(user)],
    ]);

    setUser(user);
  };

  const logout = () => {
    AsyncStorage.getItem("@Savvy:refreshToken")
      .then((refreshToken) => {
        if (refreshToken) {
          api.post("/logout", { refresh_token: refreshToken });
        }
      })
      .finally(() => {
        AsyncStorage.multiRemove([
          "@Savvy:accessToken",
          "@Savvy:refreshToken",
          "@Savvy:user",
        ]).then(() => {
          setUser(null);
        });
      });
  };

  const clearSignInError = useCallback(() => {
    setSignInErrorMessage("");
  }, [setSignInErrorMessage]);

  const authContextData: IAuthStateCtx = {
    isAuthenticated: !!user,
    user: user,
    isLoadingSignIn: isLoadingSignIn,
    signInErrorMessage,
  };

  const authContextApi = useMemo(
    () => ({
      signIn,
      postSignUp,
      logout,
      clearSignInError,
    }),
    []
  );

  useEffect(() => {
    AsyncStorage.getItem("@Savvy:user").then((user) => {
      if (user) {
        setUser(JSON.parse(user));
      }
    });
  }, []);

  return (
    <AuthStateCtx.Provider value={authContextData}>
      <AuthApiCtx.Provider value={authContextApi}>
        {children}
      </AuthApiCtx.Provider>
    </AuthStateCtx.Provider>
  );
};

export const useAuthState = () => {
  const ctx = useContext(AuthStateCtx);

  if (!ctx) {
    throw new Error("useAuthState must be used within the AuthProvider");
  }

  return ctx;
};

export const useAuthApi = () => {
  const ctx = useContext(AuthApiCtx);

  if (!ctx) {
    throw new Error("useAuthApi must be used within the AuthProvider");
  }

  return ctx;
};
