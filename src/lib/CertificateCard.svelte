<script lang="ts">
	import {
		Button,
		Card,
		CardBody,
		CardFooter,
		CardHeader,
		CardSubtitle,
		CardText,
		ListGroup,
		ListGroupItem
	} from 'sveltestrap';
	import type { Certificate } from '$lib/orchestrator';
	import Fa from 'svelte-fa';
	import { faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';

	export let certificate: Certificate;
</script>

<Card class="mb-3 me-3">
	<CardHeader><b>"{certificate.name}"</b></CardHeader>
	<CardBody>
		<CardText>
			<p>
				<b>ID:</b> {certificate.id}
			</p>
			<p>
				<b>Name:</b> {certificate.name}
                <b>Service ID:</b> {certificate.serviceId}
                <b>Issue Date:</b> {certificate.issueDate}
                <b>Expiration Date:</b> {certificate.expirationDate}
                <b>Schema:</b> {certificate.standard}
                <b>Assurance Level:</b> {certificate.assuranceLevel}
                <b>CAB:</b> {certificate.cab}
                <b>Description:</b> {certificate.description}
			</p>
		</CardText>
            <ListGroup flush>
                {#each certificate.states as state}
                    <ListGroupItem class="d-flex">
                        <div class="ms-2 me-auto">
                            {state.state}
                            {state.timestamp}
                            {state.treeId}
                        </div>
                    </ListGroupItem>
                {/each}
            </ListGroup>
	</CardBody>
</Card>
