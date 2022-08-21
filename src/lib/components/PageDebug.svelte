<script lang="ts">
import { page } from '$app/stores';
</script>

<div class="p-3" id="debug" style="font-size: 0.9rem">
	<pre>{JSON.stringify($page, null, ' ')}</pre>
</div>
