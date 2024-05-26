const express = require("express");
const router = express.Router();
const quizController = require("../controller/quiz");
// const { verifyToken } = require("../middlewares/verifyToken");

router.post("/add", quizController.createQuiz);
// router.get("/getAll", storyController.getStories);
router.get("/getOne", quizController.getQuiz);
// router.put("/update", verifyToken, storyController.updateStoryDetailsById);
router.put("/update/impressions", quizController.updateImpressionsById);
// router.get("/getLikes", storyController.getLikesOnStory);
// router.put(
//   "/update/bookmark",
//   verifyToken,
//   storyController.updateBookmarkOnStory
// );
// router.get("/getBookmark", storyController.getBookmarkOnStory);
// router.get("/get/bookmarks", storyController.getBookmarkedStories);

module.exports = router;
