const request = require("supertest")
const should = require("should")
const orm = require("../schema/models")

const bookRepository = require("./repositories/book")

const bookListEndpoint = require("./endpoints/book.list")
const bookCreateEndpoint = require("./endpoints/book.create")
const bookReadEndpoint = require("./endpoints/book.read")
const bookUpdateEndpoint = require("./endpoints/book.update")

describe("API UP", () => {
    it("Api should return message and code 200", (done) => {
        request("localhost:3000")
        .get("/home")
        .end((err, res) => {
            should(res.body.result.message).equal("Api Up!")
            done()
        })
    })
})

describe("Testing repositories", () => {
    before(async() => {
        await orm.sequelize.sync({force: true})
    })
    
    const rep = require("../repositories")(orm)
    const modules = require("../modules")(rep)

    describe("Book", async () => {
        await bookRepository(rep, should)
    }) 

    describe("Book - List", async () => {
        await bookListEndpoint(request, should)
    })

    describe("Book - Create", async () => {
        await bookCreateEndpoint(request, should);
    })

    describe("Book - Read", async () => {
        await bookReadEndpoint(request, should, modules);
    })

    describe("Book - Update", async () => {
        await bookUpdateEndpoint(request, should,modules);
    })
})

