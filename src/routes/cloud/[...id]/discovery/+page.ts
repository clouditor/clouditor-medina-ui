import { queryDiscovery } from "$lib/discovery";
import { redirectLogin } from "$lib/oauth";
import type { LoadEvent } from "@sveltejs/kit";

export async function load({ fetch, params }: LoadEvent) {
    // no load needed, we are fetching the resources in the parent layout,
    // because we need information about it in multiple views.
    return {}
}