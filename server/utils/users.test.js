const expect = require('expect.js');
const { Users } = require("./users");

describe('Users', () => {
    let users;

    beforeEach(() => {
        users = new Users();

        users.users = [{
            id: '1',
            name: 'Mike',
            room: 'Node Course'
        },
        {
            id: '2',
            name: 'Jane',
            room: 'React Course'
        },
        {
            id: '3',
            name: 'Julie',
            room: 'Node Course'
        }];
    });

    it('should add new user', () => {
        let users = new Users();
        let user = {
            id: '123',
            name: 'TestPerson',
            room: 'My Test Room'
        };
        let resUser = users.addUser(user.id, user.name, user.room);

        expect(users.users).to.eql([user]);
        expect(resUser).to.eql(user);
    });

    it('should return names for node course', () => {
        let userList = users.getUserList('Node Course');
        expect(userList).to.eql(['Mike', 'Julie']);
    });

    it("should return names for react course", () => {
      let userList = users.getUserList("React Course");
      expect(userList).to.eql(["Jane"]);
    });

    it('should remove a user', () => {
       let userId = users.users[0].id;
       let removed = users.removeUser(userId);
       expect(users.users.length).to.be(2);
       expect(removed.id).to.be(userId);
    });

    it('should not remove user that does not exist', () => {
        let userId = '2342';
        users.removeUser(userId);
        expect(users.users.length).to.be(3);
    });

    it('should find user', () => {
        let userId = users.users[0].id;
        let user = users.getUser(userId);

        expect(user.id).to.be(userId);
    });

    it('should not find user', () => {
        let userId = '9393939';
        let user = users.getUser(userId);
        expect(user).to.be(undefined);
    })
});