export class Comment {
    constructor(
        public id: number,
        public text: string,
        public user_id: number,
        public post_id: number,
        public comment_id: number|null
    ) {}
}

export class NewComment {
    constructor(
        public comment: string,
        public comment_id: number|null,
    ) {}
}