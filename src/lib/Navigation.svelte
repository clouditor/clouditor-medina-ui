<script lang="ts">
import {
	Collapse,
	Navbar,
	NavbarToggler,
	Nav,
	NavItem,
	NavLink,
} from 'sveltestrap';
import Fa from 'svelte-fa'
import { faCloud, faRuler, faFile, faCertificate,  faQuestion } from '@fortawesome/free-solid-svg-icons'
import { SvelteToast } from '@zerodevx/svelte-toast';
import { base } from '$app/paths';
import { page } from '$app/stores';

let isOpen = false;
function handleUpdate(event) {
	isOpen = event.detail.isOpen;
}

// let routes = [
// 	{
// 		url: '/cloud',
// 		name: 'Cloud Services'
// 	},
// 	// We are hiding these paths for MEDINA, since they can be viewed on the service-specific views
// 	// {
// 	// 	url: '/discovery',
// 	// 	name: 'Discovery'
// 	// },
// 	// {
// 	// 	url: '/assessment',
// 	// 	name: 'Assessment'
// 	// },
// 	{
// 		url: '/metrics',
// 		name: 'Metrics'
// 	},
// 	{
// 		url: '/catalogs',
// 		name: 'Catalogues'
// 	},
// 	{
// 		url: '/certificates',
// 		name: 'Certificates'
// 	},
// 	{
// 		name: 'Help'
// 	}
// ];

let loggedIn = localStorage.token ? true : false;
</script>

<SvelteToast />
<Navbar class="medina" dark expand="md">
	<!--<NavbarBrand href="{base}/">Clouditor</NavbarBrand>-->
	<NavbarToggler on:click={() => (isOpen = !isOpen)} />
	<Collapse {isOpen} navbar expand="md" on:update={handleUpdate}>
		<Nav class="ms-auto" navbar>
			<!-- {#each routes as route}
				<NavItem>
					<NavLink active={$page.url.pathname.startsWith(route.url)} href="{base}{route.url}">
						{route.name}
					</NavLink>
				</NavItem>
			{/each} -->
			<!--TODO: if not logged in, don't show-->
			{#if loggedIn}
			<NavItem>
				<NavLink active={$page.url.pathname.startsWith("/cloud")} href="{base}{"/cloud"}">
					<Fa icon={faCloud} /> Cloud Services
				</NavLink>
			</NavItem>
			<NavItem>
				<NavLink active={$page.url.pathname.startsWith("/metrics")} href="{base}{"/metrics"}">
					<Fa icon={faRuler} /> Metrics
				</NavLink>
			</NavItem>
			<NavItem>
				<NavLink active={$page.url.pathname.startsWith("/catalogs")} href="{base}{"/catalogs"}">
					<Fa icon={faFile} /> Catalogues
				</NavLink>
			</NavItem>
			<NavItem>
				<NavLink active={$page.url.pathname.startsWith("/certificates")} href="{base}{"/certificates"}">
					<Fa icon={faCertificate} /> Certificates
				</NavLink>
			</NavItem>
			{/if}
			<NavItem>
				<NavLink href="https://medina-project.eu/wp-content/uploads/MEDINA_User_Manuals/MEDINA_Orchestrator_UserManual.pdf" target="_blank">
					<Fa icon={faQuestion} /> Help
				</NavLink>
			</NavItem>
			<!-- removed for medina: <Dropdown nav inNavbar>
				<DropdownToggle nav caret>Account</DropdownToggle>
				<DropdownMenu end>
					<DropdownItem>Option 1</DropdownItem>
					<DropdownItem>Option 2</DropdownItem>
					<DropdownItem divider />
					<DropdownItem>Reset</DropdownItem>
				</DropdownMenu>
			</Dropdown> -->
		</Nav>
	</Collapse>
</Navbar>

<div style="clear: both;"></div>

<style>
	:global(.medina) {
		height: 46px;
		background:#212529;
		color: #212529;
	}
</style>