import mongoose from "mongoose";

/* TaskSchema will correspond to a collection in your MongoDB database. */
const TaskSchema = new mongoose.Schema({
    name: {
        /* The name of this task */

        type: String,
        required: [true, "Please provide a name for this task."],
        maxlength: [60, "Name cannot be more than 60 characters"],
    },
    description: {
        /* The description of this task */

        type: String,
        maxlength: [120, "Description cannot be longer than 120 characters"],
    },
    date: {
        /* The date of your task */
        type: String,
    },
    project: {
        /* task's project, if applicable */
        type: String,
    },
    priority: {
        /* Number that specifies the priority of a task, if applicable */

        type: Number,
        // min: 1,
        // max: 5,
    },
});

export default mongoose.models.Task || mongoose.model("Task", TaskSchema);
