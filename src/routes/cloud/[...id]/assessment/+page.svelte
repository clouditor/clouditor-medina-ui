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
import { metrics, controls } from '$lib/stores';
import AssessmentResultRow from '$lib/components/AssessmentResultRow.svelte';

export let data: import('./$types').PageData;
// export let data: PageData;

let { results } = data;

let filterCompliant: string;
let filterMetricCategory: string;
let filterMetric: string;
let filterResourceType: string;
let filterStartTimestamp: string | number | Date;
// let dateFilterStartTimestamp = new Date(filterStartTimestamp);
let filterEndTimestamp: string | number | Date;
// let dateFilterEndTimestamp = new Date(filterEndTimestamp);
let filterResourceID: string;


$: filteredResults = results.filter((r) => {
	let dateFilterStartTimestamp = new Date(filterStartTimestamp);
	let dateFilterEndTimestamp = new Date(filterEndTimestamp);

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
		(filterResourceType != ''
			? r.resourceTypes.map(name => name.toLocaleLowerCase()).includes(filterResourceType?.toLowerCase())
			: true) && 
		(filterStartTimestamp != ''
		 	? new Date(r.timestamp) > dateFilterStartTimestamp
			: true) &&
		(filterEndTimestamp != ''
		 	? new Date(r.timestamp) < dateFilterEndTimestamp
			: true) &&
		(filterResourceID != ''
			? r.resourceId.toLocaleLowerCase().includes(filterResourceID?.toLocaleLowerCase())
			: true)
	);
});

// getListOfControlCategories returns a string list of all metric categories
function getListOfControlCategories(): String[] {
	let categoryList: string[] = [];

	for (var val of $controls) {
		if (categoryList.includes(val.categoryName) == false) {
			categoryList.push(val.categoryName)
		}
	}

	return categoryList
}

// getListOfMetrics returns a string list of all metric_ids
function getListOfMetricIds(): String[] {
	let metricsList: string[] = [];

	for (var val of $metrics.values()) {
		if (metricsList.includes(val.id) == false) {
			metricsList.push(val.id)
		}
	}

	return metricsList
}

// getListOfResources returns a string list of all resource names of the given assessment_results
function getListOfResources(): String[] {
	let resourceList: string[] = [];

	for (var val of results) {
		const types = val.resourceTypes
		console.log("types: ", types)
		for (var elem of types) {
			console.log("type: ", elem)
			if (resourceList.includes(elem) == false) {
				resourceList.push(elem)
			}
		}
	}

	return resourceList
}

const categoryList = getListOfControlCategories()
const metricsList = getListOfMetricIds()
const resourceList = getListOfResources()
</script>

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
							<Label for="exampleEmail">Metric Category</Label>
							<Input type="select" name="metricCategory" id="metricCategory" bind:value={filterMetricCategory}>
								<option />
								{#each categoryList as value}
									<option value={value}>{value}</option>
								{/each}
							</Input>
						</FormGroup>
					</Col>
				</Row>
				<Row>
					<Col>
						<FormGroup>
							<Label for="exampleEmail">Metric</Label>
							<Input type="select" name="metric" id="metric" bind:value={filterMetric}>
								<option />
								{#each metricsList as value}
									<option value={value}>{value}</option>
								{/each}
							</Input>
						</FormGroup>
					</Col>
					<Col>
						<FormGroup>
							<Label for="exampleEmail">Resource Type</Label>
							<Input type="select" name="resourceType" id="resourceType" bind:value={filterResourceType}>
								<option />
								{#each resourceList as value}
									<option value={value}>{value}</option>
								{/each}
							</Input>
						</FormGroup>
					</Col>
					<Col>
						<FormGroup>
							<Label for="startTimestamp">Start Time</Label>
							<Input type="text" name="startTimestamp" id="startTimestamp" placeholder="2023-03-29" bind:value={filterStartTimestamp} />
						</FormGroup>
					</Col>
					<Col>
						<FormGroup>
							<Label for="endTimestamp">End Time</Label>
							<Input type="text" name="endTimestamp" id="endTimestamp" placeholder="2024-02-01T10:01" bind:value={filterEndTimestamp} />
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
