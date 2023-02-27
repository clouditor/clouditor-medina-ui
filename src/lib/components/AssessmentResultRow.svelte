<script lang="ts">
import type { AssessmentResult } from '$lib/assessment';
import { faSquareCheck, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import Fa from 'svelte-fa';
import { short } from '$lib/util';
import { Tooltip } from 'sveltestrap';
import { metrics } from '$lib/stores';
import AssessmentInfoBlock from '$lib/AssessmentInfoBlock.svelte';

export let result: AssessmentResult;
export let index: number;
</script>

<tr>
	<td style="text-align: center">
		{#if result.compliant}
			<Fa id={`compliant-${index}`} icon={faSquareCheck} color="green" />
			<Tooltip target={`compliant-${index}`}>Resource is compliant to metric</Tooltip>
		{:else}
			<Fa id={`compliant-${index}`} icon={faTriangleExclamation} color="darkred" />
			<Tooltip target={`compliant-${index}`}>
				Resource is not compliant: Metric {$metrics.get(result.metricId)?.name ?? 'Unknown'}
				was not {result.metricConfiguration.operator}
				{result.metricConfiguration.targetValue}
			</Tooltip>
		{/if}
	</td>
	<td>
		{new Date(result.timestamp).toLocaleDateString()}&nbsp;{new Date(
			result.timestamp
		).toLocaleTimeString()}
	</td>
	<td>
		<span id={`resource-${index}`} style="cursor: pointer">{short(result.resourceId)}</span>
		<Tooltip target={`resource-${index}`} placement="bottom">{result.resourceId}</Tooltip>
	</td>
	<td>
		<span id={`resource-type-${index}`} style="cursor: pointer">{result.resourceTypes[0]}</span>
		<Tooltip target={`resource-type-${index}`}>{result.resourceTypes.join(' <- ')}</Tooltip>
	</td>
	<td>
		{$metrics.get(result.metricId)?.name ?? 'Unknown'}
	</td>
	<td>
		{$metrics.get(result.metricId)?.category ?? 'Unknown'}
	</td>
	<td>
		{result.nonComplianceComments ?? 'Unknown'}
	<td>
		<AssessmentInfoBlock {result} />
	</td>
</tr>
