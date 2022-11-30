import Link from "next/link";
import dbConnect from "../lib/dbConnect";
import Task from "../models/Task";

const Index = ({ tasks }) => (
    <>
        {/* Create a card for each task */}
        {tasks.map((task) => (
            <div key={task._id}>
                <div className="card">
                    <h5 className="task-name">{task.name}</h5>
                    <div className="main-content">
                        <p className="task-name">{task.name}</p>
                        <p className="task-date">{task.date}</p>

                        {/* Extra Task Info: Description, date, project and priority */}
                        <div className="likes info">
                            <p className="label">{task.priority}</p>
                        </div>
                        <div className="dislikes info">
                            <p className="label">{task.project}</p>
                        </div>

                        <div className="btn-container">
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
                </div>
            </div>
        ))}
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
