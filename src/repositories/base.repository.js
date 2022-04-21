class BaseRepository {

    constructor( model ){
        this.model = model
    }

    async get(id){
        return await this.model.findById(id);
    }


    async getAll(pageSize=5, pageNumber=1){
        // skip - limit
        const skips = pageSize * (pageNumber - 1); // getting te page as skips
        return await this.model.find().skip(skips).limit(pageSize); // getting the paginated
    }

    async create(entity){
        return await this.model.create(entity);
    }

    async update(id, entity){
        return await this.model.findByIdAndUnique(id, entity, { new: true });
    }

    async delete(id){
        return await this.model.fiundByIdAndDelete(id);
    }
}


module.exports = BaseRepository