module.exports = async (request, should) => {
    it("It successfully executes /POST ", (done) => {
        request("localhost:3000")
            .post("/book")
            .send({
                name: "livro", 
                author: "autor",
                year: 2023,
                units: 1
            })
            .end((err, res) => {
                should(res.body.result.name).equal("livro")
                done()
            })    
    })
}