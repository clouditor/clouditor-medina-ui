import { queryDiscovery } from "$lib/discovery";
import { redirectLogin } from "$lib/oauth";
import type { LoadEvent } from "@sveltejs/kit";

export async function load({ fetch, params }: LoadEvent) {
    return queryDiscovery(params.id, "", fetch)
        .then((results) => {
            return {
                resources: results,
                sortedBy: "test",
            };
        })
        .catch(() => {
            redirectLogin('/discovery');
        });
}