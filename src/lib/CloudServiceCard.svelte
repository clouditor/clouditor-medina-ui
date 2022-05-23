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
	import { derived } from 'svelte/store';

	export let service: CloudService;

	const dispatch = createEventDispatcher<CloudServiceEventMap>();

	var dirty = false;

	function groupBy(arr: Iterable<Requirement>, property) {
		var grouped = new Map<String, Array<Requirement>>();
		for (let value of arr) {
			var p = value[property];
			if (!grouped.has(p)) {
				grouped.set(p, []);
			}

			grouped.get(p).push(value);
		}
		return grouped;
	}

	const sortedRequirements = derived(requirements, (map) => {
		return groupBy(map.values(), 'category');
	});

	console.log($sortedRequirements);

	function addRequirement(req: Requirement) {
		dispatch('add-requirement', { serviceIdx: 0, requirementId: req.id });
		dirty = true;
	}

	function removeRequirement(reqIdx: number): void {
		dispatch('remove-requirement', { serviceIdx: 0, requirementIdx: reqIdx });
		dirty = true;
	}

	function isAlreadySelected(req: Requirement, service: CloudService) {
		return service?.requirements?.requirementIds.includes(req.id) ?? false;
	}

	function save(): void {
		dispatch('save', { serviceIdx: 0 });
		dirty = false;
	}

	function trim(s: string): string {
		const maxLength = 200;

		if (s.length < maxLength) {
			return s;
		} else {
			return s.substring(0, maxLength);
		}
	}

	let category = '';
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
			<ListGroup class="mt-2">
				{#each service.requirements?.requirementIds ?? [] as reqId, reqIdx}
					<ListGroupItem class="d-flex">
						<div class="ms-2 me-auto">
							{reqId}: {trim($requirements.get(reqId)?.description ?? '')}
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
				{#each [...$sortedRequirements] as [category, reqList], i}
					{#if i != 0}
						<DropdownItem divider />
					{/if}
					<DropdownItem header>{category}</DropdownItem>
					{#each reqList as req}
						<DropdownItem
							on:click={(e) => addRequirement(req)}
							disabled={isAlreadySelected(req, service)}
						>
							{req.id}: {trim(req.description)}
						</DropdownItem>
					{/each}
				{/each}
			</DropdownMenu>
		</Dropdown>
		<Button disabled={!dirty} color="primary" on:click={(e) => save()} class="mt-2">Save</Button>
	</CardBody>
	<CardFooter>{service.id}</CardFooter>
</Card>
