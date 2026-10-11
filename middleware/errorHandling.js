const errorHandler = async (error,request, response, next) =>{
    response.status(500).json({
        message: error.message
    })
}

export default errorHandler;