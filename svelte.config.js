import preprocess from 'svelte-preprocess';
import node from '@sveltejs/adapter-node';

const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		preprocess()
	],

	kit: {
		adapter: node()
	}
};

export default config;
