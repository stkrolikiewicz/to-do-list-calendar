import Link from "next/link";
import dbConnect from "../lib/dbConnect";
import Task from "../models/Task";
import NewTask from "../components/NewTask";
import { useRouter } from "next/router";
import AllDone from "../components/AllDone";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faSpinner,
    faHashtag,
    faCalendarDays,
    faFlag,
    faPen,
    faEye,
    faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const Index = ({ tasks }) => {
    const [loadingStatus, setLoadingStatus] = useState(false);

    const router = useRouter();
    return (
        <>
            {/* Create a card for each task */}
            <section id="tasks-container">
                {/* {tasks.length === 0 && <AllDone sign="ALL TASKS COMPLETED!" />} */}
                {loadingStatus && (
                    <div id="loading">
                        <p>Loading</p>
                        <FontAwesomeIcon
                            icon={faSpinner}
                            spin={true}
                            size="2x"
                        />
                    </div>
                )}
                <div id="tasks-list">
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
                                        <p className="name"> {task.name}</p>
                                    </Link>
                                </span>
                                {task.date && (
                                    <p className="dueDate">
                                        <>
                                            <FontAwesomeIcon
                                                icon={faCalendarDays}
                                            />
                                            {task.date}
                                        </>
                                    </p>
                                )}
                                {task.project && (
                                    <p className="project">
                                        <FontAwesomeIcon icon={faHashtag} />
                                        {"project "}
                                        {task.project}
                                    </p>
                                )}
                                {task.priority && (
                                    <>
                                        <p className="priority">
                                            <FontAwesomeIcon icon={faFlag} />
                                            {task.priority}
                                        </p>
                                    </>
                                )}
                            </div>
                            <div className="btns">
                                <Link
                                    href="/[id]/edit"
                                    as={`/${task._id}/edit`}
                                    legacyBehavior
                                >
                                    <button className="btn edit">
                                        <FontAwesomeIcon icon={faPen} />
                                    </button>
                                </Link>
                                <Link
                                    href="/[id]"
                                    as={`/${task._id}`}
                                    legacyBehavior
                                >
                                    <button className="btn view">
                                        <FontAwesomeIcon icon={faEye} />
                                    </button>
                                </Link>
                                <button
                                    className="btn delete"
                                    onClick={() => {
                                        try {
                                            fetch(
                                                `/api/tasks/${task._id.toString()}`,
                                                {
                                                    method: "Delete",
                                                }
                                            );
                                            router.push("/");
                                        } catch (error) {
                                            setMessage(
                                                "Failed to delete the task."
                                            );
                                        }
                                    }}
                                >
                                    {loadingStatus ? (
                                        <FontAwesomeIcon
                                            icon={faSpinner}
                                            spin={true}
                                            size="1x"
                                        />
                                    ) : (
                                        <>
                                            <FontAwesomeIcon icon={faTrash} />
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <NewTask isListEmpty={tasks.length === 0 ? "true" : "false"} />
            </section>
        </>
    );
};

/* Retrieves task(s) data from mongodb database */
export async function getServerSideProps() {
    await dbConnect();

    /* find all the data in our database */
    const result = await Task.find({});
    const tasks = result.map((doc) => {
        const task = doc.toObject();
        task._id = task._id.toString();
        task.date = JSON.parse(JSON.stringify(task.date));
        if (task.date) {
            task.date = task.date.split("T")[0];
        }
        return task;
    });

    return { props: { tasks: tasks } };
}

export default Index;
