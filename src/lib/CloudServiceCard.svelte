<script lang="ts" context="module">
export interface CloudServiceEvent {
	serviceIdx: number;
	requirementIdx?: number;
	requirementId?: string;
}

export interface CatalogEvent {
	catalogIdx: number;
	controlIdx?: number;
	controlId?: string;
}

export interface CatalogEventMap {
	'add-control': CatalogEvent;
	'remove-control': CatalogEvent;
	save: CatalogEvent;
}
</script>

<script lang="ts">
import {
	Button,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	CardSubtitle,
	CardText,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
	ListGroup,
	ListGroupItem
} from 'sveltestrap';
import { listMetricConfigurations, type CloudService } from '$lib/orchestrator';
import { createEventDispatcher, onMount } from 'svelte';
import Fa from 'svelte-fa';
import { faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { derived } from 'svelte/store';
import type { MetricConfiguration } from './assessment';
import { trim } from './util';

export let service: CloudService;
let metricConfigurations: Map<string, MetricConfiguration> = new Map<string, MetricConfiguration>();

onMount(async () => {
	metricConfigurations = await listMetricConfigurations(service.id, true);
});

let category = '';
</script>

<Card class="mb-3 me-3">
	<CardHeader><a href="/cloud/{service.id}"><b>{service.name}</b></a></CardHeader>
	<CardBody>
		<CardText>
			<p>
				{service.description}
			</p>
		</CardText>
	</CardBody>
</Card>
