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

router.delete('/:id', catchAsync(async (request, response) => {
    const clientId = request.params.id
    const deletedClient = await pool.query('DELETE FROM clients WHERE id = $1 RETURNING *;', [clientId])

    if (deletedClient.rows.length === 0) {
        return response.status(404).json({
            message: 'Client not found'
        })
    }
    response.status(200).json({
        message: 'Client deleted successfully',
        client: deletedClient.rows[0]
    })
}))

router.put('/:id', catchAsync(async (request, response) => {
    const clientId = request.params.id
    const { clientName, clientEmail, clientPhone } = request.body
    const updatedClient = await pool.query('UPDATE clients SET name = $1, email = $2, phone = $3 WHERE id = $4 RETURNING *', [clientName, clientEmail, clientPhone, clientId])

    if (updatedClient.rows.length === 0) {
        return response.status(404).json({
            message: 'Client not found to update'
        })
    }

    response.status(200).json({
        message: 'Client updated successfully',
        client: updatedClient.rows[0]
    })
}))

export default router