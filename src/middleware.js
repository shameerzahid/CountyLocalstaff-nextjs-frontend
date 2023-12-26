import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request) {
  console.log("middleware executed")
  const authToken = request.cookies.get("authToken")?.value;
  const LoggedInDontAccess = request.nextUrl.pathname === "/";
  if(LoggedInDontAccess)
  {
    if(authToken)
    {
      return NextResponse.redirect(new URL("/goals", request.url))
    }
  }
  else
  {
    if(!authToken)
    {
      return NextResponse.redirect(new URL("/", request.url))

    }
  }
  // return NextResponse.redirect(new URL('/home', request.url))
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/",
    "/users",
    "/goals",
    "/active-goal",
    "/reports"
  ]
}