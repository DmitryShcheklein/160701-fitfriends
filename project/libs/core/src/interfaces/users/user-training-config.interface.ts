import { FitnessLevel, WorkoutType, WorkoutDuration } from "@project/enums";


export interface UserTrainingConfig {
  level: FitnessLevel;
  specialisation: WorkoutType[];
  duration: WorkoutDuration;
  caloriesPerDay: number;
  caloriesWantLost: number;
  trainingReadiness: boolean;
}
