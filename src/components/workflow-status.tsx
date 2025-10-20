import React from 'react';
import { Gear, CheckCircle, Clock, XCircle } from '@phosphor-icons/react';

interface WorkflowStep {
  id: string;
  name: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  timestamp?: Date;
}

interface WorkflowStatusProps {
  steps: WorkflowStep[];
  currentStep?: string;
  isVisible: boolean;
}

export const WorkflowStatus: React.FC<WorkflowStatusProps> = ({ 
  steps, 
  currentStep, 
  isVisible 
}) => {
  if (!isVisible || steps.length === 0) return null;

  const getStepIcon = (status: string) => {
    switch (status) {
      case 'running':
        return <Gear size={16} className="animate-spin text-blue-500" />;
      case 'completed':
        return <CheckCircle size={16} className="text-green-500" />;
      case 'failed':
        return <XCircle size={16} className="text-red-500" />;
      default:
        return <Clock size={16} className="text-gray-400" />;
    }
  };

  const getStepColor = (status: string) => {
    switch (status) {
      case 'running':
        return 'border-blue-500 bg-blue-50 dark:bg-blue-900/20';
      case 'completed':
        return 'border-green-500 bg-green-50 dark:bg-green-900/20';
      case 'failed':
        return 'border-red-500 bg-red-50 dark:bg-red-900/20';
      default:
        return 'border-gray-300 bg-gray-50 dark:bg-gray-800';
    }
  };

  return (
    <div className="mb-4 p-3 border border-neutral-200 dark:border-neutral-700 rounded-lg bg-neutral-50 dark:bg-neutral-800">
      <div className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2 flex items-center gap-2">
        <Gear size={16} />
        Workflow Status
      </div>
      
      <div className="space-y-2">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center gap-3">
            <div className="flex items-center justify-center w-6 h-6">
              {getStepIcon(step.status)}
            </div>
            
            <div className={`flex-1 p-2 rounded border text-sm ${getStepColor(step.status)}`}>
              <div className="font-medium">{step.name}</div>
              {step.timestamp && (
                <div className="text-xs text-gray-500 mt-1">
                  {step.timestamp.toLocaleTimeString()}
                </div>
              )}
            </div>
            
            {index < steps.length - 1 && (
              <div className="w-px h-4 bg-gray-300 dark:bg-gray-600 ml-3" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};