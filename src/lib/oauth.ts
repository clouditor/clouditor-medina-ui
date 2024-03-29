import { browser } from "$app/environment";
import { goto } from "$app/navigation";
import { redirect } from "@sveltejs/kit";
import { env } from '$env/dynamic/public';

export interface TokenResponse {
    access_token: string
}

export interface ErrorResponse {
    error: string
}

export function isError(response: TokenResponse | ErrorResponse): response is ErrorResponse {
    return (response as ErrorResponse).error !== undefined;
}

export async function exchange(code: string, sessionState: string | undefined = undefined): Promise<TokenResponse | ErrorResponse> {
    const params = new URLSearchParams();
    params.append("grant_type", "authorization_code");
    params.append("code_verifier", localStorage.verifier);
    params.append("code", code);
    if (sessionState != undefined) {
        params.append("session_state", sessionState);
    }
    params.append("client_id", env.PUBLIC_OAUTH_CLIENT_ID);
    params.append("redirect_uri", env.PUBLIC_OAUTH_REDIRECT_URI);
    params.append("scope", env.PUBLIC_OAUTH_SCOPE)

    return fetch(env.PUBLIC_OAUTH_TOKEN_URL, {
        method: 'POST',
        body: params,
    })
        .then((res) => res.json())
        .then((response: TokenResponse) => {
            return response;
        });
}

export function generateVerifier(): string {
    const random = crypto.getRandomValues(new Uint8Array(32));
    return base64urlencode(String.fromCharCode(...new Uint8Array(random)));
}

export async function generateChallenge(v: string): Promise<string> {
    const enc = new TextEncoder();
    const digest = await crypto.subtle.digest('SHA-256', enc.encode(v));
    return base64urlencode(String.fromCharCode(...new Uint8Array(digest)));
}

export async function redirectLogin(backTo = '/') {
    // generate a new verifier
    const v = generateVerifier();

    localStorage.setItem('verifier', v);
    localStorage.setItem('backTo', backTo);

    const challenge = await generateChallenge(v);

    const url = `${env.PUBLIC_OAUTH_AUTH_URL}?response_type=code&client_id=${env.PUBLIC_OAUTH_CLIENT_ID
        }&redirect_uri=${encodeURIComponent(
            env.PUBLIC_OAUTH_REDIRECT_URI
        )}&code_challenge=${challenge}&code_challenge_method=S256&scope=${env.PUBLIC_OAUTH_SCOPE}`;

    return workaroundRedirect(url);
}

// Workaround because of https://github.com/sveltejs/kit/issues/5952
export async function workaroundRedirect(url) {
    if (browser) {
        return await goto(url);
    } else {
        throw redirect(302, url);
    }
}

function base64urlencode(b: string): string {
    b = btoa(b).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');

    return b;
}