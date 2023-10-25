<script lang="ts">
import { Card, CardBody, CardHeader, CardText, Table, Button, Modal, ModalBody, ModalHeader } from 'sveltestrap';
import type { Certificate, State } from '$lib/orchestrator';

export let certificate: Certificate;
let states = certificate.states

let sortedStates = states.sort(
	(s1,s2) => {
		if (new Date(s1.timestamp.replace(/[A-Z]+$/i, 'UTC')) > new Date(s2.timestamp.replace(/[A-Z]+$/i, 'UTC'))){
			return 1
		} else {
			return 0
		}
	});

let open = false;
let openScrollable = false;
const toggle = () => (open = !open);
const toggleScrollable = () => (openScrollable = !openScrollable);

</script>

<Card class="mb-3 me-3">
	<CardHeader><b>"{certificate.name}"</b></CardHeader>
	<CardBody>
		<CardText>
			<p>
				<b>ID:</b>
				{certificate.id} <br />
				<b>Name:</b>
				{certificate.name} <br />
				<b>Service ID:</b>
				{certificate.cloudServiceId} <br />
				<b>Issue Date:</b>
				{certificate.issueDate} <br />
				<b>Expiration Date:</b>
				{certificate.expirationDate} <br />
				<b>Schema:</b>
				{certificate.standard} <br />
				<b>Assurance Level:</b>
				{certificate.assuranceLevel} <br />
				<b>CAB:</b>
				{certificate.cab} <br />
				<b>Description:</b>
				{certificate.description} <br />
			</p>
			<hr />
		</CardText>
		<!-- <b>State History</b> -->
		<Button color="primary" on:click={toggleScrollable}>See State History</Button>
	</CardBody>
</Card>

<Modal isOpen={openScrollable} toggle={toggleScrollable} scrollable>
	<ModalHeader toggle={toggleScrollable}>Certificate State History</ModalHeader>
	<ModalBody>
		<Table>
			<thead>
				<tr>
					<th>State</th>
					<th>Deviation</th>
					<th>Timestamp</th>
					<th>Tree ID</th>
				</tr>
			</thead>
			<tbody>
			{#each sortedStates as state}
				<tr>
					<td>{state.state}</td>
					<td>
						{#if state.state == 'continued'}minor{/if}
						{#if state.state == 'suspended'}major{/if}
					</td>
					<td>{state.timestamp}</td>
					<!-- When it is a new certificate, there is no tree yet -->
					{#if state.state == 'new'}
					{:else}
						<td><a href="https://cce-test.k8s.medina.esilab.org/evaluation-tree?treeStateId={state.treeId}">{state.treeId}</a></td>
					{/if}
				</tr>
			{/each}
			</tbody>
		</Table>
	</ModalBody>
</Modal>
