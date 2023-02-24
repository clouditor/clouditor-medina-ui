<script lang="ts" context="module">
export interface ControlListDetail {
	target: TargetOfEvaluation;
	controlUrls: string[];
}

export interface ControlInScopeDetail {
	target: TargetOfEvaluation;
	controlInScope: ControlInScope;
}
</script>

<script lang="ts">
import { controlUrl, controlUrl2, type Catalog, type ControlInScope } from '$lib/orchestrator';
import { Button, Input, Modal, ModalBody, ModalFooter, ModalHeader } from 'sveltestrap';
import { controls } from '$lib/stores';
import type { TargetOfEvaluation } from '$lib/orchestrator';
import { createEventDispatcher } from 'svelte';

export let open;
export let toggle;
export let target: TargetOfEvaluation;
export let scope: ControlInScope[];
export let catalog: Catalog;

$: controlsInScopeUrls = scope.map((cis) => controlUrl2(cis, target.catalogId));

// Based on the list of all controls, we first need to filter
//  - the ones that are in the target catalog
//  - TODO: actually only filter those that are within the assurance level
//  - are in scope
$: controlsInScope = $controls
	.filter((c) => c.categoryCatalogId == target.catalogId)
	.filter((c) => {
		return controlsInScopeUrls.includes(controlUrl(c, c.categoryCatalogId));
	});

// Based on the list of all controls, we first need to filter
//  - the ones that are in the target catalog
//  - TODO: actually only filter those that are within the assurance level
//  - are NOT in scope
$: controlsNotInScope = $controls
	.filter((c) => c.categoryCatalogId == target.catalogId)
	.filter((c) => {
		return !controlsInScopeUrls.includes(controlUrl(c, c.categoryCatalogId));
	});

let controlsToAdd = [];
let controlsToRemove = [];

const dispatch = createEventDispatcher<{
	add: ControlListDetail;
	remove: ControlListDetail;
	change: ControlInScopeDetail;
}>();

function add() {
	dispatch('add', { target: target, controlUrls: controlsToAdd });
}

function remove() {
	dispatch('remove', { target: target, controlUrls: controlsToRemove });
}

function change(idx: number, ev: Event) {
	const select = ev.target as HTMLSelectElement;
	let updatedScope = {
		targetOfEvaluationCloudServiceId: scope[idx].targetOfEvaluationCloudServiceId,
		targetOfEvaluationCatalogId: scope[idx].targetOfEvaluationCatalogId,
		controlId: scope[idx].controlId,
		controlCategoryName: scope[idx].controlCategoryName,
		controlCategoryCatalogId: scope[idx].controlCategoryCatalogId,
		monitoringStatus: select.value
	};

	dispatch('change', { target: target, controlInScope: updatedScope });
}
</script>

<Modal isOpen={open} {toggle} size="xl">
	<ModalHeader {toggle}>Controls in Scope {catalog.name}</ModalHeader>
	<ModalBody>
		<div class="container">
			<!-- Hide add/remove of controls if catalog has all controls in scope  -->
			{#if !catalog.allInScope}
				<div class="row">
					<div class="col-sm">
						<select
							class="form-control"
							name="controls"
							id="controls"
							multiple
							bind:value={controlsToAdd}
						>
							{#each controlsNotInScope as control}
								<option value={controlUrl(control, target.catalogId)}>
									{#if control.parentControlId != null}&nbsp;{/if}
									{control.id}: {control.name}
								</option>
							{/each}
						</select>
					</div>
					<div class="col-sm">
						<Button on:click={add}>add</Button>
						<Button on:click={remove}>remove</Button>
					</div>
					<div class="col-sm">
						<select
							class="form-control"
							name="selected-controls"
							id="selected-controls"
							multiple
							bind:value={controlsToRemove}
						>
							{#each controlsInScope as control}
								<option value={controlUrl(control, target.catalogId)}>
									{#if control.parentControlId != null}&nbsp;{/if}
									{control.id}: {control.name}
								</option>
							{/each}
						</select>
					</div>
				</div>
				<hr />
			{/if}
			<div class="row">
				<div class="col-sm">
					{#each controlsInScope as control}
						<Input
							type="text"
							name="control"
							id="control"
							value={control.name}
							disabled
							class="mb-3"
						/>
					{/each}
				</div>
				<div class="col-sm">
					{#each scope as scope, idx}
						<Input
							type="select"
							name="select"
							id="exampleSelect"
							class="mb-3"
							bind:value={scope.monitoringStatus}
							on:change={(e) => change(idx, e)}
						>
							<option value="MONITORING_STATUS_UNSPECIFIED">unspecified</option>
							<option value="MONITORING_STATUS_AUTOMATICALLY_MONITORED">
								automatically monitored
							</option>
							<option value="MONITORING_STATUS_MANUALLY_MONITORED">manually monitored</option>
							<option value="MONITORING_STATUS_DELEGATED">delegated</option>
						</Input>
					{/each}
				</div>
			</div>
		</div>
	</ModalBody>
	<ModalFooter>
		<Button color="primary" on:click={toggle}>Close</Button>
	</ModalFooter>
</Modal>
