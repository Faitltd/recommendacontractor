<script lang="ts">
  import { user } from '$lib/stores/auth';
  import { derived } from 'svelte/store';

  // Build a mailto link that pre-fills the message with UID/email if available
  const mailtoHref = derived(user, ($user) => {
    const to = 'support@recommendacontractor.com';
    const subject = encodeURIComponent('Data Deletion Request');
    const body = encodeURIComponent([
      'Please delete my account and all associated personal data.','',
      $user?.uid ? `UID: ${$user.uid}` : 'UID: (add your UID if signed in)',
      $user?.email ? `Email: ${$user.email}` : 'Email: (your email)',
      '',
      'I understand this request may require identity verification.'
    ].join('\n'));
    return `mailto:${to}?subject=${subject}&body=${body}`;
  });

  let copied = false;
  function copy(text: string) {
    if (!text) return;
    navigator.clipboard.writeText(text).then(() => {
      copied = true;
      setTimeout(() => (copied = false), 2000);
    });
  }
</script>

<svelte:head>
  <title>Data Deletion Instructions – Recommend a Contractor</title>
  <meta name="description" content="How to request deletion of your account and personal data for Recommend a Contractor, including Facebook data deletion instructions." />
  <meta name="robots" content="noindex,follow" />
</svelte:head>

<div class="max-w-3xl mx-auto px-4 py-12">
  <h1 class="text-3xl font-semibold tracking-tight">Data Deletion Instructions</h1>
  <p class="mt-4 text-gray-700">
    This page explains how to delete your account and personal data from Recommend a Contractor. It also serves as our
    Facebook <span class="font-medium">Data Deletion Instructions URL</span>.
  </p>

  <section class="mt-8 space-y-4">
    <h2 class="text-xl font-semibold">If you are signed in</h2>
    <div class="rounded-lg border bg-white p-4 shadow-sm">
      {#if $user}
        <p class="text-sm text-gray-700">Signed in as <span class="font-medium">{$user.email}</span></p>
        <div class="mt-2 flex items-center gap-2">
          <code class="rounded bg-gray-100 px-2 py-1 text-xs text-gray-800">UID: {$user.uid}</code>
          <button class="text-xs rounded bord px-2 py-1 hover-bg-gray-50" on:click=(() => copy($user!.uid))>{copied ? 'Copied!' : 'Copy UID' }</button>
        </div>
        <p class="mt-3 text-sm text-gray-700">To request deletion now, email us using the button below. Your UID helps us verify your identity and find your data.</p>
      {:else}
        <p class="text-sm text-gray-700">Sign in first to include your UID automatically in the request, or include it manually if you know it.</p>
      {/if}
      <div class="mt-4">
        <a class="inline-flex items-center rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700" href={$mailtoHref} rel="nofollow">Email data deletion request</a>
      </div>
    </div>
  </section>

  <section class="mt-10 space-y-3">
    <h2 class="text-xl font-semibold">What we delete</h2>
    <ul class="list-disc pl-5 text-gray-700 space-y-2">
      <li>Your authentication account (Google or Facebook) association with our app</li>
      <li>Your profile and personally identifiable information you provided</li>
      <li>We will delete or irreversibly anonymize public content tied to your identity (for example, reviews), unless we are required to retain certain records for fraud prevention, legal, or compliance reasons</li>
    </ul>
  </section>

  <section class="mt-10 space-y-3">
    <h2 class="text-xl font-semibold">How to request deletion</h2>
    <ol class="list-decimal pl-5 text-gray-700 space-y-2">
      <li>Click the red “Email data deletion request” button above (preferred), or email <span class="font-mono">support@recommendacontractor.com</span> with subject “Data Deletion Request”.</li>
      <li>Include your account email and, if possible, your UID (shown above when signed in).</li>
      <li>We may request additional verification to protect your account.</li>
    </ol>
    <p class="text-gray-700">We aim to complete verified deletion requests within 30 days and will notify you when done.</p>
  </section>

  <section class="mt-10 space-y-3">
    <h2 class="text-xl font-semibold">Facebook users</h2>
    <p class="text-gray-700">If you signed in with Facebook, you may also remove our app’s access from your Facebook account settings. This page is the official Data Deletion Instructions URL required by the Meta Platform.</p>
  </section>

  <section class="mt-10 space-y-3">
    <h2 class="text-xl font-semibold">Questions</h2>
    <p class="text-gray-700">If you have questions about data deletion or privacy, contact us at <a class="text-blue-600 hover:underline" href="mailto:support@recommendacontractor.com">support@recommendacontractor.com</a>.</p>
  </section>
</div>
