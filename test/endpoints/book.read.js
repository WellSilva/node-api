module.exports = async (request, should, id) => {
    it("It successfully executes /GET (read) ", (done) => {
        console.log(id)
        request("localhost:3000")
            .get("/book/"+id)
            .end((err, res) => {
                console.log(res.body.result)
                should(res.body.result.name).equal("livro atualizado")
                done()
            })    
    })
}