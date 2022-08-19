<script lang="ts">
	import { Col, Container, Row } from 'sveltestrap';
	import CertificateCard from '$lib/CertificateCard.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	let { certificates } = data;
</script>

<h3>Certificates</h3>

{#if certificates}
	<Container class="mt-4 ms-0 me-0">
		<Row cols={2} noGutters>
			{#each certificates as certificate, i}
				<Col>
					<CertificateCard {certificate} />
				</Col>
			{/each}
		</Row>
	</Container>
{:else}
	No certificates issued yet.
{/if}
