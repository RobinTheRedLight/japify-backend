import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { LessonServices } from './lesson.service';
import AppError from '../../errors/AppError';

const createLesson = catchAsync(async (req, res) => {
  const lessonData = req.body;
  const result = await LessonServices.createLessonIntoDB(lessonData);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Lesson created successfully',
    data: result,
  });
});

const getAllLessons = catchAsync(async (req, res) => {
  const { lessonNo } = req.query;
  let result;
  if (lessonNo) {
    const lessonNumber = Number(lessonNo);
    if (isNaN(lessonNumber)) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Invalid lesson number.');
    }

    result = await LessonServices.getAllLessonsByLessonNoFromDB(lessonNumber);

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Lessons retrieved successfully',
      data: result,
    });
  } else {
    result = await LessonServices.getAllLessonsFromDB();
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Lessons retrieved successfully',
      data: result,
    });
  }
});

const getSingleLesson = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await LessonServices.getLessonByIdFromDB(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Lesson retrieved successfully',
    data: result,
  });
});

const updateLesson = catchAsync(async (req, res) => {
  const id = req.params.id;
  const updateData = req.body;
  const result = await LessonServices.updateLessonFromDB({ id, updateData });

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Lesson updated successfully',
    data: result,
  });
});

const deleteLesson = catchAsync(async (req, res) => {
  const id = req.params.id;
  await LessonServices.deleteLessonFromDB(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Lesson deleted successfully',
    data: null,
  });
});

export const LessonControllers = {
  createLesson,
  getAllLessons,
  getSingleLesson,
  updateLesson,
  deleteLesson,
};
