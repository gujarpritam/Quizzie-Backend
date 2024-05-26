const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema(
  {
    quizName: {
      type: String,
      required: true,
    },
    isPoll: {
      type: String,
      required: true,
    },
    optionType: {
      type: String,
    },
    timer: {
      type: String,
    },
    ques1: {
      type: Array,
      required: true,
    },
    ques2: {
      type: Array,
    },
    ques3: {
      type: Array,
    },
    ques4: {
      type: Array,
    },
    ques5: {
      type: Array,
    },
    impressions: {
      type: Number,
    },
    email: {
      type: String,
      required: true,
    },
  },
  { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } }
);

module.exports = mongoose.model("Quiz", quizSchema);
