export const env = {
    // Force PORT to be a number
    PORT: Number(process.env.PORT) || 3000, 
    // Add HOST here so TypeScript knows it exists
    HOST: process.env.HOST || "0.0.0.0",
    DATABASE_URL: process.env.DATABASE_URL || "",
    JWT_SECRET: process.env.JWT_SECRET || "supersecretkey",
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "1d",
};