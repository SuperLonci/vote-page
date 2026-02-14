<script>
	let { value = $bindable(''), maxlength = 32, type = 'text', placeholder = '', name, id, required = false } = $props();

	// Calculate warning threshold: 90% of max or maxlength-2, whichever is greater
	const threshold = Math.max(maxlength * 0.9, maxlength - 2);
</script>

<div>
	{#if type === 'textarea'}
		<textarea 
			name={name || ''}
			id={id || ''}
			rows="4"
			maxlength={maxlength}
			placeholder={placeholder || ''}
			bind:value
			class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition shadow-sm resize-none"
		></textarea>
	{:else}
		<input 
			type={type}
			name={name || ''}
			id={id || ''}
			required={required}
			maxlength={maxlength}
			placeholder={placeholder || ''}
			bind:value
			class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition shadow-sm"
		/>
	{/if}
	
	{#if value.length >= threshold}
		<p class="text-red-600 text-sm mt-1">Character limit near: {value.length}/{maxlength}</p>
	{/if}
</div>
