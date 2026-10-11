const catchAsync = (fn) => {
    return async (request, response, next) => {
        try {
            await fn(request, response, next)
        } catch (err) {
            next(err)
        }
    }
}

export default catchAsync