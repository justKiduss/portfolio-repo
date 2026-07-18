export function buildMailtoUrl({ to, subject, body }) {
  const params = new URLSearchParams();
  if (subject) params.set("subject", subject);
  if (body) params.set("body", body);
  return `mailto:${to}?${params.toString()}`;
}
