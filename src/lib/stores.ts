import { writable } from 'svelte/store';
import type { Metric } from '$lib/orchestrator';

export const metrics = writable([]);
