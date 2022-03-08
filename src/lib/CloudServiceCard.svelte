<script lang="ts" context="module">
	export interface CloudServiceEvent {
		serviceIdx: number;
		requirementIdx?: number;
	}

	export interface CloudServiceEventMap {
		'add-requirement': CloudServiceEvent;
		'remove-requirement': CloudServiceEvent;
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
		ListGroup,
		ListGroupItem
	} from 'sveltestrap';
	import type { CloudService } from '$lib/orchestrator';
	import { requirements } from '$lib/stores';
	import { createEventDispatcher } from 'svelte';
	import Fa from 'svelte-fa';
	import { faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';

	export let service: CloudService;

	const dispatch = createEventDispatcher<CloudServiceEventMap>();
</script>

<Card class="mb-3 me-3">
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

						<Button
							on:click={(e) =>
								dispatch('remove-requirement', { serviceIdx: 0, requirementIdx: reqIdx })}
						>
							<Fa icon={faTrash} />
						</Button>
					</ListGroupItem>
				{/each}
			</ListGroup>
			<Button class="mt-2" on:click={(e) => dispatch('add-requirement', { serviceIdx: 0 })}>
				<Fa icon={faPlus} />
			</Button>
		</CardText>
		<Button disabled>
			<Fa icon={faTrash} />
		</Button>
	</CardBody>
	<CardFooter>{service.id}</CardFooter>
</Card>
