<script lang="ts">
export let data: import('./$types').PageData;
</script>

<div class="h-100 p-5 bg-light border rounded-3">
	<h2>{data.service.name}</h2>
	<p>
		{data.service.description}
	</p>
	<a href="./{data.service.id}/configuration">
		<button class="btn btn-outline-secondary" type="button">Configure</button>
	</a>
</div>
