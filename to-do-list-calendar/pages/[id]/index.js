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
    return (
        <div key={task._id} id="task">
            <div className="data">
                <div className="">
                    <p class="name"> {task.name}</p>
                    <p class="dueDate">{task.dueDate}</p>
                    <p class="project">{task.project}</p>
                    <p class="priority">{task.priority}</p>
                    <p class="description">{task.description}</p>
                </div>
                <div className="btns">
                    <Link
                        href="/[id]/edit"
                        as={`/${task._id}/edit`}
                        legacyBehavior
                    >
                        <button className="btn edit">Edit</button>
                    </Link>
                    <button className="btn delete" onClick={handleDelete}>
                        Delete
                    </button>
                </div>
            </div>
            {/* <div className="card"></div> */}
            {message && <p>{message}</p>}
        </div>
    );
};

export async function getServerSideProps({ params }) {
    await dbConnect();

    const task = await Task.findById(params.id).lean();
    task._id = task._id.toString();
    task.date = `${task.date}`;
    return { props: { task } };
}

export default TaskPage;