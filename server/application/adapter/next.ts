type ProcedureResponse = { code: number };
type RedirectResponse = ProcedureResponse & { location: string };

const isRedirectResponse = (
  response: ProcedureResponse,
): response is RedirectResponse => {
  return (
    response.code >= 300 &&
    response.code < 400 &&
    "location" in response &&
    typeof response.location === "string"
  );
};

type RouteContext = { params: Promise<Record<string, string>> };

export const nextAdapter =
  <TResponse extends ProcedureResponse>(
    procedure: (input: unknown) => Promise<TResponse>,
  ) =>
  async (request: Request, context: RouteContext): Promise<Response> => {
    const url = new URL(request.url);
    const search = Object.fromEntries(url.searchParams.entries());
    const params = await context.params;
    const body = await readBody(request);

    const input = {
      ...search,
      ...params,
      ...body,
    };

    const response = await procedure(input);

    if (isRedirectResponse(response)) {
      return new Response(null, {
        status: response.code,
        headers: { Location: response.location },
      });
    }

    return Response.json(response, { status: response.code });
  };

const readBody = async (request: Request): Promise<Record<string, unknown>> => {
  if (request.method === "GET" || request.method === "HEAD") {
    return {};
  }

  const contentType = request.headers.get("content-type") ?? "";

  try {
    if (contentType.includes("application/json")) {
      const parsed = await request.json();

      if (isRecord(parsed)) {
        return parsed;
      }

      return { body: parsed };
    }

    if (contentType.includes("application/x-www-form-urlencoded")) {
      const raw = await request.text();
      return Object.fromEntries(new URLSearchParams(raw).entries());
    }

    if (contentType.includes("multipart/form-data")) {
      const form = await request.formData();
      const result: Record<string, unknown> = {};
      form.forEach((value, key) => {
        result[key] = value;
      });
      return result;
    }

    const raw = await request.text();

    if (!raw) {
      return {};
    }

    try {
      const parsed = JSON.parse(raw);

      if (isRecord(parsed)) {
        return parsed;
      }

      return { body: parsed };
    } catch {
      return { body: raw };
    }
  } catch {
    return {};
  }
};

const isRecord = (value: unknown): value is Record<string, unknown> => {
  return typeof value === "object" && value !== null && !Array.isArray(value);
};
