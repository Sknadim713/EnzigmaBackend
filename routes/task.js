const express = require('express');
const router = express.Router();
const TaskModel = require('../Models/task_model')
const multer = require('multer')
const upload = multer({})


// Create Task Api 
router.post("/createTask", upload.none(), async (req, resp) => {
    try {
        const { assignedTo, status, dueDate, priority, comment } = req.body
        const newTask = await TaskModel.create({ assignedTo, status, dueDate, priority, comment });
        resp.status(200).json({ success: true, data: newTask, message: "Task Created Successfuly" });

    } catch (error) {
        resp.status(500).json({ success: false, error: error.message });
    }
})

// Udate By Id Api
router.put("/updateTask/:id", upload.none(), async (req, resp) => {
    try {
        const { id } = req.params;
        const { assignedTo, status, dueDate, priority, comment } = req.body
        const updateTask = { assignedTo, status, dueDate, priority, comment }

        const taskUpdate = await TaskModel.findByIdAndUpdate(id, updateTask, { new: true })
        resp.status(200).json({ success: true, data: taskUpdate, message: 'Updated task  successfully' })

    } catch (error) {
        resp.status(500).json({ success: false, error: error.message })
    }
})

// Get All Task Api 
router.get("/getAll", async (req, resp) => {
    try {
        const tasks = await TaskModel.find()
        resp.status(200).json({ success: true, count: tasks.length, data: tasks, message: "Data fatched successfuly" });

    } catch (error) {
        resp.status(500).json({ success: false, error: error.message })
    }
})

// Get By Id Api
router.get("/getById/:id", async (req, resp) => {
    try {
        const { id } = req.params;
        const Task = await TaskModel.findById(id);
        if (!id) {
            resp.status(404).json({ success: false, message: 'User id is required ' })
        }
        resp.status(200).json({ success: true, data: Task, message: "Task found  successfuly" })

    } catch (error) {
        resp.status(500).json({ success: false, error: error.message })
    }
})

// Delete By Id Api
router.delete('/deleteById/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const Task = await TaskModel.findByIdAndDelete(id);
        if (!Task) {
            return res.status(404).json({ success: false, message: 'Task not found' });
        }
        res.status(200).json({ success: true, message: 'Task deleted successfully', data: Task });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});


module.exports = router