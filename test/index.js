const request = require("supertest")
const should = require("should")
const orm = require("../schema/models")

const bookRepository = require("./repositories/book")

const bookCreateEndpoint = require("./endpoints/book.create")
const bookListEndpoint = require("./endpoints/book.list")
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

describe("Testing repositories", async() => {
    before(async() => {
        await orm.sequelize.sync({force: true})
    })
    
    const rep = require("../repositories")(orm)

    describe("Book", async () => {
        await bookRepository(rep, should)
    }) 

    const books = await rep.book.list()
    
    describe("Book - Read", () => {
        bookReadEndpoint(request, should, books[0].id)
    }) 

    describe("Book - Update", () => {
        bookUpdateEndpoint(request, should, rep)
    }) 

    describe("Book - List", async () => {
        await bookListEndpoint(request, should)
    }) 
})

