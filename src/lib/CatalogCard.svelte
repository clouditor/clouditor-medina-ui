<script lang="ts">
import { Card, CardBody, CardHeader, CardText } from 'sveltestrap';
import type { Catalog } from './orchestrator';

export let catalog: Catalog;
</script>

<Card class="mb-3 me-3">
	<CardHeader><a href="/catalogs/{catalog.id}"><b>{catalog.name}</b></a></CardHeader>
	<CardBody>
		<CardText>
			<p>
				{catalog.description}
			</p>
		</CardText>
	</CardBody>
</Card>
