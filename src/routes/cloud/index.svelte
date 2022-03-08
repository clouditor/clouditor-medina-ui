<script lang="ts" context="module">
	import { requirements } from '$lib/stores';
	import {
		CloudService,
		listCloudServices,
		listRequirements,
		updateCloudService
	} from '$lib/orchestrator';

	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ params, fetch, session, context }) {
		// TODO(oxisto): this should be moved to more central component
		listRequirements().then((list) => {
			for (let requirement of list) {
				// update requirements store
				requirements.update((r) => r.set(requirement.id, requirement));
			}
		});

		return listCloudServices().then((services) => {
			return {
				props: {
					services: services
				}
			};
		});
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
		Col,
		Container,
		ListGroup,
		ListGroupItem,
		Row
	} from 'sveltestrap';
	import CloudServiceCard, { CloudServiceEvent } from '$lib/CloudServiceCard.svelte';
	import EmptyCloudService from '$lib/EmptyCloudService.svelte';

	export let services: CloudService[];

	function removeRequirement(e: CustomEvent<CloudServiceEvent>) {
		var requirements = services[e.detail.serviceIdx].requirements.requirementIds;

		services[e.detail.serviceIdx].requirements.requirementIds = requirements.filter(
			(_r, idx) => idx != e.detail.requirementIdx
		);

		updateCloudService(services[e.detail.serviceIdx]);
	}

	function addRequirement(e: CustomEvent<CloudServiceEvent>) {
		const reqId = prompt('Enter a requirement id');

		if (reqId != '') {
			var requirements = services[e.detail.serviceIdx].requirements?.requirementIds ?? [];

			if (services[e.detail.serviceIdx].requirements == null) {
				services[e.detail.serviceIdx].requirements = { requirementIds: [] };
			}

			services[e.detail.serviceIdx].requirements.requirementIds = [...requirements, reqId];

			updateCloudService(services[e.detail.serviceIdx]);
		}
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
					on:add-requirement={addRequirement}
					on:remove-requirement={removeRequirement}
				/>
			</Col>
		{/each}
		<EmptyCloudService />
	</Row>
</Container>
