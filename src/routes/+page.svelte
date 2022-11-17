<script>
    // TODO(lebogg): Remove before merging (It is for testing if ENV variables are set correctly in DEV and Docker)
    import { env } from "$env/dynamic/public";
    console.log("env.OAUTH_CLOUDITOR_URL is: " + env.OAUTH_CLOUDITOR_URL)
</script>

Hello
