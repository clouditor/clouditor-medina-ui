<script lang="ts">
import { invalidate } from '$app/navigation';
import NewTargetOfEvaluation from '$lib/components/NewTargetOfEvaluation.svelte';
import { createTargetOfEvaluation, type TargetOfEvaluation } from '$lib/orchestrator';

export let data: import('./$types').PageData;

$: availableCatalogs = data.catalogs.filter((catalog) => {
	return !data.targets.map((target) => target.catalogId).includes(catalog.id);
});

async function add(event: CustomEvent<TargetOfEvaluation>) {
	let _ = await createTargetOfEvaluation(event.detail);

	// Invalidate the cloud services's target of evaluation list
	invalidate(`/v1/orchestrator/cloud_services/${data.service.id}/toes`);
}
</script>

Targets: {JSON.stringify(data.targets)}

<hr />
{#if availableCatalogs.length > 0}
	<h4>Create new evaluation target</h4>

	<NewTargetOfEvaluation service={data.service} catalogs={availableCatalogs} on:add={add} />
{/if}
