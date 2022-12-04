<script lang="ts" setup>
import { ref } from "vue"
import {
	Listbox,
	ListboxLabel,
	ListboxButton,
	ListboxOptions,
	ListboxOption,
} from "@headlessui/vue"
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/vue/20/solid"

const people = [
	{ name: "Wade Cooper" },
	{ name: "Arlene Mccoy" },
	{ name: "Devon Webb" },
	{ name: "Tom Cook" },
	{ name: "Tanya Fox" },
	{ name: "Hellen Schmidt" },
]
const selectedPerson = ref(people[0])
</script>

<template>
	<div class="selection-box">
		<Listbox v-model="selectedPerson">
			<div class="box-container">
				<ListboxLabel class="selection-label">Assigned to</ListboxLabel>
				<ListboxButton class="selection-button">
					<span class="block truncate">{{ selectedPerson.name }}</span>
					<span class="icon-wapper">
						<ChevronUpDownIcon class="icon" aria-hidden="true" />
					</span>
				</ListboxButton>

				<transition
					leave-active-class="transition duration-100 ease-in"
					leave-from-class="opacity-100"
					leave-to-class="opacity-0"
				>
					<ListboxOptions
						class="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
					>
						<ListboxOption
							v-slot="{ active, selected }"
							v-for="person in people"
							:key="person.name"
							:value="person"
							as="template"
						>
							<li
								:class="[
									active ? 'bg-amber-100 text-amber-900' : 'text-gray-900',
									'relative cursor-default select-none py-2 pl-10 pr-4',
								]"
							>
								<span
									:class="[
										selected ? 'font-medium' : 'font-normal',
										'block truncate',
									]"
									>{{ person.name }}</span
								>
								<span
									v-if="selected"
									class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"
								>
									<CheckIcon class="w-5 h-5" aria-hidden="true" />
								</span>
							</li>
						</ListboxOption>
					</ListboxOptions>
				</transition>
			</div>
		</Listbox>
	</div>
</template>

<style lang="postcss" scoped>
.selection-box {
	@apply inline-flex flex-col items-center w-full;
}

.box-container {
	@apply relative;
}

.selection-label {
	@apply block text-sm font-medium text-gray-700;
}

.selection-button {
	@apply relative w-full py-2 pl-3 pr-10 text-left rounded-md shadow-sm
  bg-white border border-gray-300
  cursor-pointer focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 text-sm;
}

.icon-wapper {
	@apply absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none;
}

.icon {
	@apply w-5 h-5 text-gray-400;
}
</style>
