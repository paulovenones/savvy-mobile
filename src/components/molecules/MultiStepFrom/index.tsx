import React from "react";
import { ProgressBar } from "../../atoms/ProgressBar";
import { Margin } from "../../atoms/Margin";
import { Flex } from "../../atoms/Flex";
import { KeyboardScrollView } from "../../atoms/KeyboardScrollView";

interface IMultiStepFormProps {
  children: React.ReactNode;
  formCompletition: boolean[];
}

export const MultiStepForm = ({
  children,
  formCompletition,
}: IMultiStepFormProps) => {
  const MIN_STEP_PROGRESS = 0.08;
  const MIN_LAST_STEP_ADVANCE = 0.15;
  const DEFAULT_LAST_STEP_PROGRESS = 0.7;

  const stepsQuantity = React.Children.count(children);

  const currentStep = formCompletition.findIndex((isCompleted) => !isCompleted);

  const isLastStep = currentStep === formCompletition.length - 1;

  let calculatedProgress = 0;

  if (isLastStep) {
    const previousStep = currentStep - 1;
    const previousStepProgress = previousStep / (stepsQuantity - 1) || 0;

    calculatedProgress = Math.max(
      previousStepProgress + MIN_LAST_STEP_ADVANCE,
      DEFAULT_LAST_STEP_PROGRESS
    );
  } else {
    calculatedProgress = currentStep / (stepsQuantity - 1) || 0;
  }

  let progressPercentage = Math.max(
    calculatedProgress + MIN_STEP_PROGRESS,
    MIN_STEP_PROGRESS
  );

  const renderStepContent = () => {
    const currentStepContent = React.Children.toArray(children)[currentStep];

    return currentStepContent || null;
  };

  return (
    <Flex alignItems="center">
      <Margin mb={16}>
        <ProgressBar progress={progressPercentage} />
      </Margin>
      <KeyboardScrollView>{renderStepContent()}</KeyboardScrollView>
    </Flex>
  );
};
