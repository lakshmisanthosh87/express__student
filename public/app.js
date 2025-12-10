const apiURL = "/api/students";

const form = document.getElementById("studentForm");
const tbody = document.getElementById("studentsBody");
const studentId = document.getElementById("studentId");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const rollInput = document.getElementById("rollNumber");
const s1 = document.getElementById("subject1");
const s2 = document.getElementById("subject2");
const s3 = document.getElementById("subject3");

// Load all students
async function loadStudents() {
  const res = await fetch(apiURL);
  const data = await res.json();

  tbody.innerHTML = "";
  data.forEach(st => {
    tbody.innerHTML += `
      <tr>
        <td>${st.name}</td>
        <td>${st.email}</td>
        <td>${st.rollNumber}</td>
        <td>${st.marks.subject1}, ${st.marks.subject2}, ${st.marks.subject3}</td>
        <td>
          <button class="edit" onclick="editStudent('${st._id}')">Edit</button>
          <button class="delete" onclick="deleteStudent('${st._id}')">Delete</button>
        </td>
      </tr>
    `;
  });
}

// Add / Update Student
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const student = {
    name: nameInput.value,
    email: emailInput.value,
    rollNumber: rollInput.value,
    marks: {
      subject1: parseInt(s1.value),
      subject2: parseInt(s2.value),
      subject3: parseInt(s3.value)
    }
  };

  if (studentId.value) {
    await fetch(`${apiURL}/${studentId.value}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(student)
    });
  } else {
    await fetch(apiURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(student)
    });
  }

  form.reset();
  studentId.value = "";
  loadStudents();
});

// Edit Student
window.editStudent = async (id) => {
  const res = await fetch(`${apiURL}/${id}`);
  const st = await res.json();

  studentId.value = st._id;
  nameInput.value = st.name;
  emailInput.value = st.email;
  rollInput.value = st.rollNumber;
  s1.value = st.marks.subject1;
  s2.value = st.marks.subject2;
  s3.value = st.marks.subject3;
};

// Delete Student
window.deleteStudent = async (id) => {
  await fetch(`${apiURL}/${id}`, { method: "DELETE" });
  loadStudents();
};

// Init
loadStudents();
