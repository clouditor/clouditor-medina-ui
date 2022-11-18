<script lang="ts">
import { Col, Container, Row } from 'sveltestrap';
import CloudServiceCard from '$lib/CloudServiceCard.svelte';
import type { CloudServiceEvent } from '$lib/CloudServiceCard.svelte';
import EmptyCloudService from '$lib/EmptyCloudService.svelte';
import { updateCloudService } from '$lib/orchestrator';
import type { PageData } from './$types';

export let data: PageData;

const { services } = data;

function save(e: CustomEvent<CloudServiceEvent>) {
	updateCloudService(services[e.detail.serviceIdx]);
}
</script>

<h3>Target Cloud Services</h3>

The following page can be used to configure Cloud services.

<Container class="mt-4 ms-0 me-0">
	<Row cols={2} noGutters>
		{#each services as service, i}
			<Col>
				<CloudServiceCard
					{service}
					on:save={save}
				/>
			</Col>
		{/each}
		<EmptyCloudService />
	</Row>
</Container>
