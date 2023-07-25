<script lang="ts">
import { Button, Form, Card, CardBody, CardText, FormGroup, Input } from 'sveltestrap';
import { editing } from '$lib/stores';
import type { CloudServiceDetail } from './CloudServiceCard.svelte';
import { createEventDispatcher } from 'svelte';
import type { CloudService } from './orchestrator';

let service: CloudService = { id: undefined, name: undefined };

let isEditing = false;
editing.subscribe((value) => {
	isEditing = value;
});

const dispatch = createEventDispatcher<{ save: CloudServiceDetail }>();

async function save() {
	dispatch('save', { service: service });
	service = { id: undefined, name: undefined };
	editing.set(false);
}

function discard() {
	service = { id: undefined, name: undefined };
	editing.set(false);
}
</script>

{#if !isEditing}
	<Card class="mb-3">
		<CardBody>
			<CardText>
				<div class="sign">
					<Button on:click={() => editing.set(true)} class="mt-2" color="primary">
						<div>Add service</div></Button
					>
				</div>
			</CardText>
		</CardBody>
	</Card>
{:else}
	<Form>
		<FormGroup floating label="Name">
			<Input placeholder="Enter a name" bind:value={service.name}  />
		</FormGroup>

		<FormGroup floating>
			<Input type="textarea" placeholder="Enter a description" bind:value={service.description} />
			<div slot="label">Description</div>
		</FormGroup>

		<Button color={'primary'} on:click={save}>Save</Button>
		<Button color={'danger'} on:click={discard}>Cancel</Button>
	</Form>
{/if}

<style lang="scss">
@import 'node_modules/bootstrap/scss/functions';
@import 'node_modules/bootstrap/scss/variables';
@import 'node_modules/bootstrap/scss/mixins';
.sign {
	text-align: center;
	vertical-align: middle;
	font-size: 40pt;
	padding-top: 7rem;
	color: $secondary;
}
</style>
