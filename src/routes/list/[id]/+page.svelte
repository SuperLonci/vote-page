<script lang="ts">
	import CharacterLimitInput from '$lib/CharacterLimitInput.svelte';
	import Modal from '$lib/Modal.svelte';
	let { data } = $props();
	let userName = $state('');
	let answer = $state('');
	let showModal = $state(false);
	let modalMessage = $state('');
	let modalTitle = $state('');
	let showCancelButton = $state(false);
	let modalConfirmCallback = $state<(() => void) | null>(null);
	
	function formatDate(date: string | Date): string {
		return new Date(date).toLocaleDateString('en-US', { 
			weekday: 'short', 
			year: 'numeric', 
			month: 'short', 
			day: 'numeric' 
		});
	}

	function handleFormSubmit(event: SubmitEvent): void {
		const button = (event.submitter as HTMLButtonElement);
		// Only validate if submitting the answer (not viewing results)
		if (button?.formAction !== '?/viewResults') {
			if (!userName.trim() || !answer.toString().trim()) {
				event.preventDefault();
				modalTitle = 'Missing Information';
				modalMessage = 'Please enter both your name and answer to submit.';
				showModal = true;
			}
		}
	}

	function handleSeeResults(): void {
		modalTitle = 'View Results';
		modalMessage = 'Once you view the results, you won\'t be able to submit a vote for this bet.';
		showCancelButton = true;
		modalConfirmCallback = () => {
			// Submit the form to viewResults action
			const form = document.querySelector('form[action*="submitAnswer"]') as HTMLFormElement;
			if (form) {
				const formData = new FormData(form);
				fetch(form.action.replace('submitAnswer', 'viewResults'), {
					method: 'POST',
					body: formData
				}).then(() => {
					window.location.reload();
				});
			}
		};
		showModal = true;
	}

	const funnyMessages = [
		"🤐 There's a mysterious prize waiting... (It's a secret!)",
		"🎁 Something special is hidden inside... 👀",
		"🎭 A surprise awaits the winner! (Not telling what it is...)",
		"🔐 Top secret prize locked away... Find out on resolve day!",
		"🎪 The prize is in another castle! Or is it? 🤔",
		"✨ Magic happens after resolve date... Trust me!",
		"🕵️ Classified information: Prize details unknown",
		"🎯 What do you win? All will be revealed... eventually!"
	];

	const randomFunnyMessage = funnyMessages[Math.floor(Math.random() * funnyMessages.length)];
</script>

