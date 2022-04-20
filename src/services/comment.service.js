const BaseService = require('./base.service')

const {ExceptionsHelper} = require('../helpers')

let _commentRepository = null;
let _ideaRepository = null

class CommentService extends BaseService{

    constructor({CommentRepository, IdeaRepository}){
        super(CommentRepository)
        _commentRepository = CommentRepository
        _ideaRepository = IdeaRepository
    }

    // snippet
    async getIdeaAfterValidate(ideaId){

        if(!ideaId){
            ExceptionsHelper.HttpErrors.badRequestError('ideaId must be sent')
        }

        const idea = await _ideaRepository.get(ideaId)

        if(!idea){
            ExceptionsHelper.HttpErrors.notFoundError('idea')
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