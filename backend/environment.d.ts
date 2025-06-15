declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
      PORT: string;
      FRONTEND_URL: string;
      JWT_SECRET: string;
      ACCESS_TOKEN_EXPIRES: string;
      REFRESH_TOKEN_EXPIRES: string;
    }
  }
}

export {};
