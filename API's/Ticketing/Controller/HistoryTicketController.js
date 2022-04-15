const historyTicketService = require("../Services/HistoryTicketService");

const historyTicketController = (req, res) =>
    historyTicketService(req.body, (error, result, statusCode = null) => {
        if (error) {
            res.status(statusCode).send(error);
        } else {
            res.status(statusCode).send(result);
        }
    });

module.exports = historyTicketController;