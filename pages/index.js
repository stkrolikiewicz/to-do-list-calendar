import Link from "next/link";
import dbConnect from "../lib/dbConnect";
import Task from "../models/Task";
import unchecked from "../assets/unchecked-checkbox.png";
import checked from "../assets/checked-checkbox.png";
import Image from "next/image";
import NewTask from "../components/NewTask";

const Index = ({ tasks }) => (
    <>
        {/* Create a card for each task */}
        <section id="tasks-container">
            <div id="tasks-list">
                {tasks.map((task) => (
                    <div key={task._id} id="task">
                        <div className="data">
                            <span className="name-check">
                                <input type="checkbox" />
                                <p class="name"> {task.name}</p>
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
                        </div>
                    </div>
                ))}
            </div>

            <NewTask />
        </section>
    </>
);

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
