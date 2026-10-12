import express from 'express'
import pool from '../database/db.js'
import catchAsync from '../middleware/catchAsync.js'

const projectRouter = express.Router()

projectRouter.get('/', catchAsync(async (request, response) => {
    const projects = await pool.query('SELECT * FROM projects')
    response.json(projects.rows)
}))

projectRouter.post('/', catchAsync(async (request, response) => {

    const { clientId, title, budget, status, dueDate } = request.body


    const newProject = await pool.query('INSERT INTO projects (client_id, title, budget, status, due_date) VALUES ($1, $2, $3, $4, $5) RETURNING *', [clientId, title, budget, status, dueDate])

    response.status(201).json({
        message: 'Project created successfuly',
        project: newProject.rows[0]
    })
}))

projectRouter.get('/:id', catchAsync(async (request, response) => {
    const projectId = request.params.id
    const project = await pool.query('SELECT * FROM projects WHERE id = $1', [projectId])

    if (project.rows.length === 0) {
        return response.status(404).json({
            message: 'Project not found'
        })
    }

    response.json(project.rows[0])
}))


export default projectRouter