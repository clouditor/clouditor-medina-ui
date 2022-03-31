/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_AUTH_URL: string
    readonly VITE_TOKEN_URL: string
    readonly VITE_CLIENT_ID: string
    readonly VITE_REDIRECT_URI: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}