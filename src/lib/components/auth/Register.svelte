<script lang="ts">
	import { IconAlertCircle, IconEye, IconEyeOff } from '@tabler/icons-svelte';
	import { createUserWithEmailAndPassword } from 'firebase/auth';
	import { auth } from '$lib/firebase';
	import { fade } from 'svelte/transition';

	let message = '';
	let loading = false;
	let passwordVisible = false;

	function handleSubmit(e) {
		loading = true;
		const formData = new FormData(e.target);

		const email = formData.get('email') as string;
		const password = formData.get('password') as string;

		createUserWithEmailAndPassword(auth, email, password)
			.then(() => {
				loading = false;
			})
			.catch((error) => {
				switch (error.code) {
					case 'auth/email-already-in-use':
						message = 'Email already in use.';
						break;
					case 'auth/invalid-email':
						message = 'Invalid email.';
						break;
					case 'auth/weak-password':
						message = 'Your password is too weak.';
						break;
					case 'auth/operation-not-allowed':
						message = 'Operation not allowed. Contact an admin ASAP.';
						break;
					default:
						message = 'Something went wrong.';
						break;
				}
			});
	}
</script>

<form on:submit|preventDefault={handleSubmit} class="form-control">
	<div class="form-control">
		<label class="label" for="email">
			<span class="label-text">Email</span>
		</label>
		<input
			type="email"
			autocomplete="email"
			required
			id="email"
			class="input-bordered input-primary input w-full sm:max-w-sm"
			name="email"
			placeholder="example@site.com"
		/>
	</div>
	<div class="form-control relative">
		<label class="label" for="password">
			<span class="label-text">Password</span>
		</label>
		<input
			type={passwordVisible ? 'text' : 'password'}
			autocomplete="current-password"
			required
			id="password"
			class="input-bordered input-primary input w-full sm:max-w-sm"
			minlength="8"
			maxlength="32"
			name="password"
			placeholder="Your password"
		/>
		<button
			class="absolute bottom-3 right-3"
			type="button"
			on:click={() => {
				passwordVisible = !passwordVisible;
			}}
			on:keypress={() => {
				passwordVisible = !passwordVisible;
			}}
		>
			{#if passwordVisible}
				<IconEyeOff />
			{:else}
				<IconEye />
			{/if}
		</button>
	</div>
	<button class="btn-primary btn mt-4 w-full">
		{#if loading}
			<span class="loading loading-spinner" />
		{:else}
			Register
		{/if}
	</button>
	{#if message !== ''}
		<p class="mx-auto mt-6 flex w-fit gap-2 text-red-500" transition:fade={{ duration: 300 }}>
			<IconAlertCircle />{message}
		</p>
	{/if}
</form>
