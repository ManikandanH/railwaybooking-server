const bookTicketService = require("../Services/BookTicketService")

const bookTicketController = (req, res) =>
    bookTicketService(req.body, (error, result, statusCode = null) => {
        if (error) {
            res.status(statusCode).send(error)
        } else {
            res.status(statusCode).send(result)
        }
    })

module.exports = bookTicketController