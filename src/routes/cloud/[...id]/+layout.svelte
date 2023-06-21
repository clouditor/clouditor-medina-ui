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

$: overviewActive = $page.route.id == '/cloud/[...id]';
$: configurationActive = $page.route.id.startsWith('/cloud/[...id]/configuration');
$: discoveryActive = $page.route.id == '/cloud/[...id]/discovery';
$: assessmentActive = $page.route.id == '/cloud/[...id]/assessment';
$: metricActive = $page.route.id == '/cloud/[...id]/metrics';
</script>

<div class="pt-3 pb-0 bg-light">
	<ServiceTopBar service={data.service} />
	<ul class="nav nav-tabs">
		<li title= "Overview shows general information of the given Cloud Service." class="nav-item ps-2">
			<a class="nav-link" class:active={overviewActive} href="/cloud/{data.service.id}"
				><Fa icon={faTableColumns} /> Overview</a
			>
		</li>
		<li title= "Configuration shows the name and description of the Cloud Service as well as the corresponding Target of Evaluation (ToE). The ToE can be configured for all available Catalogs." class="nav-item">
			<a
				class="nav-link"
				class:active={configurationActive}
				href="/cloud/{data.service.id}/configuration"><Fa icon={faGear} /> Configuration</a
			>
		</li>
		<li title= "Discovery shows all discovered Cloud Resources for the given Cloud Service." class="nav-item">
			<a class="nav-link" class:active={discoveryActive} href="/cloud/{data.service.id}/discovery"
				><Fa icon={faBinoculars} /> Discovery</a
			>
		</li>
		<li title= "Metrics shows all available metrics in the Orchestrator." class="nav-item">
			<a class="nav-link" class:active={metricActive} href="/cloud/{data.service.id}/metrics"
				><Fa icon={faCircleCheck} /> Metrics</a
			>
		</li>
		<li title= "Assessment shows all assessment results for the given Cloud Service." class="nav-item">
			<a class="nav-link" class:active={assessmentActive} href="/cloud/{data.service.id}/assessment"
				><Fa icon={faCircleCheck} /> Assessment</a
			>
		</li>
	</ul>
</div>
<div class="p-3">
	<slot />
</div>
