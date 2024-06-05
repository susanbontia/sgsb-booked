import { createEdgeRouter } from "next-connect";
import { NextRequest } from "next/server";
import { getRoomDetails, updateRoom } from "../../../../backend/controllers/roomControllers";
import dbConnect from "../../../../backend/config/dbConnect";

interface RequestContext {
    params: {
        id: string
    }
}

const router = createEdgeRouter<NextRequest, RequestContext>();
dbConnect();

router.get(getRoomDetails);
router.put(updateRoom);

export async function GET(request: NextRequest, ctx: RequestContext) {
    return router.run(request, ctx);
}

export async function PUT(request: NextRequest, ctx: RequestContext) {
    return router.run(request, ctx);
}
