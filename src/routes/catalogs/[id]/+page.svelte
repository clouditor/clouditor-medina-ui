<script lang="ts">
export let data: import('./$types').PageData;
</script>

<div class="h-100 p-5 bg-light border rounded-3">
	<h2>{data.catalog.name}</h2>
	<p>
		{data.catalog.description}
	</p>
	<a href="./{data.catalog.id}/controls">
		<button class="btn btn-outline-secondary" type="button">Controls</button>
	</a>
</div>
