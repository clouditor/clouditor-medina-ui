<script lang="ts">
	import { Button, Table, Tooltip} from 'sveltestrap';
	import { Chart, type ChartConfiguration, type ChartData, registerables } from 'chart.js';
	import { onMount } from 'svelte';
	import { startDiscovery, type Resource } from '$lib/discovery';
	import { short } from '$lib/util';
	
	export let data: import('./$types').PageData;
	
	let ctx: HTMLCanvasElement;
	
	Chart.register(...registerables);
	Chart.defaults.font.family =
		'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans", "Liberation Sans", Arial, sans-serif';
	const config: ChartConfiguration<'bar'> = {
		type: 'bar',
		data: chart(data.resources),
		options: {
			scales: {
				xAxes: {
					ticks: {
						callback: (value) => {
							if (Number(value) % 1 === 0) {
								return value;
							}
						}
					}
				}
			},
			plugins: {
				legend: {
					display: false
				}
			},
			indexAxis: 'y'
		}
	};
	
	onMount(() => {
		const myChart = new Chart(ctx, config);
	});
	
	function chart(resources: Resource[]): ChartData<'bar', number[], unknown> {
		let histogram = new Map<string, number>();
	
		// Loop through all resources and gather the necessary data. There is
		// probably some fancy mapping function that does that better.
		for (let resource of resources) {
			let type = resource.resourceType.split(",")[0];
			if (!histogram.has(type)) {
				histogram.set(type, 1);
			} else {
				histogram.set(type, histogram.get(type) + 1);
			}
		}
	
		console.log(histogram);
	
		return {
			labels: Array.from(histogram.keys()),
			datasets: [
				{
					//axis: 'y',
					label: 'Resource Type',
					data: Array.from(histogram.values()),
					//fill: false,
					backgroundColor: ['rgba(107, 52, 235)', 'rgb(235, 198, 52)'],
					borderWidth: 0
				}
			]
		};
	}
	
	function discover() {
		startDiscovery();
	}
	</script>
	<Button color="primary" class="mb-2" on:click={discover}>Start Discovery</Button>
	
	<canvas id="myChart" style="max-height: 100px" bind:this={ctx} />
	
	<Table hover>
		<thead>
			<tr>
				<th>Name</th>
				<th>Resource type</th>
				<th>Raw</th>
			</tr>
		</thead>
		<tbody>
			{#each data.resources as resource, i}
				<tr>
					<td>
						<span id={`resource-${i}`} style="cursor: pointer">{short(resource.id)}</span>
						<Tooltip target={`resource-${i}`} placement="bottom">{resource.id}</Tooltip>
					</td>
					<td>{resource.resourceType.split(",")[0]}</td>
					<td><pre>{JSON.stringify(resource)}</pre></td>
				</tr>
			{/each}
		</tbody>
	</Table>
	