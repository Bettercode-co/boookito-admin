import { NextResponse } from "next/server";

export default function middleware(req) {
  let verify = req.cookies.get("accessToken");
  let ruleBase = req.cookies.get("ruleBase");

  let url = req.url;

  if (!verify && url.includes("/admin")) {
    return NextResponse.redirect("http://localhost:3000/auth/login");
  }
  if (verify && ruleBase === "STUDENT" && url.includes("/admin")) {
    return NextResponse.redirect("http://localhost:3000/auth/login");
  }
  if (verify && ruleBase === "ADMIN" && url.includes("/login")) {
    return NextResponse.redirect("http://localhost:3000/admin/dashboard");
  }
}
