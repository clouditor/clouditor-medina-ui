/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly PUBLIC_OAUTH_AUTH_URL: string
    readonly PUBLIC_OAUTH_TOKEN_URL: string
    readonly PUBLIC_OAUTH_CLIENT_ID: string
    readonly PUBLIC_OAUTH_REDIRECT_URI: string
    readonly PUBLIC_OAUTH_SCOPE: string
    /**
     * The path to the Clouditor backend
     */
    readonly PUBLIC_CLOUDITOR_URL: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}