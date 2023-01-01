import { useRouter } from "next/router";
import useSWR from "swr";
import Form from "../../components/Form";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const fetcher = (url) =>
    fetch(url)
        .then((res) => res.json())
        .then((json) => json.data);

const EditTask = () => {
    const router = useRouter();
    const { id } = router.query;
    const { data: task, error } = useSWR(
        id ? `/api/tasks/${id}` : null,
        fetcher
    );

    if (error) return <p>Failed to load</p>;
    if (!task) {
        return (
            <div id="loading">
                <p>Loading...</p>
                <FontAwesomeIcon icon={faSpinner} spin={true} size="2x" />
            </div>
        );
    }
    let dateConverted = task.date.split("T")[0];

    const taskForm = {
        name: task.name,
        description: task.description,
        date: dateConverted,
        project: task.project,
        priority: task.priority,
    };

    return (
        <div id="task-edit">
            <Form
                formId="edit-task-form"
                taskForm={taskForm}
                forNewTask={false}
                tab="edit"
            />
        </div>
    );
};

export default EditTask;
