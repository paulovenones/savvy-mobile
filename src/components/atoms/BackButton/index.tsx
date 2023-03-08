import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import ArrowBack from "../../../assets/arrowBack.svg";

export const BackButton = () => {
  const { goBack } = useNavigation();

  return (
    <TouchableOpacity onPress={goBack} activeOpacity={0.7}>
      <ArrowBack />
    </TouchableOpacity>
  );
};
