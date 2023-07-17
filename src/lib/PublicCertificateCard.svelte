<script lang="ts">
import { Card, CardBody, CardHeader, CardText } from 'sveltestrap';
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
				{certificate.cloudServiceId} <br />
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
	</CardBody>
</Card>
