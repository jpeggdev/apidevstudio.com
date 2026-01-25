// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://apidevstudio.com',
	base: '/docs',
	outDir: '../docs',
	integrations: [
		starlight({
			title: 'API Dev Studio',
			logo: {
				light: './src/assets/logo-light.svg',
				dark: './src/assets/logo-dark.svg',
				replacesTitle: true,
			},
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/apidevstudio/apidevstudio' },
				{ icon: 'x.com', label: 'Twitter', href: 'https://x.com/apidevstudio' },
			],
			customCss: ['./src/styles/custom.css'],
			head: [
				{
					tag: 'link',
					attrs: {
						rel: 'icon',
						href: '/favicon.ico',
					},
				},
				{
					tag: 'style',
					content: `
						:root {
							--sl-color-accent-low: #1a2600;
							--sl-color-accent: #c8ff00;
							--sl-color-accent-high: #e5ff80;
							--sl-color-white: #fafafa;
							--sl-color-gray-1: #e5e5e8;
							--sl-color-gray-2: #c5c5cc;
							--sl-color-gray-3: #8a8a94;
							--sl-color-gray-4: #5a5a64;
							--sl-color-gray-5: #3a3a42;
							--sl-color-gray-6: #2a2a30;
							--sl-color-black: #0a0a0b;
							--sl-color-bg: #0a0a0b;
							--sl-color-bg-nav: #131316;
							--sl-color-bg-sidebar: #131316;
							--sl-color-text: #fafafa;
							--sl-color-text-accent: #c8ff00;
						}
						.sl-link-button, [data-current="true"], .sidebar-content a[aria-current="page"] {
							color: #0a0a0b !important;
						}
					`,
				},
			],
			sidebar: [
				{
					label: 'Getting Started',
					items: [
						{ label: 'Your First Project', slug: 'getting-started/first-project' },
						{ label: 'Basic Workflow', slug: 'getting-started/basic-workflow' },
					],
				},
				{
					label: 'Features',
					items: [
						{ label: 'Mock Endpoints', slug: 'features/mock-endpoints' },
						{ label: 'Template Variables', slug: 'features/template-variables' },
						{ label: 'Proxy & Recording', slug: 'features/proxy-recording' },
						{ label: 'Webhook Endpoints', slug: 'features/webhook-endpoints' },
						{ label: 'OpenAPI Import/Export', slug: 'features/openapi' },
						{ label: 'MCP Server', slug: 'features/mcp-server' },
					],
				},
				{
					label: 'Reference',
					items: [
						{ label: 'Template Helpers', slug: 'reference/template-helpers' },
						{ label: 'Keyboard Shortcuts', slug: 'reference/keyboard-shortcuts' },
						{ label: 'CLI Reference', slug: 'reference/cli' },
					],
				},
				{
					label: 'Troubleshooting',
					items: [
						{ label: 'Common Issues', slug: 'troubleshooting/common-issues' },
					],
				},
			],
			editLink: {
				baseUrl: 'https://github.com/apidevstudio/apidevstudio/edit/main/docs/help/',
			},
		}),
	],
});
