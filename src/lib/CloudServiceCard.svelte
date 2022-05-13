<script lang="ts" context="module">
	export interface CloudServiceEvent {
		serviceIdx: number;
		requirements: any[];
	}

	export interface CloudServiceEventMap {
		'add-requirements': CloudServiceEvent;
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
	import type { CloudService } from '$lib/orchestrator';
	import { requirements } from '$lib/stores';
	import { createEventDispatcher } from 'svelte';
	import Fa from 'svelte-fa';
	import { faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';

	export let service: CloudService;

	const dispatch = createEventDispatcher<CloudServiceEventMap>();

	var available_requirements = Array.from($requirements.values())
	let selected_requirements = []

	function handleAdd(requirement) {
		selected_requirements.push(requirement)
		selected_requirements = selected_requirements;
	}

	function handleRemove(requirement) {
		selected_requirements.splice(requirement)
		selected_requirements = selected_requirements;
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
				{#each selected_requirements as req}
					<ListGroupItem class="d-flex">
						{req.id}: {req.name}
						<Button on:click={(e) => handleRemove(req)}>
							<Fa icon={faTrash} />
						</Button>
					</ListGroupItem>
				{/each}
			</ListGroup>
		</CardText>
		<Dropdown>
			<DropdownToggle caret>Add</DropdownToggle>
			<DropdownMenu>
				{#each available_requirements as req, reqIdx}
					<DropdownItem on:click={(e) => handleAdd(req)}>{req.id}: {req.name}</DropdownItem>
				{/each}
			</DropdownMenu>
		</Dropdown>
		<Button color=primary on:click={(e) => dispatch('add-requirements', {serviceIdx: 0, requirements: selected_requirements})}>
			Update
		</Button>
	</CardBody>
	<CardFooter>{service.id}</CardFooter>
</Card>
