<script lang="ts" setup>
import CustomTransition from "@components/CustomTransition.vue"
</script>

<template>
	<nav>
		<router-link to="/">Home</router-link> |
		<router-link to="/about">About</router-link>
	</nav>
	<custom-transition>
		<keep-alive>
			<router-view> </router-view>
		</keep-alive>
	</custom-transition>
</template>
