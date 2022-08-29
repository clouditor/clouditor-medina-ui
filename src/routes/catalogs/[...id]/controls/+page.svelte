<script lang="ts">

export let data: import('./$types').PageData;

</script>

<div>
	<ol>
		{#each data.catalog.controls as control}
			<li>{control.id}</li>
			<li>{control.name}</li>
			<li>{control.description}</li>
			<li>{control.category}</li>
			<li>{control.metricIds}</li>
		{/each}
  	</ol> 
</div>