import { NextResponse } from 'next/server';
import { DEFAULT_LOCATION_CODE, findLocation } from '@pherinepal/domain';
import { getPublicCatalog, readBookingSwitch, toPublicDto } from '@/lib/catalog';

export const dynamic = 'force-dynamic';

/**
 * GET /api/v1/catalog?location=<code>
 * Public catalogue. Lists every category with its status for the location.
 * Never returns inventory, prices or internal gate reasons.
 */
export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('location') ?? DEFAULT_LOCATION_CODE;

  if (!findLocation(code)) {
    return NextResponse.json(
      { error: { code: 'UNKNOWN_LOCATION', message: 'The requested location is not recognised.' } },
      { status: 404 },
    );
  }

  const services = getPublicCatalog(code).map(toPublicDto);

  return NextResponse.json(
    {
      data: { location: code, services },
      meta: { sampleData: true, bookingSwitchOn: readBookingSwitch() },
    },
    { headers: { 'Cache-Control': 'public, max-age=60' } },
  );
}
