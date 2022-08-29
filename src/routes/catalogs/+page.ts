import { listCatalogs } from '$lib/orchestrator';
import type { Catalog } from '$lib/orchestrator';
import { redirectLogin } from '$lib/oauth';

/**
 * @type {import('@sveltejs/kit').PageLoad}
 */
 export async function load({ params, fetch, context }) {
	return listCatalogs()
		.then((catalogs) => {
			return {
				catalogs: catalogs,
			};
		})
		.catch(() => {
			return redirectLogin('/catalogs');
		});
}
