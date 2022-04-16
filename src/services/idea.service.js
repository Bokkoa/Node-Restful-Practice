const  BaseService =  require('./base.service')
const {Exceptions} = require('../helpers')
let _ideaRepository = null

class IdeaService extends BaseService{
    constructor({IdeaRepository}){
        super(IdeaRepository);
        _ideaRepository = IdeaRepository
    }

    async getUserIdeas(author){

        if(!author){
            Exceptions.HttpErrors.badRequestError('author must be sent')
        }

        return await _ideaRepository.getUserIdeas(author);
    }

    async upvotedIdea(ideaId){
        if(!ideaId){
            Exceptions.HttpErrors.badRequestError('ideaId must be sent')
        }

        const idea = await _ideaRepository.get(ideaId)

        if(!idea){
            Exceptions.HttpErrors.notFoundError('idea')
        }

        idea.upvotes.push(true);

        return await _ideaRepository.update(ideaId, {upvotes: idea.upvotes })
    }

    async downvotedIdea(ideaId){
        if(!ideaId){
            Exceptions.HttpErrors.badRequestError('ideaId must be sent')
        }

        const idea = await _ideaRepository.get(ideaId)

        if(!idea){
            Exceptions.HttpErrors.notFoundError('idea')
        }

        idea.downvotes.push(true);

        return await _ideaRepository.update(ideaId, {downvotes: idea.upvotes })
    }
    
}

module.exports = IdeaService