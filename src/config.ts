import * as dotenv from 'dotenv';
dotenv.config()

export default {
    mongodb: {
        string: `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_HOST}`,
        db:'ecomm'
    },
    file: {
        path: './data'
    },
    firebase: {
        credetentialFile: './admin-fire.json',
        databaseURL: 'ms-api-ecomm.firebaseio.com'
    }
}