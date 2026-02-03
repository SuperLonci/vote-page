<script>
	let { data } = $props();
</script>

<div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
	<div class="space-y-8">
		
		<div class="text-center space-y-4">
			<h1 class="text-4xl font-extrabold tracking-tight text-gray-900">
				{data.bet.title}
			</h1>
			{#if data.bet.description}
				<p class="text-lg text-gray-600">
					{data.bet.description}
				</p>
			{/if}
		</div>

		<!-- Answer Form (only if hasn't answered) -->
		{#if !data.hasAnswered}
			<form method="POST" action="?/submitAnswer" class="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 space-y-6">
				<div>
					<label for="userName" class="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
					<input 
						type="text" 
						name="userName" 
						id="userName"
						required 
						placeholder="Enter your name" 
						class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition shadow-sm"
					/>
				</div>

				<div>
					<label for="value" class="block text-sm font-medium text-gray-700 mb-1">Your Answer</label>
					<input 
						type={data.bet.answerType === 'number' ? 'number' : data.bet.answerType === 'date' ? 'date' : 'text'}
						name="value" 
						id="value"
						required 
						placeholder={data.bet.answerType === 'number' ? 'Enter a number' : data.bet.answerType === 'date' ? 'Select a date' : 'Enter your answer'}
						class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition shadow-sm"
					/>
				</div>

				<button 
					type="submit"
					class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition shadow-lg hover:shadow-xl"
				>
					Submit Answer
				</button>
			</form>
		{/if}

		<!-- Existing Answers -->
		<div class="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
			<h2 class="text-2xl font-bold text-gray-800 mb-6">Answers ({data.answers.length})</h2>
			
			{#if data.answers.length === 0}
				<p class="text-gray-500">No answers yet. Be the first to answer!</p>
			{:else}
				<div class="space-y-4">
					{#each data.answers as answer}
						<div class="border-l-4 border-indigo-600 pl-4 py-2">
							<p class="font-semibold text-gray-800">{answer.userName}</p>
							<p class="text-gray-600">{answer.value}</p>
							<p class="text-sm text-gray-400">
								{new Date(answer.createdAt).toLocaleDateString()}
							</p>
						</div>
					{/each}
				</div>
			{/if}
		</div>

	</div>
</div>