interface ApiConfig extends RequestInit {
	headers?: Record<string, string>;
}

interface ApiError extends Error {
	status?: number;
}

class PublicApi {
	private baseURL: string;

	constructor(baseURL: string) {
		this.baseURL = baseURL;
	}

	private async fetch<T>(endpoint: string, options: ApiConfig = {}): Promise<T> {
		const url = `${this.baseURL}${endpoint}`;

		const config: RequestInit = {
			headers: {
				'Content-Type': 'application/json',
				...options.headers
			},
			...options
		};

		try {
			const response = await fetch(url, config);

			if (!response.ok) {
				const error: ApiError = new Error(`HTTP error! status: ${response.status}`);
				error.status = response.status;
				throw error;
			}

			return (await response.json()) as T;
		} catch (error) {
			console.error('API request failed:', error);
			throw error;
		}
	}

	public async get<T>(
		endpoint: string,
		params: Record<string, string | number | boolean> = {}
	): Promise<T> {
		const query = new URLSearchParams();

		Object.entries(params).forEach(([key, value]) => {
			query.append(key, String(value));
		});

		const queryString = query.toString();
		return this.fetch<T>(`${endpoint}${queryString ? `?${queryString}` : ''}`, {
			method: 'GET'
		});
	}
}

const api = new PublicApi(import.meta.env.VITE_API_BASE_URL || 'https://api.example.com');

export default api;
