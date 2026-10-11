import express from 'express'
import dotenv from 'dotenv'
import  router  from './routers/clientRoutes.js'
import  errorHandler from './middleware/errorHandling.js'
dotenv.config()

 const app = express()

const port = process.env.port || 5000

app.use(express.json())
app.use(express.static('public'))
app.use('/api/clients', router)


app.use(errorHandler)

 app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
 })

