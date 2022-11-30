import Form from "../components/Form";

const NewTask = () => {
    const taskForm = {
        name: "",
        description: "",
        date: "",
        project: "",
        priority: "",
    };

    return <Form formId="add-task-form" taskForm={taskForm} />;
};

export default NewTask;
