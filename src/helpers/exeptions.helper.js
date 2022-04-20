
class HttpErrors{
    static notFoundError(subject){
        const error = new Error()
        error.status = 404;
        error.message = `${subject} not found`
        throw error
    }

    static badRequestError(subject){
        const error = new Error()
        error.status = 400;
        error.message = subject
        throw error
    }

    static unauthorizedError(subject){
        const error = new Error()
        error.status = 401;
        error.message = subject
        throw error
    }
}

module.exports = {
    HttpErrors
}