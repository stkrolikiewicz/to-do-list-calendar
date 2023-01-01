import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import dbConnect from "../../lib/dbConnect";
import Task from "../../models/Task";

/* Allows you to view task card info and delete task card*/
const TaskPage = ({ task }) => {
    const router = useRouter();
    const [message, setMessage] = useState("");
    const handleDelete = async () => {
        const taskID = router.query.id;
        try {
            await fetch(`/api/tasks/${taskID}`, {
                method: "Delete",
            });
            router.push("/");
        } catch (error) {
            setMessage("Failed to delete the task.");
        }
    };
    const handleCheck = async () => {};

    return (
        <div key={task._id} id="task-view">
            <div className="data-view">
                <div className="check-name-view">
                    <p class="name-view"> {task.name}</p>
                    <p class="description-view">{task.description}</p>
                    <div className="flags-view">
                        {task.date && <p class="dueDate">Date: {task.date}</p>}
                        {task.project && (
                            <p class="project">Project {task.project}</p>
                        )}
                        {task.priority && (
                            <p class="priority">priority: {task.priority}</p>
                        )}
                    </div>
                </div>
            </div>
            <div className="btns-view">
                <Link href="/[id]/edit" as={`/${task._id}/edit`} legacyBehavior>
                    <button className="btn edit">Edit</button>
                </Link>
                <button className="btn delete" onClick={handleDelete}>
                    Delete
                </button>
                {/* <button className="btn check" onClick={handleCheck}>
                    Check Task
                </button> */}
            </div>
            {message && <p>{message}</p>}
        </div>
    );
};

export async function getServerSideProps({ params }) {
    await dbConnect();

    const task = await Task.findById(params.id).lean();
    task._id = task._id.toString();
    task.date = task.date.toISOString().split("T")[0];
    return { props: { task } };
}

export default TaskPage;
