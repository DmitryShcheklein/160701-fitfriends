import { Entity, StorableEntity, Training } from '@project/core';
import {
  FitnessLevel,
  UserGender,
  WorkoutDuration,
  WorkoutType,
} from '@project/enums';

export class TrainingEntity extends Entity implements StorableEntity<Training> {
  public createdAt?: Date;
  public name!: string;
  public backgroundImage!: string;
  public level!: FitnessLevel;
  public trainingType!: WorkoutType;
  public duration!: WorkoutDuration;
  public price!: number;
  public calories!: number;
  public description!: string;
  public gender!: UserGender;
  public video!: string;
  public rating: number;
  public trainerId!: string;
  public specialOffer: boolean;

  constructor(training?: Training) {
    super();
    this.populate(training);
  }

  public populate(training?: Training) {
    if (!training) {
      return;
    }

    this.id = training.id;
    this.createdAt = training.createdAt;

    this.name = training.name;
    this.backgroundImage = training.backgroundImage;
    this.level = training.level;
    this.trainingType = training.trainingType;
    this.duration = training.duration;
    this.price = training.price;
    this.calories = training.calories;
    this.description = training.description;
    this.gender = training.gender;
    this.video = training.video;
    this.rating = training.rating;
    this.trainerId = training.trainerId;
    this.specialOffer = training.specialOffer;
  }

  public toPOJO(): Training {
    return {
      id: this.id,
      createdAt: this.createdAt,

      name: this.name,
      backgroundImage: this.backgroundImage,
      level: this.level,
      trainingType: this.trainingType,
      duration: this.duration,
      price: this.price,
      calories: this.calories,
      description: this.description,
      gender: this.gender,
      video: this.video,
      rating: this.rating,
      trainerId: this.trainerId,
      specialOffer: this.specialOffer,
    };
  }
}
