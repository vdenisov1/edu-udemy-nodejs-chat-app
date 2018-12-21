class Users {

    constructor () {
        this.users = [];
    }

    addUser (id, name, room) {
        let user = { id, name, room };
        this.users.push(user);
        return user;
    }

    removeUser (id) {
        let user = this.getUser(id);

        if(user) {
            this.users = this.users.filter((user) => user.id !== id);
        }
        
        return user;
    }

    getUser (id) {
        for(let user of this.users){
            if(user.id === id)
                return user;
        }

        return undefined;
    }

    getUserList (room) {
        let usersInRoom = this.users.filter((user) => user.room === room);
        let namesArray = usersInRoom.map((user) => user.name);
        return namesArray;
    }
}

module.exports = { Users };