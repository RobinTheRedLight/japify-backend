import { Schema, model } from 'mongoose';
import { ILesson } from './lesson.interface';

const lessonSchema = new Schema<ILesson>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    number: {
      type: Number,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Lesson = model<ILesson>('Lesson', lessonSchema);
