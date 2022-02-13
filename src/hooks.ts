/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
    const response = await resolve(event, {
        ssr: false // disable SSR for now until we figure it our completely
    });

    return response;
}