<script lang="ts">
import {
	Card,
	CardBody,
	CardHeader,
	Col,
	Container,
	Form,
	FormGroup,
	Input,
	Label,
	Row,
	Table,
} from 'sveltestrap';
import type { PageData } from './$types';
import { metrics } from '$lib/stores';
import AssessmentResultRow from '$lib/components/AssessmentResultRow.svelte';

export let data: PageData;

let { results } = data;

let filterCompliant;
let filterMetricCategory;
let filterMetric;
let filterResourceType;
let filterResourceID;

$: filteredResults = results.filter((r) => {
	return (
		(filterCompliant != '' ? (r.compliant == (filterCompliant == 'true') ? true : false) : true) &&
		(filterMetricCategory != ''
			? $metrics
					.get(r.metricId)
					?.category?.toLowerCase()
					?.includes(filterMetricCategory?.toLowerCase())
			: true) &&
		(filterMetric != ''
			? $metrics.get(r.metricId)?.name?.toLowerCase()?.includes(filterMetric?.toLowerCase())
			: true) &&
		(filterResourceID != ''
			? r.resourceId.toLocaleLowerCase().includes(filterResourceID?.toLocaleLowerCase())
			: true)
	);
});
</script>

<h2>Security Assessment Results</h2>

The following list contains all assessment results, sorted by timestamp.

<Card style="width: 800px" class="mt-2">
	<CardHeader>
		<b>Filter results</b>
	</CardHeader>
	<CardBody>
		<Form>
			<Container>
				<Row>
					<Col>
						<FormGroup>
							<Label for="compliant">Compliant</Label>
							<Input type="select" name="select" id="compliant" bind:value={filterCompliant}>
								<option />
								<option value="true">Compliant</option>
								<option value="false">Not compliant</option>
							</Input>
						</FormGroup>
					</Col>
					<Col>
						<FormGroup>
							<Label for="metricCategory">Metric Category</Label>
							<Input
								type="text"
								name="metric-category"
								id="metricCateglory"
								bind:value={filterMetricCategory}
							/>
						</FormGroup>
					</Col>
				</Row>
				<Row>
					<Col>
						<FormGroup>
							<Label for="metric">Metric</Label>
							<Input type="text" name="metric" id="metric" bind:value={filterMetric} />
						</FormGroup>
					</Col>
					<Col>
						<FormGroup>
							<Label for="resourceType">Resource Type</Label>
							<Input type="text" name="resourceType" id="resourceType" bind:value={filterResourceType} />
						</FormGroup>
					</Col>
					<Col>
						<FormGroup>
							<Label for="resourceType">Resource ID</Label>
							<Input type="text" name="resourceID" id="resourceID" bind:value={filterResourceID} />
						</FormGroup>
					</Col>
					<Col />
				</Row>
			</Container>
		</Form>
	</CardBody>
</Card>

{#if results}
	<Table hover striped class="mt-2">
		<thead>
			<tr>
				<th style="text-align: center">Compliant</th>
				<th>Date</th>
				<th>Resource ID</th>
				<th>Resource Type</th>
				<th>Metric</th>
				<th>Metric Category</th>
				<th>Non-compliance comment</th>
				<th>More info</th>
			</tr>
		</thead>
		<tbody>
			{#each filteredResults as result, index}
				<AssessmentResultRow {result} {index} />
			{/each}
		</tbody>
	</Table>
{:else}
	Loading...
{/if}
