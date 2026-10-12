import express from 'express'
import pool from '../database/db.js'
import catchAsync from '../middleware/catchAsync.js'

const projectRouter = express.Router()

projectRouter.post('/', catchAsync(async (request, response) => {

    const { clientId, title, budget, status, dueDate } = request.body


    const newProject = await pool.query('INSERT INTO projects (client_id, title, budget, status, due_date) VALUES ($1, $2, $3, $4, $5) RETURNING *', [clientId, title, budget, status, dueDate])
    
    response.status(201).json({
        message: 'Project created successfuly',
        project: newProject.rows[0]
    })
}))


export default projectRouter