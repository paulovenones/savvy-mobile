import { verticalScale } from "react-native-size-matters";
import styled from "styled-components/native";
import { Button } from "../../atoms/Button";

export const StyledCallToActionButton = styled(Button)`
  margin-top: ${verticalScale(48)}px;
  margin-bottom: ${verticalScale(4)}px;
`;
