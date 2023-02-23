class BookModule {
    constructor(repositories){
        this.rep = {
            ...repositories
        }
    }

    async list() {
        return this.rep.book.list()
    }

    async create(values) {
        return this.rep.book.create(values)
    }

    async read(id) {
        return this.rep.book.read(id)
    }

    async update(id, values) {
        return this.rep.book.update(id, values)
    }
}

module.exports = BookModule