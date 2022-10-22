<script lang="ts">
import type { Control } from '../orchestrator';

export let control: Control;
export let index: number;
</script>

<tr>
	<td>{control.id}</td>
	<td>{control.name}</td>
	<td>{control.description}</td>
	<td>{control.metrics.map((m) => m.id).join(',')}</td>
</tr>
