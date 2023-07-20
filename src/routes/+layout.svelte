<script lang="ts">
export let data: import('./$types').LayoutData;
import '../app.scss';
import Navigation from '$lib/Navigation.svelte';
import PageDebug from '$lib/components/PageDebug.svelte';
import { Button } from 'sveltestrap';

let showDebug = false;
function toggle() {
	showDebug = !showDebug;
}

// Returns the release version or commit hash if Clouditor is started directly. If Clouditor is used as dependency, than we have to use that dependency version.
function getVersion(): string {
    // Check if Clouditor is used as dependency and return version depending on the the given version string
    for (var d of data.runtime.dependencies) {
        if (d.path == "clouditor.io/clouditor") {
            var splitted = d.version.split("-") 
            if (splitted[2] != undefined) {
                // Version is 'v1.7.4-0.20230208082106-ee2836726aec' so we need only the last part (commit hash) 
                return splitted[2]
            } else{
                // Otherwise we can use the first part (version: v1.7.4)
                return splitted[0]
            }
        }
    }
    
    if (data.runtime.releaseVersion === undefined || data.runtime.releaseVersion == "") {
        return data.runtime.commitHash
    } else {
        return data.runtime.releaseVersion
    }
}

// Returns the version message (e.g., v1.7.4, commit hash 1289328743298 or <unknown veresion> if version not available.)
function getVersionMessage(): string {
    var version  = getVersion()
    var splitted = version.split(".")

    if (version == "") {
        return "<unknown version>"
    } else if (splitted[1] != undefined) {
        return version
    } else {
        return " commit hash " + version
    }
}

</script>

<Navigation />

<main>
	<slot />
</main>

<Button color="primary" on:click={() => toggle()}>
    Debug/Version Info
</Button>

<hr />

{#if showDebug}
	<div>Orchestrator based on Clouditor framework {getVersionMessage()}.</div>
	<div>The OpenAPI Spec can be found <a data-sveltekit-reload href="https://github.com/clouditor/clouditor/blob/{getVersion()}/openapi/orchestrator/openapi.yaml" target="_blank" rel="noreferrer">here</a>.</div>
	<PageDebug />
{/if}