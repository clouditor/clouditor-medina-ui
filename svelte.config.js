import preprocess from 'svelte-preprocess';
import node from '@sveltejs/adapter-node';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter: node(),
		vite: {
			server: {
				proxy: {
					'/v1/auth/': 'http://localhost:8080',
					'/v1/discovery/': 'http://localhost:8080',
					'/v1/evidence_store/': 'http://localhost:8080',
					'/v1/assessment/': 'http://localhost:8080',
					'/v1/orchestrator/': 'http://localhost:8080'
				}
			}
		}
	}
};

export default config;
