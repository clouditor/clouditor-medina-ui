<script lang="ts">
	import { goto, invalidate, prefetch, prefetchRoutes } from '$app/navigation';
	import type { LoginResponse } from '$lib/login';
	import { Card, InputGroup, InputGroupText, Input, CardBody } from 'sveltestrap';

	let username;
	let password;

	function handleSubmit() {
		const apiUrl = `/v1/auth/login`;

		fetch(apiUrl, {
			method: 'POST',
			credentials: 'include',
			body: JSON.stringify({
				username: username,
				password: password
			})
		})
			.then((res) => res.json())
			.then((response: LoginResponse) => {
				localStorage.token = response.accessToken;
				goto('/');
			});
	}
</script>

Log me in!
<Card class="mr-auto">
	<CardBody>
		<form on:submit|preventDefault={handleSubmit}>
			<InputGroup>
				<InputGroupText>@</InputGroupText>
				<Input placeholder="username" bind:value={username} />
			</InputGroup>
			<InputGroup>
				<InputGroupText>*</InputGroupText>
				<Input type="password" placeholder="password" bind:value={password} />
			</InputGroup>

			<Input type="submit" value="Login" class="mt-2" />
		</form>
	</CardBody>
</Card>
