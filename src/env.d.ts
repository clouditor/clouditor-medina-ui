/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly AUTH_URL: string
    readonly TOKEN_URL: string
    readonly CLIENT_ID: string
    readonly REDIRECT_URI: string
    readonly SCOPE: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}