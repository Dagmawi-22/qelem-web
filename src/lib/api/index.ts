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

	public async uploadPdfAndGenerateContent(
		file: File,
		count: number,
		difficulty: 'easy' | 'medium' | 'hard',
		mode: 'exam' | 'flashcard'
	) {
		const formData = new FormData();
		formData.append('file', file);
		formData.append('count', count.toString());
		formData.append('difficulty', difficulty);
		formData.append('type', mode);

		const url = `${this.baseURL}/content/generate-from-pdf`;

		try {
			const response = await fetch(url, {
				method: 'POST',
				body: formData
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			return await response.json();
		} catch (error) {
			console.error('Upload failed:', error);
			throw error;
		}
	}
}

const api = new PublicApi(import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000');
export default api;
