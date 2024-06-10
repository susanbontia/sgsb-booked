import { createEdgeRouter } from "next-connect";
import { NextRequest } from "next/server";
import { newRoom, createRoom } from "@/backend/controllers/roomControllers";
import dbConnect from "@/backend/config/dbConnect";

interface RequestContext {}

const router = createEdgeRouter<NextRequest, RequestContext>();
dbConnect();

router.post(newRoom);

export async function POST(request: NextRequest, ctx: RequestContext) {
    return router.run(request, ctx);
}