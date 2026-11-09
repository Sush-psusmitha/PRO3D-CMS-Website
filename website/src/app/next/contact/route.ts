// Contact form endpoint (replaces contact.php). /next/* is used because Payload owns /api/*.
// Validation runs here as well as in the browser. Saving the enquiry (MongoDB) and
// notifying the team (Resend) are added when the database and email key are set up;
// until then the form reports that it is not connected rather than dropping leads.

type Body = Partial<Record<'name' | 'email' | 'country' | 'contact' | 'service' | 'message' | 'pageUrl', unknown>>

const str = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '')

export async function POST(req: Request) {
  let body: Body
  try {
    body = (await req.json()) as Body
  } catch {
    return Response.json({ message: 'Invalid request.' }, { status: 400 })
  }

  const data = {
    name: str(body.name, 60),
    email: str(body.email, 120),
    country: str(body.country, 8),
    contact: str(body.contact, 10),
    service: str(body.service, 60),
    message: str(body.message, 3000),
    pageUrl: str(body.pageUrl, 300),
  }

  if (
    !/^[a-zA-Z ]{2,60}$/.test(data.name) ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) ||
    !/^[0-9]{10}$/.test(data.contact) ||
    !data.message
  ) {
    return Response.json({ message: 'Please check the highlighted fields and try again.' }, { status: 400 })
  }

  // TODO (CMS step): payload.create({ collection: 'enquiries', data }) + Resend notification
  return Response.json(
    { message: 'Our contact form is being set up. Please email us at 3d.sales@professional3dservices.com.' },
    { status: 503 },
  )
}
