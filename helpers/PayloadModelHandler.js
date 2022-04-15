const handler = (payload, DBSchemaConstructor) => {
    let dbObj = {}

    dbObj = new DBSchemaConstructor()
    for (let prop in payload) {
        if (payload.hasOwnProperty(prop)) {
            dbObj[prop] = payload[prop]
        }
    }

    return dbObj
}

module.exports = handler