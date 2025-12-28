export interface UserInput {
  skills: string;
  resources: string;
  interests: string;
  timeCommitment: string;
}

export interface BusinessPlan {
  businessName: string;
  tagline: string;
  conceptDescription: string;
  marketAnalysis: string;
  targetAudience: string;
  valueProposition: string;
  monetizationStrategy: string;
  requiredResources: string[];
  launchSteps: {
    step: string;
    description: string;
  }[];
  marketingChannels: string[];
  estimatedInitialCost: string;
  searchSources?: {
    title: string;
    uri: string;
  }[];
}

export enum AppStep {
  WELCOME,
  INPUT_SKILLS,
  INPUT_RESOURCES,
  INPUT_INTERESTS,
  INPUT_TIME,
  LOADING,
  RESULT,
  ERROR
}