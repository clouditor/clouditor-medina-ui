<script lang="ts">
import { Col, Container, Row } from 'sveltestrap';
import CloudServiceCard, { type CloudServiceDetail } from '$lib/CloudServiceCard.svelte';
import EmptyCloudService from '$lib/EmptyCloudService.svelte';
import { registerCloudService, removeCloudService } from '$lib/orchestrator';
import type { PageData } from './$types';
import { invalidate } from '$app/navigation';

export let data: PageData;

async function remove(e: CustomEvent<CloudServiceDetail>) {
	await removeCloudService(e.detail.service.id);

	// invalidate the cloud service list
	invalidate(`/v1/orchestrator/cloud_services`);
}

async function add(e: CustomEvent<CloudServiceDetail>) {
	let newService = await registerCloudService(e.detail.service);

	// invalidate the cloud service list
	invalidate(`/v1/orchestrator/cloud_services`);

	// Show the user a popup with the newly created ID so it can be added to the user's OAuth claims
	window.alert("Created new Cloud Service with ID " + newService.id);
}
</script>

<h3>Target Cloud Services</h3>

The following page can be used to configure Cloud services.

<Container class="mt-4 ms-0 me-0">
	<Row cols={2} noGutters>
		{#each data.services as service, i}
			<Col>
				<CloudServiceCard {service} on:remove={remove} />
			</Col>
		{/each}
		<EmptyCloudService on:save={add} />
	</Row>
</Container>
