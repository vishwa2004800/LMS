const mongoose = require("mongoose");

const UserCourseProgressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
  completed: { type: Boolean, default: false },
  completionDate: { type: Date },
  certificateUrl: { type: String } // Store certificate link if generated
});

module.exports = mongoose.model("UserCourseProgress", UserCourseProgressSchema);
