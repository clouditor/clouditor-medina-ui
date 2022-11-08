import { sveltekit } from '@sveltejs/kit/vite';
import { env } from '$env/dynamic/private';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],

	server: {
		proxy: {
			'/v1/auth/': env.CLOUDITOR_URL,
			'/v1/discovery/': env.CLOUDITOR_URL,
			'/v1/evidence_store/': env.CLOUDITOR_URL,
			'/v1/assessment/': env.CLOUDITOR_URL,
			'/v1/orchestrator/': env.CLOUDITOR_URL
		}
	},
};

export default config;
