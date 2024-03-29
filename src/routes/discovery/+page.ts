import { listResources } from '$lib/discovery';
import { redirectLogin } from '$lib/oauth';

/**
 * @type {import('@sveltejs/kit').PageLoad}
 */
export async function load() {
	return listResources()
		.then((results) => {
			return {
				resources: results
			};
		})
		.catch(() => {
			return redirectLogin('/discovery');
		});
}
