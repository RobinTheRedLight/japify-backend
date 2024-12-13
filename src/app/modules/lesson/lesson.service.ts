import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import { ILesson } from './lesson.interface';
import { Lesson } from './lesson.model';

const createLessonIntoDB = async (payload: ILesson) => {
  const existingLesson = await Lesson.findOne({ number: payload.number });
  if (existingLesson) {
    throw new AppError(StatusCodes.CONFLICT, 'Lesson number already exists.');
  }
  const newLesson = await Lesson.create(payload);
  return newLesson;
};

const getAllLessonsFromDB = async () => {
  const lessons = await Lesson.find().sort({ number: 1 });
  return lessons;
};

const getAllLessonsByLessonNoFromDB = async (lessonNo: number) => {
  const lessons = await Lesson.find({ number: lessonNo });
  return lessons;
};

const getLessonByIdFromDB = async (id: string) => {
  const lesson = await Lesson.findById(id);
  if (!lesson) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Lesson not found.');
  }
  return lesson;
};

const updateLessonFromDB = async (payload: {
  id: string;
  updateData: Partial<ILesson>;
}) => {
  const { id, updateData } = payload;
  const lesson = await Lesson.findById(id);
  if (!lesson) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Lesson not found!');
  }

  if (updateData.number && updateData.number !== lesson.number) {
    const existingLesson = await Lesson.findOne({ number: updateData.number });
    if (existingLesson) {
      throw new AppError(StatusCodes.CONFLICT, 'Lesson number already exists.');
    }
  }

  const updatedLesson = await Lesson.findByIdAndUpdate(id, updateData, {
    new: true,
  });

  return updatedLesson;
};

const deleteLessonFromDB = async (id: string) => {
  const lesson = await Lesson.findById(id);
  if (!lesson) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Lesson not found!');
  }
  await Lesson.findByIdAndDelete(id);
  return;
};

export const LessonServices = {
  createLessonIntoDB,
  getAllLessonsFromDB,
  getLessonByIdFromDB,
  updateLessonFromDB,
  deleteLessonFromDB,
  getAllLessonsByLessonNoFromDB,
};
