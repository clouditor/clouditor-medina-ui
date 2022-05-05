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
				{certificate.id}
				{certificate.name}
                {certificate.service_id}
                {certificate.issue_date}
                {certificate.expiration_date}
                {certificate.standard}
                {certificate.assurance_level}
                {certificate.cab}
                {certificate.description}
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
