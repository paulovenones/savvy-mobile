import { TouchableOpacity } from "react-native";
import { StyledSignInLinkText } from "./styles";
import { ReactNode } from "react";

interface ITouchableLink {
  onPress?: () => void;
  children: ReactNode;
}

export const TouchableLink = ({ onPress, children }: ITouchableLink) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <StyledSignInLinkText variant="paragraphThree">
        {children}
      </StyledSignInLinkText>
    </TouchableOpacity>
  );
};
