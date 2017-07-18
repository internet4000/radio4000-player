<template>
	<div class="Layout">
		<header class="Layout-header">
			<slot name="header"></slot>
		</header>
		<section class="Layout-section">
			<aside class="Layout-aside">
				<slot name="aside"></slot>
			</aside>
			<main class="Layout-main">
				<div class="Layout-mainScroll">
					<slot name="main"></slot>
				</div>
			</main>
		</section>
		<footer class="Layout-footer">
			<slot name="footer"></slot>
		</footer>
	</div>
</template>

<script>
export default {
	name: 'app-layout'
}
</script>

<style scoped>
.Layout {
	/* expand to container */
	flex: 1;
	/* youtube requirements */
	min-width: 200px;
	/* header+aside+footer height */
	min-height: calc(2.75em * 2 + 200px);
	/* don't expand the viewport */
	max-height: 100vh;
	/* allow scrolling */
	display: flex;
	flex-direction: column;
	overflow: hidden;
	border: 1px solid hsl(0, 0%, 60%);
}

.Layout-header,
.Layout-footer {
	flex-shrink: 0;
	min-height: 2.75em;
}

.Layout-section {
	flex: 1;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	min-height: 0; /* allow scrolling in FF */
	overflow: hidden;
}

.Layout-section > * {
	flex-grow: 1;
}

.Layout-aside {
	min-height: 200px; /* youtube requirements */
	display: flex; /* allow child to expand */ 
}

.Layout-main {
	flex-basis: 20em; /* this is where it breaks into two columns */
	min-height: 10em;
	position: relative;
}
</style>

<style>
.Layout .TrackList-list {
	position: absolute;
	width: 100%;
	height: 100%;
	overflow-y: auto;
}
</style>
