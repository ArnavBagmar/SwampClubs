import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};