const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {
    let users;

    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: "1",
            name: "Mike",
            room: "The Office Fans"
        },{
            id: "2",
            name: "Sam",
            room: "Scrubs Fans"
        },{
            id: "3",
            name: "Jose",
            room: "The Office Fans"
        }]
    });

    it('should add new user', () => {
        let users = new Users();
        let user = {
            id: "sdfsdf",
            name: "WDJ",
            room: "The Office Fans"
        };
        let reUser = users.addUser(user.id, user.name, user.room);
        expect(users.users).toEqual([user]);
    });

    it('should return names for the office fans', ()=>{
        let userList = users.getUserList('The Office Fans');

        expect(userList).toEqual(['Mike', 'Jose']);
    });

    it('should return names for Scrubs Fans', ()=>{
        let userList = users.getUserList('Scrubs Fans');

        expect(userList).toEqual(['Sam']);
    });

    it('should find user', function () {
        let id = '2';
        let user = users.getUser(id);
        expect(user.id).toBe(id);
    });

    it('should not find user', function () {
        let id = '150';
        let user = users.getUser(id);
        expect(user).toBeUndefined();
    });

    it('should remove user', function () {
        let id = '2';
        let user = users.removeUser(id);
        expect(user.id).toBe(id);
        expect(users.users.length).toBe(2);
    });
});
