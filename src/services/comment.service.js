const BaseService = require('./base.service')

const {Exceptions} = require('../helpers')

let _commentRepository = null;
let _ideaRepository = null

class CommentService extends BaseService{

    constructor({CommentRepository, ideaRepository}){
        super(CommentRepository)
        _commentRepository = CommentRepository
        _ideaRepository = ideaRepository
    }

    // snippet
    async getIdeaAfterValidate(ideaId){

        if(!ideaId){
            Exceptions.HttpErrors.badRequestError('ideaId must be sent')
        }

        const idea = await _ideaRepository.get(ideaId)

        if(!idea){
            Exceptions.HttpErrors.notFoundError('idea')
        }
        return idea
    }

    // service methods
    async getIdeaComments(ideaId){
        const { comments } = await this.getIdeaAfterValidate(ideaId);
        return comments;
    }

    async createComment(comment, ideaId){
        const idea = await this.getIdeaAfterValidate(ideaId)
        const createdComment = await _commentRepository.create(comment);
        idea.comments.push(createdComment);
        return await _ideaRepository.update(ideaId, {comments: idea.comments})
    }

}


module.exports = CommentService