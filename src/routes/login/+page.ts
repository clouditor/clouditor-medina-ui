import { redirectLogin } from '$lib/oauth';

export async function load() {
	/*const { user } = session;

	if (!user) {*/
	redirectLogin();
	//}

	return {};
}
