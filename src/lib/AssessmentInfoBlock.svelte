<script lang="ts">
	import { Button, Card, Collapse } from 'sveltestrap';

	import type { AssessmentResult } from './assessment';
	export let result: AssessmentResult;
	let isOpen = false;
</script>

	<Button color="primary" on:click={() => (isOpen = !isOpen)}>Show more info</Button>
	<Collapse {isOpen}>
		<Card body class="mt-2">
			<pre><code>Assessment Result ID: {result.id}</code></pre>
			<pre><code>Evidence ID:          {result.evidenceId}</code></pre>
		</Card>
	</Collapse>
