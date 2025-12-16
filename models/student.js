import mongoose from "mongoose";

const marksSchema = new mongoose.Schema({
  maths: Number,
  che: Number,
  phy: Number
}, { _id: false });

const studentSchema = new mongoose.Schema({
  name: String,
  email: String,
  rollNumber: String,
  marks: marksSchema
});

export default mongoose.model("Student", studentSchema);
