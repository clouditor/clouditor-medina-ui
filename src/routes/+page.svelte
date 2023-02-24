<script lang="ts">
export let data: import('./$types').LayoutData;

function getVersionMessage(): string {
    if (data.runtime.releaseVersion === undefined || data.runtime.releaseVersion == "") {
        return " commit hash " + data.runtime.commitHash
    } else {
        return " release version " + data.runtime.releaseVersion
    }
}

</script>

<div>Orchestrator based on Clouditor framework {getVersionMessage()}.</div>

<div>The OpenAPI Spec can be found <a data-sveltekit-reload href="https://github.com/clouditor/clouditor/blob/{data.runtime.commitHash}/openapi/orchestrator/openapi.yaml" target="_blank" rel="noreferrer">here</a>. </div>
