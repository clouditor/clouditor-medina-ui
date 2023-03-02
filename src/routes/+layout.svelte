<script lang="ts">
import '../app.scss';
import Navigation from '$lib/Navigation.svelte';
import PageDebug from '$lib/components/PageDebug.svelte';

let showDebug = false;
function toggle() {
	showDebug = !showDebug;
}
</script>

<Navigation />

<main>
	<slot />
</main>
<hr />
<button on:click={() => toggle()}>
    Debug output
</button>
{#if showDebug}<PageDebug />{/if}