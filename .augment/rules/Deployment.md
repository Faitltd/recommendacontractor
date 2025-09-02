---
type: "manual"
---

# Deployment Checklist

## Pre-Deployment
- Verify all environment variables are documented
- Ensure build process works without errors
- Test in production-like environment
- Update README with deployment instructions

## Security Review
- Remove hardcoded secrets and API keys and keep them only in env files
- Implement proper CORS settings
- Validate input sanitization
- Check authentication and authorization flows