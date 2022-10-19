import tasksList from "./tasks.json" assert { type: "json" };

(() => {
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
        document.getElementById("tasks-container").appendChild(newTask);
    }
})();

function addTask() {
    alert("New taks added!");
    const newTask = document.createElement("form");
    newTask.className = "task";
    newTask.innerHTML = `
    <div class="task">
        <form>
            <label for="task-content">Type a name of task</label>
            <input
                type="text"
                name="task-content"
                id="task-content"
                class="task-input input-item"
            />
            <label for="task-date">Set a due date</label>
            <input
                type="date"
                name="task-date"
                id="task-date"
                class="task-input input-item"
            />
            <input
                type="button"
                value="cancel"
                class="removeTask"
            />
            <input type="submit" value="Add task" />
        </form>
    </div>
    `;
    document.getElementById("tasks-container").appendChild(newTask);
}

function removeTask(input) {
    document
        .getElementById("tasks-container")
        .removeChild(input.parentNode.parentNode.parentNode);
}

document.getElementById("addTaskBtn").addEventListener("click", addTask);
