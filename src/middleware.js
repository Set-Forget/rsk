import { NextResponse } from 'next/server';

const middleware = (request) => {
  const { cookies } = request;
  const user = cookies.get('user');

  if (
    !user &&
    request.nextUrl.pathname !== '/auth/login' &&
    request.nextUrl.pathname.includes('/_next') === false
  ) {
    const loginUrl = new URL('/auth/login', request.nextUrl.origin);
    return NextResponse.redirect(loginUrl);
  }

  if (
    user &&
    request.nextUrl.pathname == '/auth/login' &&
    request.nextUrl.pathname.includes('/_next') === false
  ) {
    const home = new URL('/', request.nextUrl.origin);
    return NextResponse.redirect(home);
  }

  return NextResponse.next();
};

export default middleware;