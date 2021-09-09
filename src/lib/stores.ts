import { writable } from 'svelte/store';
import { listMetrics } from '$lib/orchestrator';
import type { Metric } from '$lib/assessment';

export const metrics = writable(new Map<number, Metric>());
