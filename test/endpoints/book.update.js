module.exports = async (request, should, rep) => {
    const list = await rep.book.list()

    it("It successfully executes /UPDATE ", (done) => {
        request("localhost:3000")
            .put("/book/"+list[0].id)
            .send({
                name: "livro atualizado", 
                author: "autor",
                year: 2023,
                units: 1
            })
            .end((err, res) => {
                should(res.body.result.name).equal("livro atualizado")
                done()
            })    
    })
}