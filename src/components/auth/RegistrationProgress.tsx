
import React from 'react';

interface RegistrationProgressProps {
  currentStep: number;
  totalSteps: number;
}

const RegistrationProgress: React.FC<RegistrationProgressProps> = ({ currentStep, totalSteps }) => {
  return (
    <div className="flex justify-center space-x-2 mb-6">
      {Array.from({ length: totalSteps }, (_, index) => (
        <div
          key={index}
          className={`h-2 w-8 rounded ${
            index + 1 <= currentStep ? 'bg-primary' : 'bg-gray-200'
          }`}
        />
      ))}
    </div>
  );
};

export default RegistrationProgress;
