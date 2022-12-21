import Link from "next/link";
import dbConnect from "../lib/dbConnect";
import Task from "../models/Task";
import unchecked from "../assets/unchecked-checkbox.png";
import checked from "../assets/checked-checkbox.png";
import Image from "next/image";
import NewTask from "../components/NewTask";
import { useRouter } from "next/router";
import {useEffect} from "react"
import AllDone from "../components/AllDone";

const Index = ({ tasks }) => {
    const router = useRouter();
    const handleDelete = async (id) => {
        // const taskID = router.query.id
        // useEffect(() => {console.log("1")}, []);
        console.log(id);
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
        <>
            {/* Create a card for each task */}
            <section id="tasks-container">
                <div id="tasks-list">
                    {tasks.length === 0 && <AllDone sign="ALL TASKS COMPLETED!" />}
                    {tasks.map((task) => (
                        <div key={task._id} id="task">
                            <div className="data">
                                <span className="name-check">
                                    <input type="checkbox" />
                                    <Link
                                        href="/[id]"
                                        as={`/${task._id}`}
                                        legacyBehavior
                                    >
                                        <p class="name"> {task.name}</p>
                                    </Link>
                                </span>
                                {task.dueDate && <p class="dueDate">{task.dueDate}</p>}
                                {task.project && <p class="project">{task.project}</p>}
                                {task.priority && <p class="priority">{task.priority}</p>}
                            </div>
                            <div className="btns">
                                <Link
                                    href="/[id]/edit"
                                    as={`/${task._id}/edit`}
                                    legacyBehavior
                                >
                                    <button className="btn edit">Edit</button>
                                </Link>
                                <Link
                                    href="/[id]"
                                    as={`/${task._id}`}
                                    legacyBehavior
                                >
                                    <button className="btn view">View</button>
                                </Link>
                                <button className="btn delete" onClick={() => {

                                    try {
                                        fetch(`/api/tasks/${task._id.toString()}`, {
                                            method: "Delete",
                                        });
                                        router.push("/");
                                    } catch (error) {
                                        setMessage("Failed to delete the task.");
                                    }
                                }}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <NewTask />
            </section>
        </>
    )
};

/* Retrieves task(s) data from mongodb database */
export async function getServerSideProps() {
    await dbConnect();

    /* find all the data in our database */
    const result = await Task.find({});
    const tasks = result.map((doc) => {
        const task = doc.toObject();
        task._id = task._id.toString();
        task.date = `${task.date}`;

        return task;
    });

    return { props: { tasks: tasks } };
}

export default Index;
