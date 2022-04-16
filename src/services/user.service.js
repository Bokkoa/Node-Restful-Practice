const BaseService = require('./base.service')

let _userRepository = null;

class UserService extends BaseService{

    constructor({UserRepository}){
        super(UserRepository)
        _userRepository = UserRepository
    }

    async getUserByUsernanme(username){
        return await _userRepository.getUserByUsernanme(username)
    }
}


module.exports = UserService