import React from "react";

import OPageHeadlinePossibleIcons from "../../../constants/OPageHeadlinePossibleIcons";
import { StartInvestingIcon } from "../../atoms/StartInvestingIcon";

import { SytledPageHeadline } from "./styles";

type IconType =
  typeof OPageHeadlinePossibleIcons[keyof typeof OPageHeadlinePossibleIcons];

interface IPageHeadlineWithIconProps {
  headlineText: string;
  icon: IconType;
}

const renderIcon = (icon: IconType) => {
  switch (icon) {
    case OPageHeadlinePossibleIcons.startInvesting:
      return <StartInvestingIcon />;
    default:
      return <></>;
  }
};

export const PageHeadlineWithIcon = ({
  headlineText,
  icon,
}: IPageHeadlineWithIconProps) => {
  return (
    <>
      <SytledPageHeadline>{headlineText}</SytledPageHeadline>
      {renderIcon(icon)}
    </>
  );
};
