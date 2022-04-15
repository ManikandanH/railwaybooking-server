const cancelTicketService = require("../Services/CancelTicketService");

const cancelTicketController = (req, res) =>
    cancelTicketService(req.body, (error, result, statusCode = null) => {
        if (error) {
            res.status(statusCode).send(error);
        } else {
            res.status(statusCode).send(result);
        }
    });

module.exports = cancelTicketController;