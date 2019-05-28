addEventListener('fetch', event => event.respondWith(handle(event)))

async function handle(event) {
  const {request} = event
  const {method, url} = request

  if (method === 'OPTIONS') {
    const headers = new Headers()
    headers.set('Access-Control-Allow-Origin', '*')
    headers.set('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    headers.set('Access-Control-Allow-Methods', 'GET,OPTIONS,POST')
    headers.set('Access-Control-Max-Age', '86400')
    return new Response('', {
      headers
    })
  }

  const lambdaResponse = await fetch('http://localhost:3000', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(await toLambdaEvent(request))
  })

  const {statusCode: status, headers, body} = await lambdaResponse.json()

  return new Response(body, {status, headers})
}

async function toLambdaEvent(request) {
  const url = new URL(request.url)
  return {
    httpMethod: request.method,
    path: url.pathname,
    queryStringParameters: [...url.searchParams].reduce(
      (obj, [key, val]) => ({...obj, [key]: val}),
      {}
    ),
    headers: [...request.headers].reduce(
      (obj, [key, val]) => ({...obj, [key]: val}),
      {}
    ),
    body: ['GET', 'HEAD'].includes(request.method)
      ? undefined
      : await request.text()
  }
}
