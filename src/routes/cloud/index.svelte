<script lang="ts" context="module">
	import { metrics } from '$lib/stores';
	import type { AssessmentResult } from '$lib/assessment';
	import {
		listMetrics,
		listAssessmentResults,
		CloudService,
		listCloudServices
	} from '$lib/orchestrator';

	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ params, fetch, session, context }) {
		return listCloudServices().then((services) => {
			return {
				props: {
					services: services
				}
			};
		});
	}
</script>

<script lang="ts">
	import {
		Button,
		Card,
		CardBody,
		CardFooter,
		CardHeader,
		CardSubtitle,
		CardText,
		CardTitle,
		Col,
		Container,
		Row
	} from 'sveltestrap';

	export let services: CloudService[];
</script>

<h3>Target Cloud Services</h3>

The following page can be used to configure Cloud services.

<Container class="mt-2">
	<Row cols={2}>
		{#each services as service, i}
			<Col>
				<Card class="mb-3">
					<CardHeader><b>{service.name}</b></CardHeader>
					<CardBody>
						<CardText>
							{service.description}
						</CardText>
						<Button>Remove</Button>
					</CardBody>
					<CardFooter>{service.id}</CardFooter>
				</Card>
			</Col>
		{/each}
	</Row>
</Container>
