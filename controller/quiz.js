const Quiz = require("../models/quiz");

const createQuiz = async (req, res, next) => {
  try {
    const {
      quizName,
      isPoll,
      optionType,
      timer,
      ques1,
      ques2,
      ques3,
      ques4,
      ques5,
      email,
    } = req.body;

    if (!quizName || !isPoll || !ques1 || !optionType) {
      return res.status(400).json({
        message: "Bad Request",
      });
    }

    const quizDetails = new Quiz({
      quizName,
      isPoll,
      optionType,
      timer,
      ques1,
      ques2,
      ques3,
      ques4,
      ques5,
      impressions: 0,
      email,
    });

    await quizDetails.save();

    const quiz = await Quiz.find({}).sort({ _id: -1 }).limit(1);

    // console.log(quiz[0]);
    res.json({ message: "Quiz created successfully", quizId: quiz[0]._id });
  } catch (error) {
    next(error);
  }
};

const updateImpressionsById = async (req, res, next) => {
  try {
    const quizId = req.query.id || "";

    console.log(quizId);

    if (!quizId) {
      return res.status(400).json({
        message: "Bad Request",
      });
    }

    const quizDetails = await Quiz.findOne({
      _id: quizId,
    });

    if (!quizDetails) {
      return res.status(400).json({
        message: "Bad request",
      });
    }

    let impressions = quizDetails?.impressions;

    await Quiz.updateOne(
      { _id: quizId },
      {
        $set: {
          quizName: quizDetails?.quizName,
          isPoll: quizDetails?.isPoll,
          optionType: quizDetails?.optionType,
          timer: quizDetails?.timer,
          ques1: quizDetails?.ques1,
          ques2: quizDetails?.ques2,
          ques3: quizDetails?.ques3,
          ques4: quizDetails?.ques4,
          ques5: quizDetails?.ques5,
          impressions: impressions + 1,
        },
      }
    );

    res.json({ message: "Impressions updated successfully" });
  } catch (error) {
    next(error);
  }
};

const updateQuizDetailsById = async (req, res, next) => {
  try {
    const quizId = req.query.id;
    const quizAnswers = req.body;

    console.log(quizId);
    console.log(quizAnswers);

    if (!quizId) {
      return res.status(400).json({
        message: "Bad Request",
      });
    }

    const quizDetails = await Quiz.findOne({
      _id: quizId,
    });

    if (!quizDetails) {
      return res.status(400).json({
        message: "Bad request",
      });
    }

    console.log(quizDetails);

    let ques1 = quizDetails.ques1;
    ques1[2] = quizAnswers[0];
    console.log(ques1);

    // await Quiz.updateOne(
    //   { _id: quizId },
    //   {
    //     $set: {
    //       quizName: quizDetails.quizName,
    //       isPoll: quizDetails.isPoll,
    //       optionType: quizDetails.optionType,
    //       timer: quizDetails.timer,
    //       ques1: ques1[],
    //       ques2: quizDetails.ques2,
    //       ques3: quizDetails.ques3,
    //       ques4: quizDetails.ques4,
    //       ques5: quizDetails.ques5,
    //       email: quizDetails.email,
    //     },
    //   }
    // );

    res.json({ message: "Quiz updated successfully" });
  } catch (error) {
    next(error);
  }
};

const getQuiz = async (req, res, next) => {
  try {
    const quizId = req.query.id || "";

    const quizDetails = await Quiz.findById(quizId);

    if (!quizDetails) {
      return res.status(400).json({
        message: "Bad request",
      });
    }

    console.log(quizDetails);

    res.json({ data: quizDetails });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createQuiz,
  updateImpressionsById,
  updateQuizDetailsById,
  getQuiz,
};
