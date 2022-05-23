<script lang="ts" context="module">
	import { metrics } from '$lib/stores';
	import type { AssessmentResult } from '$lib/assessment';
	import { listMetrics, listAssessmentResults } from '$lib/orchestrator';
	import { redirectLogin } from '$lib/oauth';

	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ params, fetch, session, context }) {
		listMetrics()
			.then((list) => {
				for (let metric of list) {
					// update metrics store
					metrics.update((m) => m.set(metric.id, metric));
				}
			})
			.catch(() => {
				// ignore, we will catch it later
			});

		return listAssessmentResults()
			.then((results) => {
				results = results.sort((a: AssessmentResult, b: AssessmentResult) => {
					return new Date(a.timestamp) > new Date(b.timestamp) ? -1 : 1;
				});
				return {
					props: {
						results: results
					}
				};
			})
			.catch(() => {
				return redirectLogin('/assessment');
			});
	}
</script>

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
		Tooltip
	} from 'sveltestrap';
	import Fa from 'svelte-fa';
	import { faSquareCheck, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
	import { getEvidence } from '$lib/evidence';

	export let results: AssessmentResult[];
	let filterCompliant;
	let filterMetricCategory;
	let filterMetric;

	function short(resourceID: string) {
		// Split resource by / and take the last index
		const rr = resourceID.split('/');

		return rr[rr.length - 1];
	}

	$: filteredResults = results.filter((r) => {
		return (
			(filterCompliant != ''
				? r.compliant == (filterCompliant == 'true')
					? true
					: false
				: true) &&
			(filterMetricCategory != ''
				? $metrics
						.get(r.metricId)
						?.category?.toLowerCase()
						?.includes(filterMetricCategory?.toLowerCase())
				: true) &&
			(filterMetric != ''
				? $metrics.get(r.metricId)?.name?.toLowerCase()?.includes(filterMetric?.toLowerCase())
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
							<Label for="exampleEmail">Metric Category</Label>
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
							<Label for="exampleEmail">Metric</Label>
							<Input type="text" name="metric" id="metric" bind:value={filterMetric} />
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
			</tr>
		</thead>
		<tbody>
			{#each filteredResults as result, i}
				<tr>
					<td style="text-align: center">
						{#if result.compliant}
							<Fa id={`compliant-${i}`} icon={faSquareCheck} color="green" />
							<Tooltip target={`compliant-${i}`}>Resource is compliant to metric</Tooltip>
						{:else}
							<Fa id={`compliant-${i}`} icon={faTriangleExclamation} color="darkred" />
							<Tooltip target={`compliant-${i}`}>
								Resource is not compliant: Metric {$metrics.get(result.metricId)?.name ?? 'Unknown'}
								was not {result.metricConfiguration.operator}
								{result.metricConfiguration.targetValue}
							</Tooltip>
						{/if}
					</td>
					<td
						>{new Date(result.timestamp).toLocaleDateString()}&nbsp;{new Date(
							result.timestamp
						).toLocaleTimeString()}</td
					>
					<td>
						<span id={`resource-${i}`} style="cursor: pointer">{short(result.resourceId)}</span>
						<Tooltip target={`resource-${i}`} placement="bottom">{result.resourceId}</Tooltip>
					</td>
					<td>
						<span id={`resource-type-${i}`} style="cursor: pointer">{result.resourceTypes[0]}</span>
						<Tooltip target={`resource-type-${i}`}>{result.resourceTypes.join(' <- ')}</Tooltip>
					</td>
					<td>
						{$metrics.get(result.metricId)?.name ?? 'Unknown'}
					</td>
					<td>
						{$metrics.get(result.metricId)?.category ?? 'Unknown'}
					</td>
				</tr>
			{/each}
		</tbody>
	</Table>
{:else}
	Loading...
{/if}
