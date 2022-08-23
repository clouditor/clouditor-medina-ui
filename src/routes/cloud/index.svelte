<script lang="ts" context="module">
	import { controls } from '$lib/stores';
	import { listCloudServices, updateCloudService, type Catalog } from '$lib/orchestrator';
	import type { CloudService } from '$lib/orchestrator';
	import { redirectLogin } from '$lib/oauth';

	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ params, fetch, session, context }) {
		// TODO(oxisto): this should be moved to more central component
		return listCloudServices()
			.then((services) => {
				return {
					props: {
						services: services
					}
				};
			})
			.catch(() => {
				return redirectLogin('/cloud');
			});
	}
</script>

<script lang="ts">
	import { Col, Container, Row } from 'sveltestrap';
	import CloudServiceCard, { type CatalogEvent, type CloudServiceEvent } from '$lib/CloudServiceCard.svelte';
	import EmptyCloudService from '$lib/EmptyCloudService.svelte';

	export let services: CloudService[];
	export let catalogs: Catalog[];

	function addControl(e: CustomEvent<CatalogEvent>) {
		var controls = catalogs[e.detail.catalogIdx].controls ?? [];

		if (catalogs[e.detail.catalogIdx].controls == null) {
			catalogs[e.detail.catalogIdx].controls = [];
		}

		catalogs[e.detail.catalogIdx].controls = [...controls];
	}

	function removeControl(e: CustomEvent<CatalogEvent>) {
		var controls = catalogs[e.detail.catalogIdx].controls;

		catalogs[e.detail.catalogIdx].controls = controls.filter(
			(_r, idx) => idx != e.detail.controlIdx
		);
	}

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
