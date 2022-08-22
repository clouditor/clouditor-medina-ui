<script lang="ts">
import {
	Card,
	CardBody,
	CardFooter,
	CardSubtitle,
	CardTitle,
	ListGroup,
	ListGroupItem
} from 'sveltestrap';
import { faWarehouse } from '@fortawesome/free-solid-svg-icons';
import Fa from 'svelte-fa';
import { trim } from '$lib/util';
import type { Resource } from '$lib/discovery';

export let resource: Resource;
</script>

<Card {...$$props}>
	<CardBody>
		<CardTitle>{resource.name}</CardTitle>
		<CardSubtitle class="text-muted mb-2">
			<Fa icon={faWarehouse} />
			{resource.type[0]}
		</CardSubtitle>
		Some fancy text here
		{#if resource.httpEndpoint?.transportEncryption}
			<ListGroup class="pt-2">
				<ListGroupItem
					>Algorithm: {resource.httpEndpoint?.transportEncryption.algorithm}</ListGroupItem
				>
				<ListGroupItem>Bravo</ListGroupItem>
				<ListGroupItem>Charlie</ListGroupItem>
				<ListGroupItem>Delta</ListGroupItem>
				<ListGroupItem>Echo</ListGroupItem>
				<ListGroupItem>Disabled</ListGroupItem>
			</ListGroup>
		{/if}
	</CardBody>
	<CardFooter class="text-muted">{trim(resource.id, 100)}</CardFooter>
</Card>
