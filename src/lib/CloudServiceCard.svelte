<script lang="ts" context="module">
export interface CloudServiceDetail {
	service: CloudService;
}
</script>

<script lang="ts">
import type { CloudService } from '$lib/orchestrator';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { createEventDispatcher } from 'svelte';
import Fa from 'svelte-fa';
import { Button, Card, CardBody, CardHeader, CardText } from 'sveltestrap';

export let service: CloudService;

const dispatch = createEventDispatcher<{ remove: CloudServiceDetail }>();

function remove(service: CloudService) {
	const ok = confirm('Do you really want to delete this cloud service?');
	if (!ok) {
		return;
	}

	dispatch('remove', { service: service });
}
</script>

<Card class="mb-3 me-3">
	<CardHeader><a href="/cloud/{service.id}"><b>{service.name}</b></a></CardHeader>
	<CardBody>
		<CardText>
			<p>
				{service.id} <br />
				{service.description}<br />
				<Button color="danger" on:click={() => remove(service)}><Fa icon={faTrash} /></Button>
			</p>
		</CardText>
	</CardBody>
</Card>
