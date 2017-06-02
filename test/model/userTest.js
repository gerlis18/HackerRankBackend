var User = require('../../models/user');

describe('User', function() {
    describe('#save()', function() {
        it('should save without error', function(done) {
            let user = new User({
                name: 'Gerlis',
                email: 'gerlis1997@gmail.com',
                username: 'galvarez',
                password: '123456',
                imageUrl: 'url'
            });
            user.save(done);
        })
    })
})