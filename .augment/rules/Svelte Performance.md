---
type: "agent_requested"
description: "Example description"
---

# Svelte Development Guidelines

## Framework Preferences
- Use SvelteKit for full-stack applications
- Prefer stores over prop drilling for shared state
- Use TypeScript for type safety
- Implement proper component composition patterns

## File Organization
- Components in src/lib/components/
- Stores in src/lib/stores/
- Utilities in src/lib/utils/
- Types in src/lib/types/

## Styling
- Use CSS custom properties for theming
- Implement responsive design mobile-first
- Keep component styles scoped and modular
- Use semantic HTML elements