import { ReactNode } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

interface IKeyboardScrollViewProps {
  children?: ReactNode;
}

export const KeyboardScrollView = ({ children }: IKeyboardScrollViewProps) => {
  return (
    <KeyboardAwareScrollView
      extraHeight={150}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ alignItems: "center", flex: 1 }}
    >
      {children}
    </KeyboardAwareScrollView>
  );
};
