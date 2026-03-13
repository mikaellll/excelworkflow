import type { APIRoute } from 'astro';

export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
  const timestamp = new Date().toISOString();
  
  return new Response(JSON.stringify({
    status: 'ok',
    message: 'ExcelWorkflow API is active',
    project: 'excelworkflow',
    timestamp: timestamp,
    client_context: {
      ip: request.headers.get('cf-connecting-ip') || 'unknown',
      ray: request.headers.get('cf-ray') || 'none',
      country: request.headers.get('cf-ipcountry') || 'unknown'
    }
  }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store, no-cache, must-revalidate',
      'X-Robots-Tag': 'noindex'
    }
  });
};
