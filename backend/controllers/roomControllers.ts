import { NextRequest, NextResponse } from "next/server";
import Room from "../models/room";
import mongoose from 'mongoose';

//Get all rooms => /api/rooms
export const allRooms = async(req: NextRequest) => {
    const rooms = await Room.find();
    const resPerPage: number = 8;

    return NextResponse.json({
       success: true,
       resPerPage,
       rooms,
    });
}

//Create new room => /api/rooms
export const newRoom = async (req: NextRequest) => {
    const body = await req.json();
    const room = await Room.create(body);

    return NextResponse.json({
        success: true,
        room,
    });
}

//Get room details => /api/rooms/:id
export const getRoomDetails = async(
    req: NextRequest,
    { params }: {params: {id: string}}) => {

    const { ObjectId } = mongoose.Types;

    // Check if the ID is valid and has 24 characters
    if (!ObjectId.isValid(params.id) || params.id.length !== 24) {
        return NextResponse.json(
            { message: "Room not found" },
            { status: 400 }
        );
    }

    // Convert string ID to ObjectId
    const objectId = new ObjectId(params.id);

    // Query the room with the valid ObjectId
    const room = await Room.findById(objectId);

    if(!room) {
        return NextResponse.json(
            { message: "Room not found" },
            { status: 404 }
        );
    }

    return NextResponse.json({
        success: true,
        room,
    });
};

//Update room details => /api/rooms/:id
export const updateRoom = async(
    req: NextRequest,
    { params }: {params: {id: string}}) => {

    const { ObjectId } = mongoose.Types;

    // Check if the ID is valid and has 24 characters
    if (!ObjectId.isValid(params.id) || params.id.length !== 24) {
        return NextResponse.json(
            { message: "Room not found" },
            { status: 400 }
        );
    }

    // Convert string ID to ObjectId
    const objectId = new ObjectId(params.id);

    // Query the room with the valid ObjectId
    let room = await Room.findById(objectId);
    const body = await req.json();

    if(!room) {
        return NextResponse.json(
            { message: "Room not found" },
            { status: 404 }
        );
    }

    room = await Room.findByIdAndUpdate(objectId, body, { new: true, })

    return NextResponse.json({
        success: true,
        room,
    });
};