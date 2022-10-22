<script lang="ts">
import { controls } from '$lib/stores';

export let data: import('./$types').PageData;
</script>

<ul>
	{#each data.controls as control}
		<li>{control.id}</li>
	{/each}
</ul>
