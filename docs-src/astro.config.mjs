// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://apidevstudio.com',
	base: '/docs',
	outDir: './dist',  // Build to local dist folder, then deploy to ../docs
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
