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
import { invalidate } from '$app/navigation';
import { listMetricConfigurations, removeCloudService, type CloudService } from '$lib/orchestrator';
import { createEventDispatcher, onMount } from 'svelte';
import Fa from 'svelte-fa';
import { faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { derived } from 'svelte/store';
import type { MetricConfiguration } from './assessment';
import { trim } from './util';

export let service: CloudService;
let metricConfigurations: Map<string, MetricConfiguration> = new Map<string, MetricConfiguration>();

async function remove(target: string) {
	const ok = confirm('Do you really want to delete this cloud service?');
	if (!ok) {
		return;
	}

	await removeCloudService(target);

	// invalidate the cloud service
	invalidate(`/v1/orchestrator/cloud_services/${target}`);
}

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
				{service.id} <br/>
				{service.description}<br/>
				<Button color="danger" on:click={() => remove(service.id)}><Fa icon={faTrash} /></Button>
			</p>
		</CardText>
	</CardBody>
</Card>
