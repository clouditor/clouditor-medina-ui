import { writable } from 'svelte/store';
import type { Control } from '$lib/orchestrator';
import type { Metric } from '$lib/assessment';

export const metrics = writable(new Map<string, Metric>());
export const controls = writable(new Map<string, Control>());
export var editing = writable(new Boolean);