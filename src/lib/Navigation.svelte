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
	let isOpen = false;
	function handleUpdate(event) {
		isOpen = event.detail.isOpen;
	}
</script>

<Navbar color="secondary" dark expand="md">
	<NavbarBrand href="{base}/">Clouditor</NavbarBrand>
	<NavbarToggler on:click={() => (isOpen = !isOpen)} />
	<Collapse {isOpen} navbar expand="md" on:update={handleUpdate}>
		<Nav navbar>
			<NavItem>
				<NavLink href="{base}/">Home</NavLink>
			</NavItem>
			<NavItem>
				<NavLink href="{base}/discovery">Discovery</NavLink>
			</NavItem>
			<NavItem>
				<NavLink href="{base}/assessment">Assessment</NavLink>
			</NavItem>
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
