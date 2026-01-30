import { NextResponse } from 'next/server'

export function middleware(request) {
    const adminSession = request.cookies.get('admin_session')

    if (request.nextUrl.pathname.startsWith('/admin')) {
        if (!adminSession?.value) {
            return NextResponse.redirect(new URL('/login', request.url))
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: '/admin/:path*',
}
