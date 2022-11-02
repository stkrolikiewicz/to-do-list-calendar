import tasksList from "./tasks.json" assert { type: "json" };

// (() => {
//     )();
for (const task of tasksList) {
    const newTask = document.createElement("form");
    newTask.innerHTML = `
    <div class="task task-list">
        <input type="checkbox" />
        <p class="value"> ${task.value}</p>
        <p class="dueDate">${task.dueDate}</p>

        <p class="project">${task.project}</p>
        <p class="priority">${task.priority}</p>
    </div>
    `;
    document.getElementById("tasks-list").appendChild(newTask);
}

window.addTask = function () {
    document.getElementById("task-form").style.display = "flex";
    document.getElementById("addTaskBtn").style.display = "none";
};

// window.setTask = function () {
//     let task = {
//         value: document.getElementById("task-content").value,
//         dueDate: document.getElementById("task-date").value,
//         project: document.getElementById("task-project").value,
//         priority: document.getElementById("task-priority").value,
//     };
//     // tasksList.push(task);
//     document.forms[2].reset();
//     localStorage.setItem("tasksList", JSON.stringify(tasksList));
// };

window.removeTask = function (input) {
    document.getElementById("addTaskBtn").style.display = "block";
    document.getElementById("task-form").style.display = "none";
};

const tasksTab = document.getElementById("tasks-tab");
const calendarTab = document.getElementById("calendar-tab");
const sideBar = document.getElementById("sidebar");
const tasksContainer = document.getElementById("tasks-container");
const calendarContainer = document.getElementById("calendar-container");
const sideBar__trigger = document.getElementById("sidebar__trigger");

window.toDoList = function () {
    document.getElementById("tasks-container").style.display = "block";
    document.getElementById("calendar-container").style.display = "none";
    tasksTab.classList.remove("not-active");
    tasksTab.classList.add("active");
    calendarTab.classList.remove("active");
    calendarTab.classList.add("not-active");
};

window.calendar = function () {
    document.getElementById("tasks-container").style.display = "none";
    document.getElementById("calendar-container").style.display = "block";
    calendarTab.classList.remove("not-active");
    calendarTab.classList.add("active");
    tasksTab.classList.remove("active");
    tasksTab.classList.add("not-active");
};

window.moveSideBar = function () {
    if (sideBar.classList.contains("isHidden")) {
        // sideBar__trigger.innerText = "CLOSE";
        sideBar.classList.remove("isHidden");
    } else {
        // sideBar__trigger.innerText = "OPEN";
        sideBar.classList.add("isHidden");
    }
};
