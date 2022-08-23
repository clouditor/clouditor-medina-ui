<script lang="ts" context="module">
export interface CloudServiceEvent {
	serviceIdx: number;
	requirementIdx?: number;
	requirementId?: string;
}

export interface CatalogEvent {
	catalogIdx: number;
	controlIdx?: number;
	controlId?: string;
}

export interface CatalogEventMap {
	'add-control': CatalogEvent;
	'remove-control': CatalogEvent;
	save: CatalogEvent;
}
</script>

<script lang="ts">
import { Card, CardBody, CardHeader, CardText } from 'sveltestrap';
import type { CloudService } from '$lib/orchestrator';

export let service: CloudService;
</script>

<Card class="mb-3 me-3">
	<CardHeader><a href="/cloud/{service.id}"><b>{service.name}</b></a></CardHeader>
	<CardBody>
		<CardText>
			<p>
				{service.description}
			</p>
		</CardText>
	</CardBody>
</Card>
