import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import { IVocabulary } from './vocabulary.interface';
import { Vocabulary } from './vocabulary.model';

const createVocabularyIntoDB = async (payload: IVocabulary) => {
  const existingVocabulary = await Vocabulary.findOne({
    word: payload.word,
    lessonNo: payload.lessonNo,
  });
  if (existingVocabulary) {
    throw new AppError(StatusCodes.CONFLICT, 'Vocabulary already exists in this lesson.');
  }
  const newVocabulary = await Vocabulary.create(payload);
  return newVocabulary;
};

const getAllVocabulariesFromDB = async () => {
  const vocabularies = await Vocabulary.find().sort({ lessonNo: 1, word: 1 });
  return vocabularies;
};

const getVocabularyByIdFromDB = async (id: string) => {
  const vocabulary = await Vocabulary.findById(id);
  if (!vocabulary) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Vocabulary not found.');
  }
  return vocabulary;
};

const updateVocabularyFromDB = async (payload: { id: string; updateData: Partial<IVocabulary> }) => {
  const { id, updateData } = payload;
  const vocabulary = await Vocabulary.findById(id);
  if (!vocabulary) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Vocabulary not found!');
  }

  if ((updateData.word || updateData.lessonNo) && (updateData.word !== vocabulary.word || updateData.lessonNo !== vocabulary.lessonNo)) {
    const existingVocabulary = await Vocabulary.findOne({
      word: updateData.word || vocabulary.word,
      lessonNo: updateData.lessonNo || vocabulary.lessonNo,
      _id: { $ne: id },
    });
    if (existingVocabulary) {
      throw new AppError(StatusCodes.CONFLICT, 'Vocabulary already exists in this lesson.');
    }
  }

  const updatedVocabulary = await Vocabulary.findByIdAndUpdate(id, updateData, {
    new: true,
  });

  return updatedVocabulary;
};

const deleteVocabularyFromDB = async (id: string) => {
  const vocabulary = await Vocabulary.findById(id);
  if (!vocabulary) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Vocabulary not found!');
  }
  await Vocabulary.findByIdAndDelete(id);
  return;
};

const getVocabulariesByLessonNoFromDB = async (lessonNo: number) => {
  const vocabularies = await Vocabulary.find({ lessonNo }).sort({ word: 1 });
  return vocabularies;
};

export const VocabularyServices = {
  createVocabularyIntoDB,
  getAllVocabulariesFromDB,
  getVocabularyByIdFromDB,
  updateVocabularyFromDB,
  deleteVocabularyFromDB,
  getVocabulariesByLessonNoFromDB,
};
