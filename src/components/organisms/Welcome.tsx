import { StatusBar } from "expo-status-bar";

import { ButtonGroupVertical } from "../molecules/ButtonGroupVertical";
import { PageHeadlineWithIcon } from "../molecules/PageHeadlineWithIcon";

export const Welcome = () => {
  return (
    <>
      <PageHeadlineWithIcon
        headlineText={`Easiest way \n to start saving`}
        icon="START_INVESTING"
      />
      <ButtonGroupVertical />
      <StatusBar style="auto" />
    </>
  );
};
