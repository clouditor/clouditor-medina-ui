<script lang="ts">
import '../app.scss';
import Navigation from '$lib/Navigation.svelte';
import PageDebug from '$lib/components/PageDebug.svelte';
</script>

<Navigation />

<main>
	<slot />
</main>
<hr />
<PageDebug />
