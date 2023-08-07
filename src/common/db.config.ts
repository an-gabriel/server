import mongoose from 'mongoose';

mongoose.connect(`${process.env.DB_PATH_BUILD}`);

const db = mongoose.connection;

export default db;
