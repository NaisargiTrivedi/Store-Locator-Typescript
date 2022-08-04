export { };

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PORT: number;
            MYSQL_USER: string;
            MYSQL_PASSWORD: string;
            MYSQL_PORT: number;
            ADMIN_PASSWORD: string;
            CONNECTION_STRING: string;
            CONNECTION_STRING_TEST: string;
            MONGOOSE_ID: string;
            MONGOOSE_PASSWORD: string;
            SESSION_KEY: string;
            DB_NAME: string;
            ENV: String;
        }
    }
}
