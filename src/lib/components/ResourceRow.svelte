<script lang="ts">
import type { Resource } from '$lib/discovery';
import { short } from '$lib/util';
import { Button, Card, Collapse, Tooltip } from 'sveltestrap';

export let resource: Resource;
export let i: number;

let isOpen = false;
</script>

<tr>
	<td>
		<span id={`resource-${i}`} style="cursor: pointer">{short(resource.id)}</span>
		<Tooltip target={`resource-${i}`} placement="bottom">{resource.id}</Tooltip>
	</td>
	<td>{resource.resourceType.split(",")[0]}</td>
	<td>
		<Button color="primary" on:click={() => (isOpen = !isOpen)}>Show more info</Button>
			<Collapse {isOpen}>
				<Card body class="mt-2">
					<pre>{JSON.stringify(resource, null, "    ")}</pre> 
				</Card>
			</Collapse>
	</td>
</tr>