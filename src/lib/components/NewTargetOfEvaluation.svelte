<script lang="ts">
import type { Catalog, CloudService, TargetOfEvaluation } from '$lib/orchestrator';
import { createEventDispatcher } from 'svelte';
import { Button, FormGroup, Input } from 'sveltestrap';

export let catalogs: Catalog[];
export let service: CloudService;

let target: TargetOfEvaluation = {
	cloudServiceId: service.id,
	catalogId: catalogs[0].id
};

const dispatch = createEventDispatcher<{ add: TargetOfEvaluation }>();

function submit() {
	dispatch('add', target);
}
</script>

<form on:submit|preventDefault={submit}>
	<FormGroup floating label="Target Catalog">
		<Input type="select" name="select" id="exampleSelect" bind:value={target.catalogId}>
			{#each catalogs as catalog}
				<option value={catalog.id}>{catalog.name}</option>
			{/each}
		</Input>
	</FormGroup>

	<FormGroup floating label="Assurance Level">
		<Input
			type="select"
			name="assuranceLevel"
			id="exampleSelect"
			bind:value={target.assuranceLevel}
		>
			<option value="">-</option>
			<option value="basic">basic</option>
			<option value="substantial">substantial</option>
			<option value="high">high</option>
		</Input>
	</FormGroup>

	<Button color={'primary'} type="submit">Add</Button>
	<Button color={'danger'}>Cancel</Button>
</form>
