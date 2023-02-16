<script lang="ts">
import type { Catalog, CloudService, TargetOfEvaluation } from '$lib/orchestrator';
import { createEventDispatcher } from 'svelte';
import { Button, FormGroup, Input } from 'sveltestrap';

export let catalogs: Catalog[];
export let service: CloudService;

let target: TargetOfEvaluation = {
	cloudServiceId: service.id,
	catalogId: catalogs[0].id,
};

const dispatch = createEventDispatcher<{ add: TargetOfEvaluation }>();

function add() {
	dispatch('add', target);
}

function discard() {
	target.assuranceLevel = ""
}

function getAssuranceLevels(catalogId: string): string[] {
	for (var catalog of catalogs) {
		if (catalog.id == catalogId) {
			return catalog.assuranceLevels
		}
	}

	return {} as any;
}
</script>

<form>
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
			
			{#if getAssuranceLevels(target.catalogId).length > 0}
				<option value="{getAssuranceLevels(target.catalogId)[0]}">{getAssuranceLevels(target.catalogId)[0]}</option>
				<option value="{getAssuranceLevels(target.catalogId)[1]}">{getAssuranceLevels(target.catalogId)[1]}</option>
				<option value="{getAssuranceLevels(target.catalogId)[2]}">{getAssuranceLevels(target.catalogId)[2]}</option>
			{/if}
		</Input>
	</FormGroup>

	<Button color={'primary'} on:click={add}>Add</Button>
	<Button color={'danger'} on:click={discard}>Cancel</Button>
</form>
