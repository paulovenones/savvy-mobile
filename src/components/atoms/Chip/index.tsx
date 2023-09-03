import { Typography } from "../Typography";
import { StyledChipContainer, allChipColors, chipColorOptions } from "./style";

export interface IChipCommonProps {
  disabled?: boolean;
  outlined?: boolean;
  color: keyof typeof chipColorOptions;
}

export interface IChipProps extends IChipCommonProps {
  children?: string;
}

export const Chip = ({ color, disabled, outlined, children }: IChipProps) => {
  const disabledTextColor = outlined
    ? allChipColors.disabled.outlined
    : allChipColors.disabled.text;

  const textColor = chipColorOptions[color].text;

  return (
    <StyledChipContainer color={color} disabled={disabled} outlined={outlined}>
      <Typography
        variant="chip"
        color={disabled ? disabledTextColor : textColor}
      >
        {children}
      </Typography>
    </StyledChipContainer>
  );
};
