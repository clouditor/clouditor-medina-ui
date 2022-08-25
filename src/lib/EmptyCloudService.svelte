<script type="ts">
import { Button, Form, Card, CardBody, CardText } from 'sveltestrap';
import { editing } from '$lib/stores';
import { registerCloudService } from './orchestrator';

let serviceId = '';
let serviceName = '';
let serviceDescription = '';

let isEditing = false;
editing.subscribe((value) => {
	isEditing = value;
});

function save(): void {
	registerCloudService({
		id: serviceId,
		name: serviceName,
		description: serviceDescription
	});
	editing.set(false);
}
</script>

{#if !isEditing}
	<Card class="mb-3">
		<CardBody>
			<CardText>
				<div class="sign">
					<Button on:click={() => editing.set(true)} class="mt-2">
						<div value="true">Add service</div></Button
					>
				</div>
			</CardText>
		</CardBody>
	</Card>
{:else}
	<Form>
		<label for="serviceId" class="block text-sm text-gray-600">Service ID</label>
		<input
			id="serviceId"
			type="text"
			placeholder="service id"
			class="block px-1 py-2 mt-2 border-2 border-gray-100 text-gray-800"
			bind:value={serviceId}
		/>
		<br />
		<label for="serviceName" class="block text-sm text-gray-600">Service Name</label>
		<input
			id="serviceName"
			type="text"
			placeholder="service name"
			class="block px-1 py-2 mt-2 border-2 border-gray-100 text-gray-800"
			bind:value={serviceName}
		/>
		<br />
		<label for="serviceDescription" class="block text-sm text-gray-600 mt-4"
			>Service Description</label
		>
		<input
			id="serviceDescription"
			type="text"
			bind:value={serviceDescription}
			placeholder="service description"
			class="block px-1 py-2 mt-2 border-2 border-gray-100 text-gray-800"
		/>
		<br />
		<Button color="primary" on:click={(e) => save()} class="mt-2">Save</Button>
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
