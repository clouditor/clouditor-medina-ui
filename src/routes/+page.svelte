<script lang="ts">
export let data: import('./$types').LayoutData;

// Returns the release version or commit hash if Clouditor is started directly. If Clouditor is used as dependency, than we have to use that dependency version.
function getVersionMessage(): string {
    // Check if Clouditor is used as dependency and return version depending on the the given version string
    for (var d of data.runtime.dependencies) {
        if (d.path == "clouditor.io/clouditor") {
            var splitted = d.path.split("-") 
            if (splitted[2] != undefined) {
                // Version is 'v1.7.4-0.20230208082106-ee2836726aec' so we need only the last part (commit hash) 
                return " commit hash " + splitted[2]
            } else{
                // Otherwise we can use the first part (version: v1.7.4)
                return splitted[0]
            }
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
