import { NextResponse } from "next/server";
import { verifyAuth } from "./lib/auth";

export async function middleware(req) {

    const token = req.cookies.get("token")?.value;
    console.log(token);
    const verifiedToken = token && (await verifyAuth(token).catch((err) => console.log(err)));

    if(req.nextUrl.pathname.startsWith('/login') && !verifiedToken){
        return
    }

    if(!verifiedToken){
        return NextResponse.redirect(new URL('/login', req.url))
    }

}

export const config = {
    matcher: ['/dashboard', '/login'],

}
