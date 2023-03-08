import OScreenTitleSize from "../../../constants/OScreenTitleSize";
import { StyledSubtitle, StyledTitleLarge, StyledTitleMedium } from "./styles";

type ScreenTitleType = typeof OScreenTitleSize[keyof typeof OScreenTitleSize];

interface ITitleScreenProps {
  title: string;
  titleSize: ScreenTitleType;
  subtitle?: string;
}

interface IRenderTitleProps {
  title: string;
  size: ScreenTitleType;
}

const renderTitle = ({ title, size }: IRenderTitleProps) => {
  switch (size) {
    case OScreenTitleSize.medium:
      return <StyledTitleMedium>{title}</StyledTitleMedium>;
    case OScreenTitleSize.large:
      return <StyledTitleLarge>{title}</StyledTitleLarge>;
    default:
      return <></>;
  }
};

export const ScreenTitle = ({
  title,
  titleSize,
  subtitle,
}: ITitleScreenProps) => {
  return (
    <>
      {renderTitle({ title, size: titleSize })}
      <StyledSubtitle marginFromTitle={titleSize}>{subtitle}</StyledSubtitle>
    </>
  );
};
