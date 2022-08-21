<script lang="ts">
import type { CloudService } from '$lib/orchestrator';
import { Breadcrumb, BreadcrumbItem } from 'sveltestrap';

export let service: CloudService;
</script>

<Breadcrumb class="ps-3">
	<BreadcrumbItem>
		<a href="/cloud">Cloud Services</a>
	</BreadcrumbItem>
	<BreadcrumbItem active>{service.name}</BreadcrumbItem>
</Breadcrumb>
