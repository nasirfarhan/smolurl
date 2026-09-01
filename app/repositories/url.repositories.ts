import { db } from "../lib/db";

export async function createUrl(originalUrl:string , shortCode:string ) {
    return db.url.create({
        data:{
            originalUrl,
            shortCode
        }
    })   
}

export async function findUrlByShortCode(shortCode: string){
    return db.url.findUnique({
        where: {
            shortCode
        }
    })
}