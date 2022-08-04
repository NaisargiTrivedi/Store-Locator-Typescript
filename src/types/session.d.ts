export { }

declare module 'express-session' {
    interface SessionData {
        logedin: boolean,
        destroy: () => void
    }
}