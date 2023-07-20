<script lang="ts">
	import { Col, Container, Row, Alert } from 'sveltestrap';
	import PublicCertificateCard from '$lib/PublicCertificateCard.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	let { certificates } = data;
</script>

<h3>Certificates</h3>
<Alert color=warning>
	<h4 class="alert-heading">Disclaimer: This site only shows example certificates that are used for research purposes. 
		They do not represent valid certifications.</h4>
</Alert>

{#if certificates}
	<Container class="mt-4 ms-0 me-0">
		<Row cols={2} noGutters>
			{#each certificates as certificate, i}
				<Col>
					<PublicCertificateCard {certificate} />
				</Col>
			{/each}
		</Row>
	</Container>
{:else}
	No certificates issued yet.
{/if}
