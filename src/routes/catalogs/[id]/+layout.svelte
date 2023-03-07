<script lang="ts">
import { page } from '$app/stores';
import {
	faBinoculars,
	faTableColumns
} from '@fortawesome/free-solid-svg-icons';
import Fa from 'svelte-fa';


export let data: import('./$types').LayoutData;

$: overviewActive = $page.route.id == 'catalogs/[...id]';
$: categoriesActive = $page.route.id == 'catalogs/[...id]/categories';
</script>

<div class="pt-3 pb-0 bg-light">
	<ul class="nav nav-tabs">
		<li class="nav-item ps-2">
			<a class="nav-link" class:active={overviewActive} href="/catalogs/{data.catalog.id}" ><Fa icon={faTableColumns}/>Overview</a
			>
		</li>
		<li class="nav-item">
			<a
				class="nav-link"
				class:active={categoriesActive}
				href="/catalogs/{data.catalog.id}/categories" ><Fa icon={faBinoculars}/> Categories</a
			>
		</li>
	</ul>
</div>
<div class="p-3">
	<slot />
</div>
