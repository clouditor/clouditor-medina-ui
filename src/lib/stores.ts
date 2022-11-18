import { writable } from 'svelte/store';
import type { Catalog, Control } from '$lib/orchestrator';
import type { Metric } from '$lib/assessment';

export const metrics = writable(new Map<string, Metric>());
export const controls = writable(new Map<string, Control>());
export const catalogs = writable(new Map<string, Catalog>());
export const editing = writable(false);