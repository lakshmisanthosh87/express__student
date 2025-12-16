if (!localStorage.getItem("token") || !localStorage.getItem("userId")) {
  window.location.href = "login.html";
}
function logout() {
  localStorage.removeItem("token");
  window.location.href = "login.html";
}
const API_URL = "/api/students";
let editingId = null;

const form = document.getElementById("studentForm");
const tableBody = document.querySelector("#studentsTable tbody");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const rollInput = document.getElementById("rollNumber");
const mathsInput = document.getElementById("maths");
const cheInput = document.getElementById("che");
const phyInput = document.getElementById("phy");

//load to table
function loadStudents() {
  const token = localStorage.getItem("token");
  fetch(API_URL, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      tableBody.innerHTML = "";

      data.forEach((s) => {
        tableBody.innerHTML += `
        <tr>
            <td>${s.name}</td>
            <td>${s.email}</td>
            <td>${s.rollNumber}</td>
            <td>
                Maths: ${s.marks?.maths ?? ""}, 
                Chemistry: ${s.marks?.che ?? ""}, 
                Physics: ${s.marks?.phy ?? ""}
            </td>
            <td>
                <button onclick="editStudent('${s._id}')">Edit</button>
                <button onclick="deleteStudent('${s._id}')">Delete</button>
            </td>
        </tr>
        `;
      });
    });
}


//update
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const data = {
    name: nameInput.value,
    email: emailInput.value,
    rollNumber: rollInput.value,
    marks: {
      maths: Number(mathsInput.value),
      che: Number(cheInput.value),
      phy: Number(phyInput.value)
    }
  };

  if (editingId) {
    const token = localStorage.getItem("token");
    fetch(`${API_URL}/${editingId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(data)
    })
      .then(() => {
        editingId = null;
        form.reset();
        loadStudents();
      });

  } else {
    const token = localStorage.getItem("token");
    fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(data)
    })
      .then(() => {
        form.reset();
        loadStudents();
      });
  }
});


//edit
function editStudent(id) {
  fetch(API_URL)
    .then(res => res.json())
    .then(students => {
      const student = students.find(s => s._id === id);

      if (student) {
        nameInput.value = student.name;
        emailInput.value = student.email;
        rollInput.value = student.rollNumber;

        mathsInput.value = student.marks?.maths ?? "";
        cheInput.value = student.marks?.che ?? "";
        phyInput.value = student.marks?.phy ?? "";

        editingId = id;
      }
    });
}


//delete
function deleteStudent(id) {
  const token = localStorage.getItem("token");
  fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
    .then(() => loadStudents());
}

const userId = localStorage.getItem("userId");

if (userId) {
  const token = localStorage.getItem("token");
  fetch(`/api/auth/profile/${userId}`, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
    .then(res => {
      if (!res.ok) throw new Error("User not found");
      return res.json();
    })
    .then(user => {
      // If user.image is available, use it.
      // Otherwise, use UI Avatars with the first letter of the user's name (or U if missing)
      const name = user.name || "User";
      const firstLetter = name.trim().charAt(0).toUpperCase() || "U";
      const avatarUrl = user.image
        ? user.image
        : `https://ui-avatars.com/api/?name=${encodeURIComponent(firstLetter)}&background=aaa&color=fff`;
      document.getElementById("profileImg").src = avatarUrl;
      document.getElementById("userName").innerText = name || "No Name";
      document.getElementById("userEmail").innerText = user.email || "No Email";
    })
    .catch(() => {
      document.getElementById("profileImg").src = "https://ui-avatars.com/api/?name=U&background=aaa&color=fff";
      document.getElementById("userName").innerText = "Unknown User";
      document.getElementById("userEmail").innerText = "";
    });
} else {
  document.getElementById("profileImg").src = "https://ui-avatars.com/api/?name=U&background=aaa&color=fff";
  document.getElementById("userName").innerText = "Unknown User";
  document.getElementById("userEmail").innerText = "";
}

loadStudents();
