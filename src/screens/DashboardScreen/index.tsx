import { Button } from "../../components/atoms/Button";
import { Flex } from "../../components/atoms/Flex";
import { Margin } from "../../components/atoms/Margin";
import { Typography } from "../../components/atoms/Typography";
import { useAuthApi, useAuthState } from "../../contexts/auth";

export const DashboardScreen = () => {
  const { user } = useAuthState();
  const { logout } = useAuthApi();

  return (
    <Flex alignItems="center" justifyContent="center" flex={1}>
      <Typography variant="headlineOne">
        É um prazer te ter aqui,{" "}
        {user?.name.includes(" ") ? user?.name.split(" ")[0] : user?.name}
      </Typography>
      <Margin mt={26}>
        <Button onPress={logout} priority="PRIMARY">
          Sair
        </Button>
      </Margin>
    </Flex>
  );
};
