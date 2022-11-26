export interface Video {
    caption: string;
    _id: string;
    video: {
        asset: {
            _id: string;
            url: string;
        }
    };
    postedBy: {
        _id: string;
        image: string;
        userName: string;
    };
    userId: string;
    likes: {
        postedBy: {
            _id: string;
            image: string;
            uesrName: string;
        }
    }[];

    comments: {
        comment: string,
        _key: string,
        postedBy: {
            _ref: string;
        };
    }[];
}

export interface IUser { 
    _id: string,
    _type: string,
    userName: string,
    image:string
}