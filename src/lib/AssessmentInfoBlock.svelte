<script lang="ts">
	import { Button, Card, Collapse } from 'sveltestrap';

	import type { AssessmentResult } from './assessment';
	import { getEvidence, type Evidence } from './evidence';
	export let result: AssessmentResult;
	let isOpen = false;
</script>

	<Button color="primary" on:click={() => (isOpen = !isOpen)}>Show more info</Button>
	<Collapse {isOpen}>
		<Card body class="mt-2">
			<pre>Assessment Result ID: {result.id}</pre>
			<pre>Evidence ID:          {result.evidenceId}</pre>
			{#await getEvidence(result.evidenceId) then evidence}
			<pre>Evidence Tool ID:     {evidence.toolId}</pre>
			{/await}
		</Card>
	</Collapse>
