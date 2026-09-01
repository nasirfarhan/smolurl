import { findUrlByShortCode } from "../repositories/url.repositories";
import { NextResponse } from "next/server";

type RouteContext= {
    params: Promise <{
        shortCode: string
    }>
}

export async function GET(request:Request , context: RouteContext) {
    
    const {shortCode} = await context.params

    const url = await findUrlByShortCode(shortCode)

    if(!url){
        return NextResponse.json(
            {error: "Url not found"} ,
            {status: 404}
        )
    }

    return NextResponse.redirect(url.originalUrl)
}