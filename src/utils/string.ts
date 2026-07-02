export function safeString(value: unknown): string | null {
  if (value === null || value === undefined) return null;

  const formattedValue = String(value).trim();

  return formattedValue.length ? formattedValue : null;
}

export function toBase64Url(input: string): string {
  const utf8 = encodeURIComponent(input).replace(
    /%([0-9A-F]{2})/g,
    (_, hex) => String.fromCharCode(parseInt(hex, 16))
  );

  const base64 = btoa(utf8);

  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}
