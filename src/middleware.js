import { NextResponse } from "next/server";
import { verifyAuth } from "./lib/auth";

export async function middleware(req) {

    const token = req.cookies.get("token")?.value;
    console.log(token);
    const verifiedToken = token && (await verifyAuth(token).catch((err) => console.log(err)));
    console.log(verifiedToken)

    if(req.nextUrl.pathname.startsWith('/login') && !verifiedToken){
        console.log(11111)
        return
    }

    if(req.nextUrl.pathname.startsWith('/login') && verifiedToken){
        return NextResponse.redirect(new URL('/dashboard', req.url))
    }

    if(!verifiedToken){
        return NextResponse.redirect(new URL('/login', req.url))
    }

}

export const config = {
    matcher: ['/dashboard', '/login'],

}
