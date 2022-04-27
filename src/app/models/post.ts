export class Post {

    constructor(
        public id: number,
        public header: string,
        public body: string,
        public user_id: number,
    ) {
        this.id = id;
        this.header = header;
        this.body = body;
        this.user_id = user_id;
    }
}

export class NewPost {
    constructor(
        public header: string,
        public body: string,
        public user_id: number,
    ) {
        this.header = header;
        this.body = body;
        this.user_id = user_id;
    }
}