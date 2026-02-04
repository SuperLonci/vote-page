<script>
	let canBeWon = $state(false);
	let endOfEntryEnabled = $state(false);
</script>

<div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
	<div class="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
		
		<div class="bg-gray-50 px-8 py-6 border-b border-gray-200">
			<h1 class="text-2xl font-bold text-gray-800">Create a new Bet</h1>
			<p class="text-gray-500 text-sm mt-1">Set up the rules and invite your friends.</p>
		</div>

		<form method="POST" class="p-8 space-y-6">
			<!-- Creator Name -->
			<div>
				<label for="creatorName" class="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
				<input 
					type="text" 
					name="creatorName" 
					id="creatorName"
					required 
					placeholder="Enter your name" 
					class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition shadow-sm"
				/>
			</div>

			<div>
				<label for="title" class="block text-sm font-medium text-gray-700 mb-1">Title</label>
				<input 
					type="text" 
					name="title" 
					id="title"
					required 
					placeholder="e.g. How many jellybeans are in the jar?" 
					class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition shadow-sm"
				/>
			</div>

			<div>
				<label for="desc" class="block text-sm font-medium text-gray-700 mb-1">Description <span class="text-gray-400 font-normal">(Optional)</span></label>
				<textarea 
					name="description" 
					id="desc"
					rows="4"
					placeholder="Add more context to the bet..."
					class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition shadow-sm resize-none"
				></textarea>
			</div>

			<div>
				<label for="type" class="block text-sm font-medium text-gray-700 mb-1">Answer Type</label>
				<div class="relative">
					<select 
						name="answerType" 
						id="type"
						class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none bg-white appearance-none shadow-sm"
					>
						<option value="text">Text (e.g. "Blue")</option>
						<option value="number">Number (e.g. 42)</option>
						<option value="date">Date (e.g. 2024-12-24)</option>
					</select>
					<div class="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-500">
						<svg class="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
					</div>
				</div>
			</div>

			<!-- Resolve Date -->
			<div>
				<label for="resolveDate" class="block text-sm font-medium text-gray-700 mb-1">Resolve Date</label>
				<input 
					type="date" 
					name="resolveDate" 
					id="resolveDate"
					required 
					class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition shadow-sm"
				/>
				<p class="text-gray-500 text-sm mt-2">The bet will be in read-only mode after this date. Hidden wins will be revealed.</p>
			</div>

			<!-- End of Entry Toggle -->
			<div class="border-t pt-6">
				<div class="flex items-center gap-3 mb-4">
					<input 
						type="checkbox" 
						name="endOfEntryEnabled" 
						id="endOfEntryEnabled"
						value="true"
						bind:checked={endOfEntryEnabled}
						class="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 cursor-pointer"
					/>
					<label for="endOfEntryEnabled" class="text-sm font-medium text-gray-700 cursor-pointer">
						Set an End of Entry Date
					</label>
				</div>

				{#if endOfEntryEnabled}
					<div class="ml-7">
						<label for="endOfEntryDate" class="block text-sm font-medium text-gray-700 mb-1">End of Entry Date</label>
						<input 
							type="date" 
							name="endOfEntryDate" 
							id="endOfEntryDate"
							class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition shadow-sm"
						/>
						<p class="text-gray-500 text-sm mt-2">No new votes will be accepted after this date.</p>
					</div>
				{/if}
			</div>

			<!-- Can Be Won Toggle -->
			<div class="border-t pt-6">
				<div class="flex items-center gap-3 mb-4">
					<input 
						type="checkbox" 
						name="canBeWon" 
						id="canBeWon"
						value="true"
						bind:checked={canBeWon}
						class="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 cursor-pointer"
					/>
					<label for="canBeWon" class="text-sm font-medium text-gray-700 cursor-pointer">
						There is a Prize to Win
					</label>
				</div>

				{#if canBeWon}
					<div class="ml-7 space-y-4">
						<div>
							<label for="winItem" class="block text-sm font-medium text-gray-700 mb-1">What can be won?</label>
							<input 
								type="text" 
								name="winItem" 
								id="winItem"
								placeholder="e.g. $50 gift card" 
								class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition shadow-sm"
							/>
						</div>

						<div class="flex items-center gap-3">
							<input 
								type="checkbox" 
								name="isWinSecret" 
								id="isWinSecret"
								value="true"
								class="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 cursor-pointer"
							/>
							<label for="isWinSecret" class="text-sm font-medium text-gray-700 cursor-pointer">
								Keep the prize secret until resolve date
							</label>
						</div>
					</div>
				{/if}
			</div>

			<div class="flex items-center justify-between pt-4 border-t">
				<a href="/" class="text-gray-500 hover:text-gray-800 font-medium transition">
					Cancel
				</a>
				<button 
					type="submit"
					class="bg-indigo-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-indigo-700 hover:shadow-lg transition transform hover:-translate-y-0.5"
				>
					Create Bet
				</button>
			</div>
		</form>
	</div>
</div>