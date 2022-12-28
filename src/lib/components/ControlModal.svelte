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
import { controlUrl, controlUrl2, type ControlInScope } from '$lib/orchestrator';
import { Button, Input, Modal, ModalBody, ModalFooter, ModalHeader } from 'sveltestrap';
import { controls } from '$lib/stores';
import type { TargetOfEvaluation } from '$lib/orchestrator';
import { createEventDispatcher } from 'svelte';

export let open;
export let toggle;
export let target: TargetOfEvaluation;
export let controlsInScope: ControlInScope[];

$: controlsInScopeUrls = controlsInScope.map((cis) => controlUrl2(cis, target.catalogId));

$: controls1 = $controls.filter((c) => {
	return controlsInScopeUrls.includes(controlUrl(c, target.catalogId));
});

$: controls2 = $controls.filter((c) => {
	return !controlsInScopeUrls.includes(controlUrl(c, target.catalogId));
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
	let scope = {
		targetOfEvaluationCloudServiceId: controlsInScope[idx].targetOfEvaluationCloudServiceId,
		targetOfEvaluationCatalogId: controlsInScope[idx].targetOfEvaluationCatalogId,
		controlId: controlsInScope[idx].controlId,
		controlCategoryName: controlsInScope[idx].controlCategoryName,
		controlCategoryCatalogId: controlsInScope[idx].controlCategoryCatalogId,
		monitoringStatus: select.value
	};

	dispatch('change', { target: target, controlInScope: scope });
}
</script>

<Modal isOpen={open} {toggle} size="xl">
	<ModalHeader {toggle}>Controls in Scope</ModalHeader>
	<ModalBody>
		<div class="container">
			<div class="row">
				<div class="col-sm">
					<select
						class="form-control"
						name="controls"
						id="controls"
						multiple
						bind:value={controlsToAdd}
					>
						{#each controls2 as control}
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
						{#each controls1 as control}
							<option value={controlUrl(control, target.catalogId)}>
								{#if control.parentControlId != null}&nbsp;{/if}
								{control.id}: {control.name}
							</option>
						{/each}
					</select>
				</div>
			</div>
			<hr />
			<div class="row">
				<div class="col-sm">
					{#each controls1 as control}
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
					{#each controls1 as control, idx}
						<Input
							type="select"
							name="select"
							id="exampleSelect"
							class="mb-3"
							bind:value={controlsInScope[idx].monitoringStatus}
							on:change={(e) => change(idx, e)}
						>
							<option value="MONITORING_STATUS_UNSPECIFIED">unspecified</option>
							<option value="MONITORING_STATUS_CONTINUOUSLY_MONITORED">
								continuously monitored
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
		<Button color="primary" on:click={toggle}>Do Something</Button>
		<Button color="secondary" on:click={toggle}>Cancel</Button>
	</ModalFooter>
</Modal>
