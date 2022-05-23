<script lang="ts">
	import { Button, Card, Collapse } from 'sveltestrap';

	import type { MetricImplementation } from './assessment';
	export let impl: MetricImplementation;
	let isOpen = false;
</script>

{#if impl}
	<p>Language: {impl.lang}</p>
	<Button color="primary" on:click={() => (isOpen = !isOpen)}>Show Code</Button>
	<Collapse {isOpen}>
		<Card body class="mt-2">
			<pre><code>{impl.code}</code></pre>
		</Card>
	</Collapse>
{:else}
	No implementation
{/if}
