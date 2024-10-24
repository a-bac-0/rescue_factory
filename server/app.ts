import connection_db from "./database/db";
import commentModel from "./models/commentsModel";
import contactMessageModel from "./models/contactModel";
import postModel from "./models/postsModel";
import userModel from "./models/usersModel";
import adoptionModel from "./models/adoptionsModel";
import express from 'express';


export const app = express()




try {
    await connection_db.authenticate();
    console.log('The connection to the database has been successful 👍✅')

    await adoptionModel.sync({force:false});
    console.log('The users table has been created successfully 👍✅')

    await postModel.sync({force:false});
    console.log('The posts table has been created successfully 👍✅')

    await commentModel.sync({force:false});
    console.log('The comments table has been created successfully 👍✅')

    await contactMessageModel.sync({force:false});
    console.log('The contact table has been created successfully 👍✅')

    await userModel.sync({force:false});
    console.log('The users table has been created successfully 👍✅')
} catch (error) {
    console.error('Unable to connect to the database ❌:', error)
}


app.listen

