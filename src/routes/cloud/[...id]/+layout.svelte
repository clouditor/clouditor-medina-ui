<script lang="ts">
import ServiceTopBar from '$lib/components/ServiceTopBar.svelte';
import { page } from '$app/stores';
import {
	faBinoculars,
	faCircleCheck,
	faGear,
	faTableColumns
} from '@fortawesome/free-solid-svg-icons';
import Fa from 'svelte-fa';

export let data: import('./$types').LayoutData;

$: overviewActive = $page.route.id == 'cloud/[...id]';
$: configurationActive = $page.route.id.startsWith('cloud/[...id]/configuration');
$: discoveryActive = $page.route.id == 'cloud/[...id]/discovery';
$: assessmentActive = $page.route.id == 'cloud/[...id]/assessment';
</script>

<div class="pt-3 pb-0 bg-light">
	<ServiceTopBar service={data.service} />
	<ul class="nav nav-tabs">
		<li class="nav-item ps-2">
			<a class="nav-link" class:active={overviewActive} href="/cloud/{data.service.id}"
				><Fa icon={faTableColumns} /> Overview</a
			>
		</li>
		<li class="nav-item">
			<a
				class="nav-link"
				class:active={configurationActive}
				href="/cloud/{data.service.id}/configuration"><Fa icon={faGear} /> Configuration</a
			>
		</li>
		<li class="nav-item">
			<a class="nav-link" class:active={discoveryActive} href="/cloud/{data.service.id}/discovery"
				><Fa icon={faBinoculars} /> Discovery</a
			>
		</li>
		<li class="nav-item">
			<a class="nav-link" class:active={assessmentActive} href="/cloud/{data.service.id}/assessment"
				><Fa icon={faCircleCheck} /> Assessment</a
			>
		</li>
	</ul>
</div>
<div class="p-3">
	<slot />
</div>
