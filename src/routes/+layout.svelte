<script lang="ts">
import '../app.scss';
import Navigation from '$lib/Navigation.svelte';
//import { Styles } from 'sveltestrap';

export let data;
</script>

<Navigation />

<main>
	<!-- TODO 
	<nav aria-label="breadcrumb">
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a class="text-info" href="/">Home</a></li>
			<li class="breadcrumb-item active" aria-current="page">Accounts</li>
		</ol>
	</nav>
	-->

	<slot />
</main>
