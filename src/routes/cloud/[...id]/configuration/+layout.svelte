<script lang="ts">
import type { PageData } from './$types';
import { page } from '$app/stores';

export let data: PageData;
</script>

<div class="d-flex align-items-start">
	<ul class="nav nav-pills flex-column me-4">
		<li class="nav-item">
			<a
				class="nav-link"
				class:active={$page.routeId == 'cloud/[...id]/configuration'}
				aria-current="page"
				href="/cloud/{data.service.id}/configuration"
			>
				General
			</a>
		</li>
		<li class="nav-item">
			<a
				class="nav-link"
				class:active={$page.routeId == 'cloud/[...id]/configuration/toe'}
				href="/cloud/{data.service.id}/configuration/toe"
			>
				Target of Evaluation
			</a>
		</li>
	</ul>
	<div class="flex-fill">
		<slot />
	</div>
</div>
