var tasks = [];
const URL = "http://localhost:3000";
document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = `/login`;
  } else {
    handleFetch();
  }
});

function generateTaskList(data) {
  const taskList = document.getElementById("task-list");
  taskList.textContent = "";

  data.forEach((task) => {
    const li = document.createElement("li");
    li.textContent = task.title;
    li.className = `${task.completed ? "checked" : ""}`;

    var span = document.createElement("span");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);

    li.onclick = (e) => {
      e.stopPropagation();
      handleUpdate(task.id, !task.completed).then((value) => {
        e.target.classList.toggle("checked");
      });
    };
    span.onclick = (e) => {
      e.stopPropagation();
     handleDelete(task.id).then((value) => {
        li.style.display = "none";
      });
    };

    li.appendChild(span);
    taskList.appendChild(li);
  });
}

function newElement() {
  var title = document.getElementById("taskInput").value;

  if (title === "") {
    alert("É necessário adicionar um titulo a tarefa!");
  } else {
    handleCreate(title).then(() => {
      handleFetch();
    });
  }
  document.getElementById("taskInput").value = "";
  generateTaskList();
}

function displayOutput(message) {
  alert(message);
}
async function handleCreate(title) {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(URL + "/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
      body: JSON.stringify({ title: title }),
    });
    const result = await response.json();
    // displayOutput(JSON.stringify(result));
  } catch (error) {
    displayOutput("Error creating tasks");
  }
}

async function handleFetch() {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(URL + "/tasks", {
      headers: { authorization: token },
    });
    const data = await response.json();

    generateTaskList(data);
  } catch (error) {
    displayOutput(error);
  }
}

async function handleUpdate(id, check) {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(URL + "/tasks/" + id + "/check", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
      body: JSON.stringify({
        completed: check,
      }),
    });
    const updatedTask = await response.json();
    //displayOutput(JSON.stringify(updatedTask));
  } catch (error) {
    displayOutput("Error updating tasks");
  }
}

async function handleDelete(id) {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(URL + "/tasks/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    });
    const deleteResult = await response.json();
    //displayOutput(JSON.stringify(deleteResult));
  } catch (error) {
    displayOutput("Error deleting task");
  }
}
