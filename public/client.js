const API = "/api/employees";
const tbody = document.getElementById("empBody");
const modal = document.getElementById("modal");
const form = document.getElementById("empForm");
const modalTitle = document.getElementById("modalTitle");

document.getElementById("addBtn").onclick = () => openModal();
document.getElementById("cancelBtn").onclick = () => closeModal();

function openModal(emp = null) {
  modal.classList.remove("hidden");
  if (emp) {
    modalTitle.textContent = "Edit Employee";
    document.getElementById("empId").value = emp._id;
    document.getElementById("name").value = emp.name;
    document.getElementById("designation").value = emp.designation;
    document.getElementById("salary").value = emp.salary;
  } else {
    modalTitle.textContent = "Add Employee";
    form.reset();
    document.getElementById("empId").value = "";
  }
}

function closeModal() {
  modal.classList.add("hidden");
}

async function loadEmployees() {
  try {
    const res = await fetch(API);
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Failed to load");
    tbody.innerHTML = "";
    data.forEach((emp, i) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
      <td>${emp.empNo || "-"}</td>
      <td>${emp.name}</td>
      <td>${emp.designation}</td>
      <td>${emp.salary}</td>
      <td>
        <button class="editBtn">Edit</button>
        <button class="deleteBtn">Delete</button>
      </td>
    `;
      tr.querySelector(".editBtn").onclick = () => openModal(emp);
      tr.querySelector(".deleteBtn").onclick = () => deleteEmployee(emp._id);
      tbody.appendChild(tr);
    });
  } catch (err) {
    console.error("Error loading employees:", err);
    tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; color:red;">Failed to load employees: ${err.message}</td></tr>`;
  }
}

form.onsubmit = async (e) => {
  e.preventDefault();
  const id = document.getElementById("empId").value;
  const body = {
    name: document.getElementById("name").value,
    designation: document.getElementById("designation").value,
    salary: parseFloat(document.getElementById("salary").value),
  };
  if (id) {
    const res = await fetch(`${API}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const err = await res.json();
      alert(err.error || "Error updating employee");
      return;
    }
  } else {
    const res = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const err = await res.json();
      alert(err.error || "Error adding employee");
      return;
    }
  }
  closeModal();
  loadEmployees();
};

async function deleteEmployee(id) {
  if (!confirm("Delete this employee?")) return;
  try {
    const res = await fetch(`${API}/${id}`, { method: "DELETE" });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to delete");
    }
    alert("Employee deleted successfully!");
    loadEmployees();
  } catch (err) {
    alert(err.message);
  }
}

loadEmployees();
