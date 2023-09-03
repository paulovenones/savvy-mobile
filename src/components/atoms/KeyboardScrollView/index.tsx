import { ReactNode } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

interface IKeyboardScrollViewProps {
  children?: ReactNode;
}

export const KeyboardScrollView = ({ children }: IKeyboardScrollViewProps) => {
  return (
    <KeyboardAwareScrollView
      extraHeight={150}
      contentContainerStyle={{ alignItems: "center" }}
    >
      {children}
    </KeyboardAwareScrollView>
  );
};
