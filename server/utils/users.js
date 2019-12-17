class Users {
    constructor() {
        this.users = [];
    }

    addUser(id, name, room) {
        let user = {id, name, room};
        this.users.push(user);
        return user;
    }

    getUserList(room) {
        let users = this.users.filter((user) => user.room === room);
        let userNameArray = users.map((user) => user.name);

        return userNameArray;
    }

    getUser(id) {
        return this.users.filter((user) => user.id === id)[0];
    }

    removeUser(id) {
        let _user = this.getUser(id);
        if (_user) {
            this.users = this.users.filter((user) => user.id !== _user.id);
        }
        return _user;
    }
}

module.exports = {Users};
