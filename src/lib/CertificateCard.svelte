<script lang="ts">
	import { Card, CardBody, CardHeader, CardText, ListGroup, ListGroupItem } from 'sveltestrap';
	import type { Certificate } from '$lib/orchestrator';

	export let certificate: Certificate;
</script>

<Card class="mb-3 me-3">
	<CardHeader><b>"{certificate.name}"</b></CardHeader>
	<CardBody>
		<CardText>
			<p>
				<b>ID:</b>
				{certificate.id} <br />
				<b>Name:</b>
				{certificate.name} <br />
				<b>Service ID:</b>
				{certificate.serviceId} <br />
				<b>Issue Date:</b>
				{certificate.issueDate} <br />
				<b>Expiration Date:</b>
				{certificate.expirationDate} <br />
				<b>Schema:</b>
				{certificate.standard} <br />
				<b>Assurance Level:</b>
				{certificate.assuranceLevel} <br />
				<b>CAB:</b>
				{certificate.cab} <br />
				<b>Description:</b>
				{certificate.description} <br />
			</p>
			<hr />
		</CardText>
		<b>State History</b>
		<ListGroup flush>
			{#each certificate.states as state}
				<ListGroupItem class="d-flex">
					<div class="ms-2 me-auto">
						<b>{state.state}</b>
					</div>
					<div class="ms-2 me-auto">
						{state.timestamp}
					</div>
					<div class="ms-2 me-auto">
						{state.treeId}
					</div>
				</ListGroupItem>
			{/each}
		</ListGroup>
	</CardBody>
</Card>
