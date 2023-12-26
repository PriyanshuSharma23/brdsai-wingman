class Config {
  backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:7070";

  getBackendUrl(path: string): string {
    return `${this.backendUrl}/${path}`;
  }

  getBaseUrl(): string {
    return process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:7070";
  }
}

let config = new Config();
export default config;
