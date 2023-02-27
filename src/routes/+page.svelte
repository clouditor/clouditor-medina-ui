<script lang="ts">
export let data: import('./$types').LayoutData;

// Returns the release version or commit hash if Clouditor is started directly. If Clouditor is imported, than we have to use that version.
function getVersionMessage(): string {
    for (var d of data.runtime.dependencies) {
        if (d.path == "clouditor.io/clouditor") {
            return d.version
        }
    }

    if (data.runtime.releaseVersion === undefined || data.runtime.releaseVersion == "") {
        return " commit hash " + data.runtime.commitHash
    } else {
        return data.runtime.releaseVersion
    }
}

</script>

<div>Orchestrator based on Clouditor framework {getVersionMessage()}.</div>

<div>The OpenAPI Spec can be found <a data-sveltekit-reload href="https://github.com/clouditor/clouditor/blob/{data.runtime.commitHash}/openapi/orchestrator/openapi.yaml" target="_blank" rel="noreferrer">here</a>. </div>
