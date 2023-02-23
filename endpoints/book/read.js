const endpoint = async (req, res, mod) => {
    try {
        const { id } = req.params
        
        const book = await mod.book.read(id)

        res.success(book)
    } catch(error) {
        console.log(error)
        res.error(error)
    }
}

module.exports = endpoint