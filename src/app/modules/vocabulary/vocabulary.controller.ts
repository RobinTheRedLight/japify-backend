import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { VocabularyServices } from './vocabulary.service';
import AppError from '../../errors/AppError';

const createVocabulary = catchAsync(async (req, res) => {
  const vocabularyData = req.body;
  const result = await VocabularyServices.createVocabularyIntoDB(vocabularyData);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Vocabulary created successfully',
    data: result,
  });
});

const getAllVocabularies = catchAsync(async (req, res) => {
  const { lessonNo } = req.query;

  let result;
  if (lessonNo) {
    const lessonNumber = Number(lessonNo);
    if (isNaN(lessonNumber)) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Invalid lesson number.');
    }
    result = await VocabularyServices.getVocabulariesByLessonNoFromDB(lessonNumber);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: `Vocabularies for lesson ${lessonNumber} retrieved successfully`,
      data: result,
    });
  } else {
    result = await VocabularyServices.getAllVocabulariesFromDB();
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Vocabularies retrieved successfully',
      data: result,
    });
  }
});

const getSingleVocabulary = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await VocabularyServices.getVocabularyByIdFromDB(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Vocabulary retrieved successfully',
    data: result,
  });
});

const updateVocabulary = catchAsync(async (req, res) => {
  const id = req.params.id;
  const updateData = req.body;
  const result = await VocabularyServices.updateVocabularyFromDB({ id, updateData });

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Vocabulary updated successfully',
    data: result,
  });
});

const deleteVocabulary = catchAsync(async (req, res) => {
  const id = req.params.id;
  await VocabularyServices.deleteVocabularyFromDB(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Vocabulary deleted successfully',
    data: null,
  });
});

export const VocabularyControllers = {
  createVocabulary,
  getAllVocabularies,
  getSingleVocabulary,
  updateVocabulary,
  deleteVocabulary,
};
