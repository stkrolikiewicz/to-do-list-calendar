import { useState } from "react";
import { useRouter } from "next/router";
import { mutate } from "swr";
import Alert from "./Alert/Alert";

const Form = ({ formId, taskForm, forNewTask = true, tab }) => {
    const router = useRouter();
    const contentType = "application/json";
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState("");

    const [form, setForm] = useState({
        name: taskForm.name,
        description: taskForm.description,
        date: taskForm.date,
        project: taskForm.project,
        priority: taskForm.priority,
    });

    const resetForm = () => {
        setForm({
            name: "",
            description: "",
            date: "",
            project: "",
            priority: "",
        });
    };

    /* The PUT method edits an existing entry in the mongodb database. */
    const putData = async (form) => {
        const { id } = router.query;

        try {
            const res = await fetch(`/api/tasks/${id}`, {
                method: "PUT",
                headers: {
                    Accept: contentType,
                    "Content-Type": contentType,
                },
                body: JSON.stringify(form),
            });

            // Throw error with status code in case Fetch API req failed
            if (!res.ok) {
                throw new Error(res.status);
            }

            const { data } = await res.json();

            mutate(`/api/tasks/${id}`, data, false); // Update the local data without a revalidation
            router.push("/");
        } catch (error) {
            setMessage("Failed to update task");
        }
    };

    /* The POST method adds a new entry in the mongodb database. */
    const postData = async (form) => {
        try {
            const res = await fetch("/api/tasks", {
                method: "POST",
                headers: {
                    Accept: contentType,
                    "Content-Type": contentType,
                },
                body: JSON.stringify(form),
            });

            // Throw error with status code in case Fetch API req failed
            if (!res.ok) {
                throw new Error(res.status);
            }

            router.push("/");
        } catch (error) {
            setMessage("Failed to add task");
        }
    };

    const handleChange = (e) => {
        const target = e.target;
        const value = target.value;
        const name = target.name;

        setForm({
            ...form,
            [name]: value,
        });
    };

    /* Makes sure task info is filled for task name, owner name, species, and image url*/
    const formValidate = () => {
        let err = {};
        if (!form.name) err.name = "Name is required";
        return err;
    };

    const [formDisplay, setFormDisplay] =
        tab === "main" ? useState("none") : useState("block");
    const [plusBtnDisplay, setPlusBtnDisplay] =
        tab === "main" ? useState("block") : useState("none");

    const addTask = () => {
        const button = document.getElementById("addTaskBtn");
        button.style.opacity = "0";
        button.style.zIndex = "-1";
        button.style.transition = "0.5s";

        formDisplay === "block"
            ? setFormDisplay("none")
            : setFormDisplay("block");
        setTimeout(() => {
            document
                .getElementById("tasks-container")
                .scrollTo(0, document.body.scrollHeight);
        }, 200);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errs = formValidate();
        if (Object.keys(errs).length === 0) {
            setFormDisplay("none");
            tab === "main" && setPlusBtnDisplay("block");
            forNewTask ? postData(form) : putData(form);
        } else {
            setErrors({ errs });
        }
        const button = document.getElementById("addTaskBtn");
        if (tab === "main") {
            button.style.transition = "0.5s";
            button.style.zIndex = "100";
            button.style.opacity = "1";
        }
    };
    const handleCancel = (e) => {
        e.preventDefault();
        const button = document.getElementById("addTaskBtn");
        // setPlusBtnDisplay("block");
        // task.name.value = "";
        setFormDisplay("none");
        if (tab === "main") {
            button.style.transition = "0.5s";
            button.style.zIndex = "100";
            button.style.opacity = "1";
        }
        resetForm();
        if (tab === "edit") router.push("/");
    };

    return (
        <div id="addNewTask">
            <div
                id="addTaskBtn"
                onClick={addTask}
                style={{ display: `${plusBtnDisplay}` }}
            >
                <p>+ Add task</p>
            </div>
            <form
                id={formId}
                onSubmit={handleSubmit}
                style={{ display: `${formDisplay}` }}
            >
                <div id="hello" className="inputs">
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        id="task-name"
                        placeholder="Type a name of the task"
                        onfocus="this.placeholder = ''"
                        onblur="this.placeholder = 'Type a name of the task'"
                        required
                    />
                    <textarea
                        type="textarea"
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        id="task-description"
                        onfocus="this.placeholder = ''"
                        onblur="this.placeholder = 'Type a desctription of the task'"
                        placeholder="Type a desctription of the task"
                        rows="2"
                        cols="3"
                        wrap="soft"
                    ></textarea>
                    <div className="other-fields">
                        <div className="date-project">
                            <input
                                type="date"
                                name="date"
                                value={form.date}
                                onChange={handleChange}
                                id="task-date"
                            />
                            <select
                                name="project"
                                value={form.project}
                                onChange={handleChange}
                                id="task-project"
                            >
                                <option value="1">project 1</option>
                                <option value="2">project 2</option>
                                <option value="3">project 3</option>
                                <option value="4">project 4</option>
                                <option value="5">project 5</option>
                            </select>
                        </div>
                        <select
                            name="priority"
                            value={form.priority}
                            onChange={handleChange}
                            id="task-priority"
                            className="task-input input-item"
                        >
                            <option value={1}>priority 1</option>
                            <option value={2}>priority 2</option>
                            <option value={3}>priority 3</option>
                            <option value={4}>priority 4</option>
                            <option value={5}>priority 5</option>
                        </select>
                    </div>
                </div>
                <div className="buttons">
                    {/* <input
                        type="button"
                        value="cancel"
                        onClick="removeTask(this)"
                        className="removeTask taskBtn"
                    /> */}
                    <button className="removeTask btn" onClick={handleCancel}>
                        Cancel
                    </button>
                    <button type="submit" className="setTask btn">
                        Submit
                    </button>
                </div>
            </form>
            <p>{message}</p>
            <div>
                {Object.keys(errors).map((err, index) => (
                    <li key={index}>{err}</li>
                ))}
            </div>
        </div>
    );
};

export default Form;
