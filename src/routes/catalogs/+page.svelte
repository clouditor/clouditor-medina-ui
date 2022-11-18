<script lang="ts">
import { Col, Container, Row } from 'sveltestrap';
import CatalogCard from '$lib/CatalogCard.svelte';
import type { PageData } from './$types';

export let data: PageData;
</script>

<h3>Catalogs</h3>
{#if data.catalogs}
	<Container class="mt-4 ms-0 me-0">
		<Row cols={2} noGutters>
			{#each data.catalogs as catalog}
				<Col>
					<CatalogCard {catalog} />
				</Col>
			{/each}
		</Row>
	</Container>
{:else}
	Loading...
{/if}
