import { NextRequest, NextResponse } from "next/server";
import Room from "@/backend/models/room";
import mongoose from 'mongoose';
import  ErrorHandler  from "@/backend/utils/errorHandler";
import catchAsynErrors from "@/backend/middlewares/catchAsyncErrors";

//Get all rooms => /api/rooms
export const allRooms = catchAsynErrors(async(req: NextRequest) => {
    const rooms = await Room.find();
    const resPerPage: number = 8;

    return NextResponse.json({
       success: true,
       resPerPage,
       rooms,
    });
});

//Create new room => /api/admin/rooms
export const newRoom = catchAsynErrors(
    async (req: NextRequest) => {

    const body = await req.json();
    const room = await Room.create(body);

    return NextResponse.json({
        success: true,
        room,
    });
});

//Get room details => /api/rooms/:id
export const getRoomDetails = catchAsynErrors(
    async(req: NextRequest, { params }: {params: {id: string}}) => {

    const room = await Room.findById(params.id);

    if(!room) {
        throw new ErrorHandler("Room not found", 404);
    }

    return NextResponse.json({
        success: true,
        room,
    });

});

//Update room details => /api/admin/rooms/:id
export const updateRoom = catchAsynErrors(
    async(req: NextRequest, { params }: {params: {id: string}}) => {

    let room = await Room.findById(params.id);
    const body = await req.json();

    if(!room) {
        throw new ErrorHandler("Room not found", 404);
    }

    room = await Room.findByIdAndUpdate(params.id, body, { new: true, })

    return NextResponse.json({
        success: true,
        room,
    });
});


//Delete room details => /api/admin/rooms/:id
export const deleteRoom = catchAsynErrors(
    async(req: NextRequest, { params }: {params: {id: string}}) => {

    let room = await Room.findById(params.id);
   
    if(!room) {
        throw new ErrorHandler("Room not found", 404);
    }

    //TODO - Delete images associated with the room
    room = await Room.deleteOne();

    return NextResponse.json({
        success: true,
    });
});