import express, { request, response } from 'express'
import pool from '../database/db.js'
import catchAsync from '../middleware/catchAsync.js'

const router = express.Router()

router.get('/', catchAsync(async (request, response) => {
    const client = await pool.query('SELECT * FROM clients')
    response.json(client.rows)

}))

router.post('/', catchAsync(async (request, response) => {
    const { clientName, clientEmail, clientPhone } = request.body
    const newdClient = await pool.query('INSERT INTO clients(name, email, phone) values ($1, $2, $3) RETURNING *', [clientName, clientEmail, clientPhone])
    response.status(201).json({
        message: "User added successfully!",
        client: newdClient.rows[0]
    })
}))

export default router