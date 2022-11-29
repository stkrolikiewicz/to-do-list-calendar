function loadTasks() {
    let req = new XMLHttpRequest();
    req.open("GET", "/files/tasks.json", true);

    req.onload = function () {
        if (req.status == 200) {
            const tasksList = JSON.parse(this.responseText);

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
        } else {
            console.log(`Error ${req.status}`);
        }
    };

    req.send();
}

window.addTask = () => {
    document.getElementById("task-form").style.display = "flex";
    document.getElementById("addTaskBtn").style.display = "none";
    document.getElementById("task-form").addEventListener("submit", setTask());
};

function setTask(e) {
    e.preventDefault();

    let req = new XMLHttpRequest();

    req.open("GET", "/files/tasks.json", true);

    req.onload = function () {
        console.log("Set Task");
    };
    // const task = {};
    // let a = document.getElementById("task-content").value;
    // task.value = document.getElementById("task-content").value;
    // task.dueDate = document.getElementById("task-date").value;
    // task.project = document.getElementById("task-project").value;
    // task.priority = document.getElementById("task-priority").value;
    // // tasksList.push(task);
    // document.forms[2].reset();
    // localStorage.setItem("tasksList", JSON.stringify(tasksList));
    req.send();
}

window.removeTask = (input) => {
    document.getElementById("addTaskBtn").style.display = "block";
    document.getElementById("task-form").style.display = "none";
};

const tasksTab = document.getElementById("tasks-tab");
const calendarTab = document.getElementById("calendar-tab");
const sideBar = document.getElementById("sidebar");
const tasksContainer = document.getElementById("tasks-container");
const calendarContainer = document.getElementById("calendar-container");
const sideBar__trigger = document.getElementById("sidebar__trigger");

window.toDoList = () => {
    document.getElementById("tasks-container").style.display = "block";
    document.getElementById("calendar-container").style.display = "none";
    tasksTab.classList.remove("not-active");
    tasksTab.classList.add("active");
    calendarTab.classList.remove("active");
    calendarTab.classList.add("not-active");
};

window.calendar = () => {
    document.getElementById("tasks-container").style.display = "none";
    document.getElementById("calendar-container").style.display = "block";
    calendarTab.classList.remove("not-active");
    calendarTab.classList.add("active");
    tasksTab.classList.remove("active");
    tasksTab.classList.add("not-active");
};

window.moveSideBar = () => {
    if (sideBar.classList.contains("isHidden")) {
        // sideBar__trigger.innerText = "CLOSE";
        sideBar.classList.remove("isHidden");
    } else {
        // sideBar__trigger.innerText = "OPEN";
        sideBar.classList.add("isHidden");
    }
};

// document.getElementById("button").addEventListener("click", loadText);

function loadText() {
    // Create XHR Object
    let xhr = new XMLHttpRequest();
    // OPEN - type, url/file, async
    xhr.open("GET", "/files/sample.txt", true);

    console.log("READYSTATE: ", xhr.readyState);

    // OPTIONAL - used for loaders

    xhr.onprogress = function () {
        console.log("READYSTATE: ", xhr.readyState);
    };

    xhr.onload = function () {
        console.log("READYSTATE: ", xhr.readyState);
        if (xhr.status == 200) {
            console.log(this.responseText);
            document.getElementById("text").innerText = this.responseText;
        } else if (xhr.status == 404) {
            console.log(`Error ${xhr.status} file not found...`);
        }
    };

    xhr.onerror = function () {
        console.log("Request Error...", this.status);
    };

    // xhr.onreadystatechange = function () {
    //     console.log("READYSTATE: ", xhr.readyState);

    //     if (this.readyState == 4 && this.status == 200) {
    //         console.log(this.responseText);
    //     }
    // };

    // Sends request
    xhr.send();
}

loadTasks();
