
const { ExceptionsHelper } = require('../helpers')

class BaseService{
    constructor(repository){
        this.repository = repository
    }

    async get(id){

        if(!id){
            ExceptionsHelper.HttpErrors.badRequestError('id must be send')
        }

        const  currentEntity = await this.repository.get(id);
        
        if(!currentEntity){
            ExceptionsHelper.HttpErrors.notFoundError('entity')
        }

        return currentEntity

    }

    async getAll(){
        return await this.repository.getAll();
    }

    async create(entity){
        return await this.repository.create(entity)
    }

    async update(id, entity){

        if(!id){
            ExceptionsHelper.HttpErrors.badRequestError('id must be send')
        }

        return await this.repository.update(id, entity);
        
    }


    async delete(id){

        if(!id){
            ExceptionsHelper.HttpErrors.badRequestError('id must be send')
        }

        return await this.repository.delete(id);
    }
}



module.exports = BaseService