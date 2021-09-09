import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
		ssr: false, // for now, until we figure out authentication
		vite: {
			server: {
				proxy: {
					'/v1/auth/': 'http://localhost:8080',
					'/v1/discovery/': 'http://localhost:8080',
					'/v1/assessment/': 'http://localhost:8080',
					'/v1/orchestrator/': 'http://localhost:8080'
				}
			}
		}
	}
};

export default config;
