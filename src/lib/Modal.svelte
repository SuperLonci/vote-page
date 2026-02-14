<script>
	let { isOpen = false, title = '', message = '', showCancel = false, onClose, onConfirm } = $props();

	function handleConfirm() {
		onConfirm?.();
		onClose?.();
	}

	function handleCancel() {
		onClose?.();
	}
</script>

{#if isOpen}
	<div class="fixed inset-0 backdrop-blur-md z-40"></div>
	<div class="fixed inset-0 flex items-center justify-center z-50">
		<div class="bg-white rounded-lg shadow-xl p-8 max-w-sm w-full mx-4">
			{#if title}
				<h2 class="text-xl font-bold text-gray-800 mb-4">{title}</h2>
			{/if}
			<p class="text-gray-600 mb-6">{message}</p>
			<div class="flex gap-3">
				{#if showCancel}
					<button 
						onclick={handleCancel}
						class="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg transition shadow-md hover:shadow-lg"
					>
						Cancel
					</button>
				{/if}
				<button 
					onclick={handleConfirm}
					class="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition shadow-lg hover:shadow-xl"
				>
					Continue
				</button>
			</div>
		</div>
	</div>
{/if}

<style>
	:global(body.modal-open) {
		overflow: hidden;
	}
</style>
