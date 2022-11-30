import { useRouter } from "next/router";
import useSWR from "swr";
import Form from "../../components/Form";

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
    if (!task) return <p>Loading...</p>;

    const taskForm = {
        name: task.name,
        description: task.description,
        date: task.date,
        project: task.project,
        priority: task.priority,
    };

    return (
        <Form formId="edit-task-form" taskForm={taskForm} forNewTask={false} />
    );
};

export default EditTask;
