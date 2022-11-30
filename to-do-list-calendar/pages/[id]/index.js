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
        <div key={task._id}>
            <div className="card">
                <h5 className="task-name">{task.name}</h5>
                <div className="main-content">
                    <p className="task-name">{task.name}</p>
                    {/* Extra Task Info: Likes and Dislikes */}
                    <div className="likes info">
                        <p className="label">{task.project}</p>
                    </div>
                    <div className="dislikes info">
                        <p className="label">{task.priority}</p>
                    </div>

                    <div className="btn-container">
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
            </div>
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
