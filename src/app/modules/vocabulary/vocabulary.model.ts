import { Schema, model } from 'mongoose';
import { IVocabulary } from './vocabulary.interface';

const vocabularySchema = new Schema<IVocabulary>(
  {
    word: {
      type: String,
      required: true,
    },
    pronunciation: {
      type: String,
      required: true,
    },
    meaning: {
      type: String,
      required: true,
    },
    whenToSay: {
      type: String,
      required: true,
    },
    lessonNo: {
      type: Number,
      required: true,
      ref: 'Lesson',
    },
    adminEmail: {
      type: String,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  },
);

export const Vocabulary = model<IVocabulary>('Vocabulary', vocabularySchema);
