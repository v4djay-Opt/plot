import { draftMode } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  draftMode().disable();
  return NextResponse.redirect(new URL('/', 'http://localhost:3000'));
}
