export class User {
    id: number;
    username: string;
    name: string;
    birthday: string;

    constructor(id: number, username: string, name: string, birthday: string) {
        this.id = id;
        this.username = username;
        this.name = name;
        this.birthday = birthday;
    }
}