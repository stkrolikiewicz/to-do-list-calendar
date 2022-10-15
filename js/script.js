function addTask() {
    const newTask = document.createElement("form");
    newTask.className = "task";
    newTask.innerHTML = `
    <div class="row">
        <div class="col-12">
            <label>
                <input type="checkbox" name="task-chekbox" id="task-checkbox" class="task-input input-item">
                <input type="text" name="task-content" id="task-content" class="task-input input-item">
                <input type="date" name="task-date" id="task-date" class="task-input input-item">
            </label>
            <input type="button" value="-" onclick="removeTask(this)" class="removeTask"/>
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

// const headerHeight = document.querySelector("header").clientHeight;
// const main = document.querySelector("main");
// main.style.marginTop = headerHeight + "px";

// window.addEventListener('', () => {
//     headerHeight = document.querySelector("header").clientHeight;
//     main.style.marginTop = headerHeight + "px";
// });
