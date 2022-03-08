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
	import Fa from 'svelte-fa';
	import { faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';

	export let services: CloudService[];

	function removeRequirement(serviceIdx, reqIdx) {
		var requirements = services[serviceIdx].requirements.requirementIds;

		services[serviceIdx].requirements.requirementIds = requirements.filter(
			(_r, idx) => idx != reqIdx
		);

		updateCloudService(services[serviceIdx]);
	}

	function addRequirement(serviceIdx) {
		const reqId = prompt('Enter a requirement id');

		if (reqId != '') {
			var requirements = services[serviceIdx].requirements?.requirementIds ?? [];

			if (services[serviceIdx].requirements == null) {
				services[serviceIdx].requirements = { requirementIds: [] };
			}

			services[serviceIdx].requirements.requirementIds = [...requirements, reqId];

			updateCloudService(services[serviceIdx]);
		}
	}
</script>

<h3>Target Cloud Services</h3>

The following page can be used to configure Cloud services.

<Container class="mt-4 ms-0 me-0">
	<Row cols={2} noGutters>
		{#each services as service, i}
			<Col>
				<Card class="mb-3">
					<CardHeader><b>{service.name}</b></CardHeader>
					<CardBody>
						<CardText>
							<p>
								{service.description}
							</p>
						</CardText>
						<CardSubtitle>Requirements in Scope</CardSubtitle>
						<CardText>
							<ListGroup flush>
								{#each service.requirements?.requirementIds ?? [] as reqId, reqIdx}
									<ListGroupItem class="d-flex">
										<div class="ms-2 me-auto">
											{reqId}: {$requirements.get(reqId)?.name}
										</div>

										<Button on:click={() => removeRequirement(i, reqIdx)}>
											<Fa icon={faTrash} />
										</Button>
									</ListGroupItem>
								{/each}
							</ListGroup>
							<Button class="mt-2" on:click={() => addRequirement(i)}><Fa icon={faPlus} /></Button>
						</CardText>
						<Button disabled>
							<Fa icon={faTrash} />
						</Button>
					</CardBody>
					<CardFooter>{service.id}</CardFooter>
				</Card>
			</Col>
		{/each}
	</Row>
</Container>
