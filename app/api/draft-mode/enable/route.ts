import { draftMode } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const secret = searchParams.get('secret');
  const slug = searchParams.get('slug');

  if (secret !== process.env.SANITY_PREVIEW_SECRET) {
    return new NextResponse('Invalid token', { status: 401 });
  }

  draftMode().enable();

  const redirectTo = slug
    ? new URL(slug, request.url).toString()
    : new URL('/', request.url).toString();

  return NextResponse.redirect(redirectTo);
}
