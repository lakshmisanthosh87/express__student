import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    rollNumber: { type: String, required: true },
    marks: {
        subject1: { type: Number, default: 0 },
        subject2: { type: Number, default: 0 },
        subject3: { type: Number, default: 0 }
    }
});

export default mongoose.model("Student", studentSchema);
