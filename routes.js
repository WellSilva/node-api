const home = require("./endpoints")
const bookList = require("./endpoints/book/list")
const bookCreate = require("./endpoints/book/create")
const bookRead = require("./endpoints/book/read")
const bookUpdate = require("./endpoints/book/update")

const init = (server, mod) => {
    server.use((req, res, next) => {
        res.success = (result) => {
            return res.json(200, {
            result,
            })
        }
        res.error = (error) => {
            return res.json(400, {
            error,
            })
        }

        req.param = req?.body ? req.body : req.query

        return next()
    })

    server.get("/home", home)

    server.get("/book", async (req, res) => { await bookList(req, res, mod)})
    server.post("/book", async (req, res) => { await bookCreate(req, res, mod)})
    server.get("/book/:id", async (req, res) => { await bookRead(req, res, mod)})
    server.put("/book/:id", async (req, res) => { await bookUpdate(req, res, mod)})
    
}

module.exports.init = init