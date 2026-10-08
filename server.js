import express from 'express'
import dotenv from 'dotenv'
dotenv.config()

 const app = express()

const port = process.env.port || 5000

app.use(express.json())
app.use(express.static('public'))


 app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
 })

