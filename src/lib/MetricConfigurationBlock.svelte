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
			<pre><code>Operator:     {config.operator}</code></pre>
			<pre><code>Target Value: {config.targetValue}</code></pre>
			<pre><code>Is Default:   {config.isDefault}</code></pre>
		</Card>
	</Collapse>
{:else}
	No configuration
{/if}
