export const API_BASE_URL = `http://localhost:3000`;

export async function apiCall<T>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  try {
    const isFormData = options.body instanceof FormData;
    const headers: Record<string, string> = {};

    if (!isFormData) {
      headers["Content-Type"] = "application/json";
    }

    if (options.headers && typeof options.headers === "object") {
      Object.assign(headers, options.headers as Record<string, string>);
    }

    if (isFormData && headers["Content-Type"]) {
      delete headers["Content-Type"];
    }

    console.log(`[API] ${options.method || "GET"} ${url}`, {
      isFormData,
      headers,
      method: options.method || "GET",
    });

    const response = await fetch(url, {
      ...options,
      headers,
    });

    console.log(`[API Response DEBUG] ${options.method || "GET"} ${url}`, {
      status: response.status,
      statusText: response.statusText,
    });

    if (!response.ok) {
      const errorData = await response.text();
      if (response.status === 404) {
        console.warn(`[API 404] ${options.method || "GET"} ${url}`);
        return {} as T;
      } else if (response.status === 403) {
        console.warn(
          `[API 403 Forbidden] ${
            options.method || "GET"
          } ${url} - User lacks permissions`
        );
        throw new Error(`HTTP 403: Access Denied - ${errorData}`);
      }
      throw new Error(`HTTP ${response.status}: ${errorData}`);
    }

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const text = await response.text();

      if (text) {
        try {
          const parsed = JSON.parse(text);
          return parsed;
        } catch {
          return {} as T;
        }
      }
      return {} as T;
    }
    const jsonResponse = await response.json();
    return jsonResponse;
  } catch (error) {
    // Логируем только non-404/403 ошибки в консоль
    if (
      error instanceof Error &&
      !error.message.includes("HTTP 404") &&
      !error.message.includes("HTTP 403")
    ) {
      console.error("API call failed:", error);
    }
    // Возвращаем пустой объект вместо выброса ошибки для 404/403
    if (
      error instanceof Error &&
      (error.message.includes("HTTP 404") || error.message.includes("HTTP 403"))
    ) {
      return {} as T;
    }
    throw error;
  }
}
