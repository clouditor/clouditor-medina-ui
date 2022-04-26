<script>
	import { Card, CardBody, CardText } from 'sveltestrap';
	import Fa from 'svelte-fa';
	import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
</script>

<Card class="mb-3">
	<CardBody>
		<CardText>
			<div class="sign">
				<Fa icon={faCirclePlus} />
			</div>
		</CardText>
	</CardBody>
</Card>

<style lang="scss">
	@import 'node_modules/bootstrap/scss/functions';
	@import 'node_modules/bootstrap/scss/variables';
	@import 'node_modules/bootstrap/scss/mixins';

	.sign {
		text-align: center;
		vertical-align: middle;
		font-size: 40pt;
		padding-top: 7rem;
		color: $secondary;
	}
</style>
