import { FitnessLevel } from '../../enums/user/fitness-level.enum';
import { WorkoutDuration } from '../../enums/user/workout-duration.enum';
import { WorkoutType } from '../../enums/user/workout-type.enum';

export interface UserTrainingConfig {
  level: FitnessLevel;
  specialisation: WorkoutType[];
  duration: WorkoutDuration;
  caloriesPerDay: number;
  caloriesWantLost: number;
  trainingReadiness: boolean;
}
