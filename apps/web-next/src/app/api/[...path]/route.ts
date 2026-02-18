import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

/**
 * Backend API base URL including the /api prefix.
 * .env.local:      NEXT_PUBLIC_API_URL=http://localhost:8003/api
 * .env.production: NEXT_PUBLIC_API_URL=/api
 */
const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8003/api'

/**
 * Builds the target backend URL from the captured path segments.
 * pathSegments are everything after /api/ in the original URL.
 * API_BASE already includes the /api prefix from the env var.
 */
function buildTargetUrl(pathSegments: string[], search: string): string {
  const joined = pathSegments.join('/')
  return `${API_BASE}/${joined}${search}`
}

/**
 * Forwards a request to the NestJS backend and returns the response.
 */
async function forwardToBackend(
  request: NextRequest,
  pathSegments: string[],
): Promise<NextResponse> {
  const url = new URL(request.url)
  const targetUrl = buildTargetUrl(pathSegments, url.search)

  const headers = new Headers(request.headers)
  headers.delete('host')
  headers.delete('connection')

  try {
    const init: RequestInit = {
      method: request.method,
      headers,
      cache: 'no-store',
    }

    if (request.method !== 'GET' && request.method !== 'HEAD') {
      init.body = await request.arrayBuffer()
    }

    const backendRes = await fetch(targetUrl, init)

    const resHeaders = new Headers(backendRes.headers)
    resHeaders.delete('transfer-encoding')

    return new NextResponse(backendRes.body, {
      status: backendRes.status,
      statusText: backendRes.statusText,
      headers: resHeaders,
    })
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Proxy request failed'
    const hint =
      'Backend unreachable. Start the API (e.g. from repo root: npm run dev) and ensure NEXT_PUBLIC_API_URL points to it (default http://localhost:8003/api).'
    return NextResponse.json(
      { status: 'error', message: msg, targetUrl, hint },
      { status: 502 },
    )
  }
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> },
): Promise<NextResponse> {
  const { path } = await context.params
  return forwardToBackend(request, path)
}

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> },
): Promise<NextResponse> {
  const { path } = await context.params
  return forwardToBackend(request, path)
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> },
): Promise<NextResponse> {
  const { path } = await context.params
  return forwardToBackend(request, path)
}

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> },
): Promise<NextResponse> {
  const { path } = await context.params
  return forwardToBackend(request, path)
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> },
): Promise<NextResponse> {
  const { path } = await context.params
  return forwardToBackend(request, path)
}
