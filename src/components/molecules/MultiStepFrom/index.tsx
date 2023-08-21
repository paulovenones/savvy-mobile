import React, { useState } from "react";
import { View } from "react-native";
import { ProgressBar } from "../../atoms/ProgressBar";
import { ContentView } from "../../templates/ContentView";
import { Margin } from "../../atoms/Margin";

interface IMultiStepFormProps {
  children: React.ReactNode;
  formCompletition: boolean[];
}

export const MultiStepForm = ({
  children,
  formCompletition,
}: IMultiStepFormProps) => {
  const MIN_STEP_PROGRESS = 0.08;

  const stepsQuantity = React.Children.count(children);

  const currentStep = formCompletition.findIndex((isCompleted) => !isCompleted);

  const calculatedProgress = currentStep / (stepsQuantity - 1) || 0;

  const progressPercentage = Math.max(
    calculatedProgress + MIN_STEP_PROGRESS,
    MIN_STEP_PROGRESS
  );

  const renderStepContent = () => {
    const currentStepContent = React.Children.toArray(children)[currentStep];

    return currentStepContent || null;
  };

  return (
    <ContentView>
      <Margin mb={16}>
        <ProgressBar progress={progressPercentage} />
      </Margin>
      {renderStepContent()}
    </ContentView>
  );
};
