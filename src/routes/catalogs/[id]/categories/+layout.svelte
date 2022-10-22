<script lang="ts">
export let data: import('./$types').PageData;
import { page } from '$app/stores';
</script>

<div class="d-flex align-items-start">
	<ul class="nav nav-pills flex-column me-4">
		{#each data.catalog.categories as category}
			<li class="nav-item">
				<a
					class="nav-link"
					class:active={$page.routeId == 'cloud/[...id]/configuration'}
					aria-current="page"
					href="/catalogs/{data.catalog.id}/categories/{category.name}"
				>
					{category.name}
				</a>
			</li>
		{/each}
	</ul>
	<div class="flex-fill">
		<slot />
	</div>
</div>
