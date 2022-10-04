function addTask() {
    const newTask = document.createElement("form");
    newTask.className = "task";
    newTask.innerHTML = `
    <div class="row">
        <div class="col-12">
            <label>
                <input type="checkbox" name="task-chekbox" id="task-checkbox">
                <input type="text" name="task-content" id="task-content">
            </label>
            <input type="button" value="-" onclick="removeTask(this)" />
        </div>
    </div>
    `;
    document.getElementById("tasks-container").appendChild(newTask);
}

function removeTask(input) {
    document
        .getElementById("tasks-container")
        .removeChild(input.parentNode.parentNode.parentNode);
}