<div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
	<!-- Creator Info - Always at top -->
	<div class="bg-indigo-50 border border-indigo-200 rounded-lg p-4 mb-8 lg:hidden">
		<p class="text-sm text-indigo-700">
			<span class="font-semibold">Created by:</span> {data.bet.creatorName}
		</p>
		{#if data.isReadOnly}
			<p class="text-sm text-red-700 mt-2">
				<span class="font-semibold">Status:</span> Read-only mode - Voting is closed
			</p>
		{/if}
	</div>

	<div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
		<!-- Main Content (Left side on wide screens) -->
		<div class="lg:col-span-2 space-y-8">
			<!-- Bet Title and Description -->
			<div class="text-center lg:text-left space-y-4">
				<h1 class="text-4xl font-extrabold tracking-tight text-gray-900">
					{data.bet.title}
				</h1>
				{#if data.bet.description}
					<p class="text-lg text-gray-600">
						{data.bet.description}
					</p>
				{/if}
			</div>

			<!-- Answer Form (only if hasn't answered and not read-only) -->
			{#if !data.hasAnswered && !data.isReadOnly}
				<form method="POST" action="?/submitAnswer" onsubmit={handleFormSubmit} class="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 space-y-6">
					<div>
						<label for="userName" class="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
						<CharacterLimitInput 
							bind:value={userName}
							name="userName"
							id="userName"
							placeholder="Enter your name"
							maxlength={32}
						/>
					</div>

					<div>
						<label for="value" class="block text-sm font-medium text-gray-700 mb-1">Your Answer</label>
						{#if data.bet.answerType === 'text'}
							<CharacterLimitInput 
								bind:value={answer}
								name="value"
								id="value"
								type="text"
								placeholder="Enter your answer"
								maxlength={64}
							/>
						{:else}
							<input 
								type={data.bet.answerType === 'number' ? 'number' : data.bet.answerType === 'date' ? 'date' : 'text'}
								name="value" 
								id="value"
								required 
								placeholder={data.bet.answerType === 'number' ? 'Enter a number' : data.bet.answerType === 'date' ? 'Select a date' : 'Enter your answer'}
								bind:value={answer}
								class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition shadow-sm"
							/>
						{/if}
					</div>

				<div class="flex items-center justify-between gap-4">
					<button 
						type="submit"
						class="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition shadow-lg hover:shadow-xl"
					>
						Submit Answer
					</button>
					<span class="text-gray-500 font-medium">or</span>
					<button 
						type="button"
						onclick={handleSeeResults}
						class="bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-4 rounded-lg transition shadow-lg hover:shadow-xl"
					>
						See Results
					</button>
				</div>
				</form>
	{:else if data.isReadOnly && !data.hasAnswered}
				<div class="bg-gray-100 border border-gray-300 rounded-lg p-6 text-center">
					<p class="text-gray-600 font-medium">
						This bet is closed. Voting is no longer accepted.
					</p>
				</div>
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
								{#if answer.createdAt}
									<p class="text-sm text-gray-400">
										{new Date(answer.createdAt).toLocaleDateString()}
									</p>
								{/if}
							</div>
						{/each}
					</div>
				{/if}
			</div>

			<!-- Additional Info on Narrow Screens -->
			<div class="lg:hidden space-y-4">
				<!-- Resolve Date -->
				<div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
					<p class="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-1">Resolve Date</p>
					<p class="text-lg font-semibold text-blue-900">{formatDate(data.bet.resolveDate)}</p>
					<p class="text-xs text-blue-700 mt-1">Voting closes and results revealed</p>
				</div>

				<!-- End of Entry Date (if applicable) -->
				{#if data.bet.endOfEntryEnabled && data.bet.endOfEntryDate}
					<div class="bg-orange-50 border border-orange-200 rounded-lg p-4">
						<p class="text-xs font-semibold text-orange-600 uppercase tracking-wide mb-1">End of Entry</p>
						<p class="text-lg font-semibold text-orange-900">{formatDate(data.bet.endOfEntryDate)}</p>
						<p class="text-xs text-orange-700 mt-1">No more votes after this date</p>
					</div>
				{/if}

				<!-- Prize Section -->
				{#if data.bet.canBeWon}
					{#if data.shouldShowWin && data.bet.winItem}
						<div class="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-4">
							<p class="text-lg font-bold text-yellow-900 flex items-center gap-2">
								🏆 Prize
							</p>
							<p class="text-sm text-yellow-800 mt-2">{data.bet.winItem}</p>
						</div>
					{:else if data.bet.isWinSecret}
						<div class="bg-purple-50 border-2 border-purple-300 rounded-lg p-4">
							<p class="text-sm font-semibold text-purple-900">
								{randomFunnyMessage}
							</p>
						</div>
					{/if}
				{/if}
			</div>
		</div>

		<!-- Info Sidebar (Right side on wide screens only) -->
		<div class="hidden lg:block lg:col-span-1">
			<div class="sticky top-8 space-y-4">
				<!-- Creator Info and Status -->
				<div class="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
					<p class="text-sm text-indigo-700">
						<span class="font-semibold">Created by:</span> {data.bet.creatorName}
					</p>
					{#if data.isReadOnly}
						<p class="text-sm text-red-700 mt-2">
							<span class="font-semibold">Status:</span> Read-only mode - Voting is closed
						</p>
					{/if}
				</div>

				<!-- Resolve Date -->
				<div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
					<p class="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-1">Resolve Date</p>
					<p class="text-lg font-semibold text-blue-900">{formatDate(data.bet.resolveDate)}</p>
					<p class="text-xs text-blue-700 mt-1">Voting closes and results revealed</p>
				</div>

				<!-- End of Entry Date (if applicable) -->
				{#if data.bet.endOfEntryEnabled && data.bet.endOfEntryDate}
					<div class="bg-orange-50 border border-orange-200 rounded-lg p-4">
						<p class="text-xs font-semibold text-orange-600 uppercase tracking-wide mb-1">End of Entry</p>
						<p class="text-lg font-semibold text-orange-900">{formatDate(data.bet.endOfEntryDate)}</p>
						<p class="text-xs text-orange-700 mt-1">No more votes after this date</p>
					</div>
				{/if}

				<!-- Prize Section -->
				{#if data.bet.canBeWon}
					{#if data.shouldShowWin && data.bet.winItem}
						<div class="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-4">
							<p class="text-lg font-bold text-yellow-900 flex items-center gap-2">
								🏆 Prize
							</p>
							<p class="text-sm text-yellow-800 mt-2">{data.bet.winItem}</p>
						</div>
					{:else if data.bet.isWinSecret}
						<div class="bg-purple-50 border-2 border-purple-300 rounded-lg p-4">
							<p class="text-sm font-semibold text-purple-900">
								{randomFunnyMessage}
							</p>
						</div>
					{/if}
				{/if}
			</div>
		</div>
	</div>
</div>

<Modal 
	isOpen={showModal}
	title={modalTitle}
	message={modalMessage}
	showCancel={showCancelButton}
	onConfirm={modalConfirmCallback}
	onClose={() => {
		showModal = false;
		showCancelButton = false;
		modalConfirmCallback = null;
	}}
/>