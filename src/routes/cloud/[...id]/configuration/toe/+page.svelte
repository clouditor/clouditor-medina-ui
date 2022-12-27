<script lang="ts">
import { invalidate } from '$app/navigation';
import ControlModal, {
	type ControlInScopeDetail,
	type ControlListDetail
} from '$lib/components/ControlModal.svelte';
import NewTargetOfEvaluation from '$lib/components/NewTargetOfEvaluation.svelte';
import {
	addControlToScope,
	createTargetOfEvaluation,
	parseControlUrl,
	removeControlFromScope,
	updateControlInScope,
	type ControlInScope,
	type TargetOfEvaluation
} from '$lib/orchestrator';
import { Button, Card, CardBody, CardHeader } from 'sveltestrap';

export let data: import('./$types').PageData;

$: availableCatalogs = data.catalogs.filter((catalog) => {
	return !data.targets.map((target) => target.catalogId).includes(catalog.id);
});

async function add(event: CustomEvent<TargetOfEvaluation>) {
	let target = await createTargetOfEvaluation(event.detail);

	// invalidate the cloud services's target of evaluation list
	invalidate(`/v1/orchestrator/cloud_services/${target.cloudServiceId}/toes`);
}

async function addSelectedControls(event: CustomEvent<ControlListDetail>) {
	for (let url of event.detail.controlUrls) {
		let [catalogId, categoryName, controlId] = parseControlUrl(url);

		let scope: ControlInScope = {
			targetOfEvaluationCatalogId: event.detail.target.catalogId,
			targetOfEvaluationCloudServiceId: event.detail.target.cloudServiceId,
			controlId: controlId,
			controlCategoryName: categoryName,
			controlCategoryCatalogId: catalogId,
			monitoringStatus: 'MONITORING_STATUS_UNSPECIFIED'
		};

		scope = await addControlToScope(scope);

		invalidate(
			`/v1/orchestrator/cloud_services/${scope.targetOfEvaluationCloudServiceId}/toes/${scope.targetOfEvaluationCatalogId}/controls_in_scope`
		);
	}
}

async function removeSelectedControls(event: CustomEvent<ControlListDetail>) {
	for (let url of event.detail.controlUrls) {
		let [catalogId, categoryName, controlId] = parseControlUrl(url);

		let scope: ControlInScope = {
			targetOfEvaluationCatalogId: event.detail.target.catalogId,
			targetOfEvaluationCloudServiceId: event.detail.target.cloudServiceId,
			controlId: controlId,
			controlCategoryName: categoryName,
			controlCategoryCatalogId: catalogId,
			monitoringStatus: 'MONITORING_STATUS_UNSPECIFIED'
		};

		await removeControlFromScope(scope);

		invalidate(
			`/v1/orchestrator/cloud_services/${scope.targetOfEvaluationCloudServiceId}/toes/${scope.targetOfEvaluationCatalogId}/controls_in_scope`
		);
	}
}

async function changeControl(event: CustomEvent<ControlInScopeDetail>) {
	const scope = event.detail.controlInScope;

	await updateControlInScope(scope);

	invalidate(
		`/v1/orchestrator/cloud_services/${scope.targetOfEvaluationCloudServiceId}/toes/${scope.targetOfEvaluationCatalogId}/controls_in_scope/categories/${scope.controlCategoryName}/controls/${scope.controlId}`
	);
}

let open = false;
const toggle = () => (open = !open);
</script>

{#each data.targets as target, idx}
	<Card>
		<CardHeader>{target.catalogId}</CardHeader>
		<CardBody>
			<p>Configured with assurance level {target.assuranceLevel}</p>

			<p>{target.controlsInScope.length} control(s) are in scope.</p>
			<Button color="danger" on:click={toggle}>Open Modal</Button>
			<ControlModal
				controlsInScope={data.scopes[idx]}
				{toggle}
				{open}
				{target}
				on:add={addSelectedControls}
				on:remove={removeSelectedControls}
				on:change={changeControl}
			/>
		</CardBody>
	</Card>
{/each}

<hr />
{#if availableCatalogs.length > 0}
	<h4>Create new evaluation target</h4>

	<NewTargetOfEvaluation service={data.service} catalogs={availableCatalogs} on:add={add} />
{/if}
