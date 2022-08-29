<script lang="ts">
import { page } from '$app/stores';
export let data: import('./$types').LayoutData;

$: overviewActive = $page.routeId == 'catalogs/[...id]';
$: controlsActive = $page.routeId == 'catalogs/[...id]/controls';
</script>

<div class="pt-3 pb-0 bg-light">
	<ul class="nav nav-tabs">
		<li class="nav-item ps-2">
			<a class="nav-link" class:active={overviewActive} href="/catalogs/{data.catalog.id}">Overview</a>
		</li>
		<li class="nav-item">
			<a
				class="nav-link" class:active={controlsActive}
				href="/catalogs/{data.catalog.id}/controls">Controls</a
			>
		</li>
	</ul>
</div>
<div class="p-3">
	<slot />
</div>
