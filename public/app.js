const API = "/api/students";

const studentId = document.getElementById("studentId");
const name = document.getElementById("name");
const email = document.getElementById("email");
const roll = document.getElementById("roll");
const s1 = document.getElementById("s1");
const s2 = document.getElementById("s2");
const s3 = document.getElementById("s3");
const submitBtn = document.getElementById("submitBtn");
const updateBtn = document.getElementById("updateBtn");
const studentForm = document.getElementById("studentForm");

// Load students
async function loadStudents() {
    const res = await fetch(API);
    const data = await res.json();

    const list = document.getElementById("studentList");
    list.innerHTML = "";

    data.forEach(std => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${std.name}</td> 
            <td>${std.rollNumber}</td>
            <td>${std.email}</td>
            <td>${std.marks.subject1}, ${std.marks.subject2}, ${std.marks.subject3}</td>
            <td>
                <button onclick="editStudent('${std._id}')">Edit</button>
                <button onclick="deleteStudent('${std._id}')">Delete</button>
            </td>
        `;
        list.appendChild(tr);
    });
}


// Add student
document.getElementById("studentForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    // Grab input values
    const student = {
        name: document.getElementById("name").value.trim(),
        email: document.getElementById("email").value.trim(),
        rollNumber: document.getElementById("roll").value.trim(),
        marks: {
            subject1: Number(document.getElementById("s1").value) || 0,
            subject2: Number(document.getElementById("s2").value) || 0,
            subject3: Number(document.getElementById("s3").value) || 0
        }
    };

    // Send POST request
    const res = await fetch("/api/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(student)
    });

    if (res.status === 400) {
        alert("Name, Email, and Roll Number are required!");
        return;
    }

    // Reload list and reset form
    loadStudents();
    document.getElementById("studentForm").reset();
});

// Delete student
async function deleteStudent(id) {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    loadStudents();
}

// Edit student → populate form
async function editStudent(id) {
    const res = await fetch(API);
    const students = await res.json();
    const std = students.find(s => s._id === id);

    studentId.value = std._id;
    name.value = std.name;
    email.value = std.email;
    roll.value = std.rollNumber;
    s1.value = std.marks.subject1;
    s2.value = std.marks.subject2;
    s3.value = std.marks.subject3;

    submitBtn.style.display = "none";
    updateBtn.style.display = "inline-block";
}


// Update student
updateBtn.addEventListener("click", async () => {
    const id = studentId.value;

    const updatedStudent = {
        name: name.value.trim(),
        email: email.value.trim(),
        rollNumber: roll.value.trim(),
        marks: {
            subject1: Number(s1.value) || 0,
            subject2: Number(s2.value) || 0,
            subject3: Number(s3.value) || 0
        }
    };

    await fetch(`${API}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedStudent)
    });

    loadStudents();
    studentForm.reset();
    submitBtn.style.display = "inline-block";
    updateBtn.style.display = "none";
});

// Initial load
loadStudents();
