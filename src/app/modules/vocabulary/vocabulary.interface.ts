import { Document } from 'mongoose';

export interface IVocabulary extends Document {
  word: string;
  pronunciation: string;
  meaning: string;
  whenToSay: string;
  lessonNo: number;
  adminEmail: string;
}
