<script lang="ts" context="module">
	import { requirements } from '$lib/stores';
	import { listCloudServices, listRequirements, updateCloudService } from '$lib/orchestrator';
	import type { CloudService } from '$lib/orchestrator';
	import { redirectLogin } from '$lib/oauth';

	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ params, fetch, session, context }) {
		// TODO(oxisto): this should be moved to more central component
		listRequirements()
			.then((list) => {
				for (let requirement of list) {
					// update requirements store
					requirements.update((r) => r.set(requirement.id, requirement));
				}
			})
			.catch(() => {
				// ignore, we will catch it later
			});

		return listCloudServices()
			.then((services) => {
				return {
					props: {
						services: services
					}
				};
			})
			.catch(() => {
				return redirectLogin();
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
	import CloudServiceCard from '$lib/CloudServiceCard.svelte';
	import type { CloudServiceEvent } from '$lib/CloudServiceCard.svelte';
	import EmptyCloudService from '$lib/EmptyCloudService.svelte';

	export let services: CloudService[];

	function addRequirement(e: CustomEvent<CloudServiceEvent>) {
		const reqId = e.detail.requirementId;

		var requirements = services[e.detail.serviceIdx].requirements?.requirementIds ?? [];

		if (services[e.detail.serviceIdx].requirements == null) {
			services[e.detail.serviceIdx].requirements = { requirementIds: [] };
		}

		services[e.detail.serviceIdx].requirements.requirementIds = [...requirements, reqId];
	}

	function removeRequirement(e: CustomEvent<CloudServiceEvent>) {
		var requirements = services[e.detail.serviceIdx].requirements.requirementIds;

		services[e.detail.serviceIdx].requirements.requirementIds = requirements.filter(
			(_r, idx) => idx != e.detail.requirementIdx
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
					on:add-requirement={addRequirement}
					on:remove-requirement={removeRequirement}
					on:save={save}
				/>
			</Col>
		{/each}
		<EmptyCloudService />
	</Row>
</Container>
