import mongoose from 'mongoose';
import Room from '../backend/models/room';
import { rooms } from "./data";
// require('dotenv').config({path: 'next.config.mjs'});

const seedRooms = async() => {
    try {
        
        await mongoose.connect("mongodb://localhost:27017/booked");
        
        await Room.deleteMany();
        console.log("Rooms are deleted");

        await Room.insertMany(rooms);
        console.log("Rooms are added");

        process.exit();

    } catch (error) {
        console.log(error);
        process.exit();
    }
};

seedRooms();