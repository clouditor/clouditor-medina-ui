<script lang="ts" context="module">
export interface ControlListDetail {
	target: TargetOfEvaluation;
	controlUrls: string[];
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

let controlsToAdd = [];
let controlsToRemove = [];

const dispatch = createEventDispatcher<{ add: ControlListDetail; remove: ControlListDetail }>();

function add() {
	dispatch('add', { target: target, controlUrls: controlsToAdd });
}

function remove() {
	dispatch('remove', { target: target, controlUrls: controlsToRemove });
}
</script>

<Modal isOpen={open} {toggle} size="xl">
	{JSON.stringify(controlsInScope)}
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
						{#each $controls.filter((c) => {
							return !controlsInScopeUrls.includes(controlUrl(c, target.catalogId));
						}) as control}
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
						{#each $controls.filter((c) => {
							return controlsInScopeUrls.includes(controlUrl(c, target.catalogId));
						}) as control}
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
					{#each $controls.filter((c) => {
						return controlsInScopeUrls.includes(controlUrl(c, target.catalogId));
					}) as control}
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
					{#each $controls.filter((c) => {
						return controlsInScopeUrls.includes(controlUrl(c, target.catalogId));
					}) as control}
						<Input type="select" name="select" id="exampleSelect" class="mb-3">
							<option>1</option>
							<option>2</option>
							<option>3</option>
							<option>4</option>
							<option>5</option>
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
