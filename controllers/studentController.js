import Student from "../models/student.js";

// CREATE student
export const createStudent = async (req, res, next) => {
    try {
        const { name, email, rollNumber, marks } = req.body;

        if (!name || !email || !rollNumber) {
            const err = new Error("Name, email and rollNumber are required");
            err.status = 400;
            throw err;
        }

        const student = await Student.create({
            name,
            email,
            rollNumber,
            marks: {
                subject1: Number(marks?.subject1 || 0),
                subject2: Number(marks?.subject2 || 0),
                subject3: Number(marks?.subject3 || 0)
            }
        });

        res.status(201).json(student);
    } catch (error) {
        next(error);
    }
};

// GET all students
export const getStudents = async (req, res, next) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (error) {
        next(error);
    }
};

// UPDATE student
export const updateStudent = async (req, res, next) => {
    try {
        const { name, email, rollNumber, marks } = req.body;

        const updated = await Student.findByIdAndUpdate(
            req.params.id,
            {
                name,
                email,
                rollNumber,
                marks: {
                    subject1: Number(marks?.subject1 || 0),
                    subject2: Number(marks?.subject2 || 0),
                    subject3: Number(marks?.subject3 || 0)
                }
            },
            { new: true }
        );

        res.json(updated);
    } catch (error) {
        next(error);
    }
};

// DELETE student
export const deleteStudent = async (req, res, next) => {
    try {
        await Student.findByIdAndDelete(req.params.id);
        res.json({ message: "Student deleted" });
    } catch (error) {
        next(error);
    }
};
