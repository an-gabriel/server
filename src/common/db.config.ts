import mongoose from 'mongoose';

mongoose.connect(`${process.env.DB_PATH}`);

const db = mongoose.connection;

export default db;
