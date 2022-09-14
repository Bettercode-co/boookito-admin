import { NextResponse } from "next/server";

export default function middleware(req){

    let verify = req.cookies.get("accessToken")
    let ruleBase = req.cookies.get('ruleBase')
    
    let url = req.url;

    // if(verify){
    //     return NextResponse.redirect('http://localhost:3000/admin/dashboard')
    // }
    if(!verify && url.includes("/dashboard")){
        return NextResponse.redirect('http://localhost:3000/auth/login')
    }
}