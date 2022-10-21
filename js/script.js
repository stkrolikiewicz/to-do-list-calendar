import tasksList from "./tasks.json" assert { type: "json" };

// (() => {
//     )();
for (const task of tasksList) {
    const newTask = document.createElement("form");
    newTask.className = "task";
    newTask.innerHTML = `
    <div class="task task-list">
        <input type="checkbox" />
        <p class="value"> ${task.value}</p>
        <p class="dueDate">due date: ${task.dueDate}</p>

        <p class="project">project:  ${task.project}</p>
        <p class="priority">priority: ${task.priority}</p>
    </div>
    `;
    document.getElementById("tasks-list").appendChild(newTask);
}

window.addTask = function () {
    document.getElementById("task-form").style.display = "flex";
    document.getElementById("addTaskBtn").style.display = "none";
};

window.setTask = function () {
    let task = {
        value: document.getElementById("task-content").value,
        dueDate: document.getElementById("task-date").value,
        project: document.getElementById("task-project").value,
        priority: document.getElementById("task-priority").value,
    };
    // tasksList.push(task);
    document.forms[2].reset();
    localStorage.setItem("tasksList", JSON.stringify(tasksList));
};

window.removeTask = function (input) {
    document.getElementById("addTaskBtn").style.display = "block";
    document.getElementById("task-form").style.display = "none";
};
