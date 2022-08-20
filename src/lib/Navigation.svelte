<script lang="ts">
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	NavLink,
	Dropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem
} from 'sveltestrap';
import { base } from '$app/paths';
import { page } from '$app/stores';

let isOpen = false;
function handleUpdate(event) {
	isOpen = event.detail.isOpen;
}

let routes = [
	{
		url: '/cloud',
		name: 'Cloud Services'
	},
	{
		url: '/discovery',
		name: 'Discovery'
	},
	{
		url: '/assessment',
		name: 'Assessment'
	},
	{
		url: '/metrics',
		name: 'Metrics'
	},
	{
		url: '/certificates',
		name: 'Certificates'
	}
];

console.log($page.url);
</script>

<Navbar color="primary" dark expand="md">
	<NavbarBrand href="{base}/">Clouditor</NavbarBrand>
	<NavbarToggler on:click={() => (isOpen = !isOpen)} />
	<Collapse {isOpen} navbar expand="md" on:update={handleUpdate}>
		<Nav navbar>
			{#each routes as route}
				<NavItem>
					<NavLink active={$page.url.pathname.startsWith(route.url)} href="{base}{route.url}">
						{route.name}
					</NavLink>
				</NavItem>
			{/each}
		</Nav>
		<Nav class="ms-auto" navbar>
			<NavItem>
				<NavLink href="{base}/login">Login</NavLink>
			</NavItem>
			<Dropdown nav inNavbar>
				<DropdownToggle nav caret>Account</DropdownToggle>
				<DropdownMenu end>
					<DropdownItem>Option 1</DropdownItem>
					<DropdownItem>Option 2</DropdownItem>
					<DropdownItem divider />
					<DropdownItem>Reset</DropdownItem>
				</DropdownMenu>
			</Dropdown>
		</Nav>
	</Collapse>
</Navbar>
