const { JwtHelper, ExceptionsHelper } = require('../helpers');

let _userService = null;

class AuthService{
    constructor({UserService}){
        _userService = UserService
    }

    async signUp(user){
        const {username} = user;
        const userExist = _userService.getUserByUsername(username);
        if(userExist){
            ExceptionsHelper.HttpErrors.unauthorizedError('User already exists')
        }

        return await _userService.create(user);
    }

    async signIn(user){
        const {username, password} = user;
        const userExist = _userService.getUserByUsername(username);
        if(!userExist){
            ExceptionsHelper.HttpErrors.notFoundError('User')
        }

        const validPassword = userExist.comparePasswords(password);
        if(!validPassword){
            ExceptionsHelper.HttpErrors.unauthorizedError('Invalid password')
        }

        const userToEncode = {
            username: userExist.username,
            id: userExist._id,
        };

        const token = JwtHelper.generateToken(userToEncode);

        return {token, user: userExist };
    }
}

module.exports = AuthService