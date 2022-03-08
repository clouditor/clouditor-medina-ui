import { writable } from 'svelte/store';
import type { Requirement } from '$lib/orchestrator';
import type { Metric } from '$lib/assessment';

export const metrics = writable(new Map<number, Metric>());
export const requirements = writable(new Map<string, Requirement>());