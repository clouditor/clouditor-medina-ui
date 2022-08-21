<script lang="ts">
import type { PageData } from './$types';
import { Badge, Button, Form, FormGroup, Input, Label } from 'sveltestrap';
import { updateCloudService } from '$lib/orchestrator';
export let data: PageData;

let { service } = data;

function save(event) {
	updateCloudService(service);
}
</script>

<FormGroup floating label="Name">
	<Input placeholder="Enter a name" bind:value={service.name} />
</FormGroup>

<FormGroup floating>
	<Input type="textarea" placeholder="Enter a description" bind:value={service.description} />
	<div slot="label">Description</div>
</FormGroup>

<Button color={'primary'} on:click={save}>Save</Button>
