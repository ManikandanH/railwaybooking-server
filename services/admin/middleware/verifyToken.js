var jwt = require("jsonwebtoken")

function verifyToken(req, res, next, privateKey) {
	const token = req.headers["authorization"]
	if (typeof token !== "undefined") {
		jwt.verify(token, privateKey, (err, success) => {
			if (err) {
				res.sendStatus(401)
			} else if(success) {
				next()
			}
		})
	} else {
		res.sendStatus(403)
	}
}

module.exports = verifyToken
