<script lang="ts">
	import { Button, Card, Collapse } from 'sveltestrap';

	import type { MetricConfiguration } from './assessment';
	export let config: MetricConfiguration;
	let isOpen = false;
</script>

{#if config}
	<Button color="primary" on:click={() => (isOpen = !isOpen)}>Show Cofiguration</Button>
	<Collapse {isOpen}>
		<Card body class="mt-2">
			<pre>Operator:     {config.operator}</pre>
			<pre>Target Value: {config.targetValue}</pre>
			<pre>Is Default:   {config.isDefault}</pre>
		</Card>
	</Collapse>
{:else}
	No configuration
{/if}
