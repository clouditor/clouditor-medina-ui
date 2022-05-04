<script lang="ts" context="module">
	import {
		listCertificates,
	} from '$lib/orchestrator';
	import type { Certificate } from '$lib/orchestrator';

	export let certificates: Certificate[];

	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ params, fetch, session, context }) {
		return listCertificates().then((certificates) => {
			return {
				props: {
					certificates: certificates
				}
			};
		});
	}
</script>

<script lang="ts">
	import {
		Col,
		Container,
		Row
	} from 'sveltestrap';
	import CertificateCard from '$lib/CertificateCard.svelte';
	import EmptyCertificate from '$lib/EmptyCertificate.svelte';
</script>

<h3>Certificates</h3>

<Container class="mt-4 ms-0 me-0">
	<Row cols={2} noGutters>
		{#each certificates as certificate, i}
			<Col>
				<CertificateCard
					{certificate}
				/>
			</Col>
		{/each}
		<EmptyCertificate />
	</Row>
</Container>