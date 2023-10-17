import {useState} from 'react';
import Form from './Form';

const NewTask = ({isListEmpty}) => {
  const taskForm = {
    name: '',
    description: '',
    date: '',
    project: '',
    priority: '',
  };

  return (
    <Form
      formId="add-task-form"
      taskForm={taskForm}
      tab="main"
      empty={`${isListEmpty}`}
    />
  );
};

export default NewTask;
