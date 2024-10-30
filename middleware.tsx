import { NextResponse, NextRequest } from 'next/server';

const PUBLIC_PATHS = ['/login', '/register', '/about', '/contact'];
const JWT_SECRET = new TextEncoder().encode(process.env.NEXTAUTH_SECRET);
async function verifyToken(token: string) {
    const [header, payload, signature] = token.split('.');
    if (!header || !payload || !signature) return false;
    const encodedHeaderPayload = `${header}.${payload}`;
    const decodedSignature = Uint8Array.from(atob(signature.replace(/_/g, '/').replace(/-/g, '+')), c => c.charCodeAt(0));
    const cryptoKey = await crypto.subtle.importKey('raw', JWT_SECRET, { name: 'HMAC', hash: 'SHA-256' }, false, ['verify']);
    return await crypto.subtle.verify('HMAC', cryptoKey, decodedSignature, new TextEncoder().encode(encodedHeaderPayload));
}

export async function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value;
    const { pathname } = request.nextUrl;
    if (token) {
        try {
            const isValid = await verifyToken(token);
            if (isValid) {
                return NextResponse.next();
            }
        } catch (error) {
            console.error("Token verification failed:", error);
        }
    }
    if (!PUBLIC_PATHS.includes(pathname)) {
        const loginUrl = new URL('/login', request.url);
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico|api/).*)'],
};
