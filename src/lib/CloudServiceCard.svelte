<script lang="ts" context="module">
	export interface CloudServiceEvent {
		serviceIdx: number;
		requirementIdx?: number;
		requirementId?: string;
	}

	export interface CloudServiceEventMap {
		'add-requirement': CloudServiceEvent;
		'remove-requirement': CloudServiceEvent;
		save: CloudServiceEvent;
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
	import type { CloudService, Requirement } from '$lib/orchestrator';
	import { requirements } from '$lib/stores';
	import { createEventDispatcher } from 'svelte';
	import Fa from 'svelte-fa';
	import { faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';

	export let service: CloudService;

	const dispatch = createEventDispatcher<CloudServiceEventMap>();

	var dirty = false;

	function addRequirement(req: Requirement) {
		if (dispatch('add-requirement', { serviceIdx: 0, requirementId: req.id })) {
			dirty = true;
		}
	}

	function removeRequirement(reqIdx: number): void {
		if (dispatch('remove-requirement', { serviceIdx: 0, requirementIdx: reqIdx })) {
			dirty = true;
		}
	}

	function save(): void {
		if (dispatch('save', { serviceIdx: 0 })) {
			dirty = false;
		}
	}
</script>

<Card class="mb-3 me-3">
	<CardHeader><b>{service.name}</b></CardHeader>
	<CardBody>
		<CardText>
			<p>
				{service.description}
			</p>
		</CardText>
		<CardSubtitle>Selected Requirements</CardSubtitle>
		<CardText>
			<ListGroup>
				{#each service.requirements?.requirementIds ?? [] as reqId, reqIdx}
					<ListGroupItem class="d-flex">
						<div class="ms-2 me-auto">
							{reqId}: {$requirements.get(reqId)?.name}
						</div>

						<Button on:click={(e) => removeRequirement(reqIdx)}>
							<Fa icon={faTrash} />
						</Button>
					</ListGroupItem>
				{/each}
			</ListGroup>
		</CardText>
		<Dropdown>
			<DropdownToggle caret>Add</DropdownToggle>
			<DropdownMenu>
				{#each Array.from($requirements.values()) as req}
					<DropdownItem on:click={(e) => addRequirement(req)}>
						{req.id}: {req.name}
					</DropdownItem>
				{/each}
			</DropdownMenu>
		</Dropdown>
		<Button disabled={!dirty} color="primary" on:click={(e) => save()}>Save</Button>
	</CardBody>
	<CardFooter>{service.id}</CardFooter>
</Card>
