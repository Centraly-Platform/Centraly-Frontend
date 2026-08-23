This file is a merged representation of a subset of the codebase, containing files not matching ignore patterns, combined into a single document by Repomix.

# File Summary

## Purpose
This file contains a packed representation of a subset of the repository's contents that is considered the most important context.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.

## File Format
The content is organized as follows:
1. This summary section
2. Repository information
3. Directory structure
4. Repository files (if enabled)
5. Multiple file entries, each consisting of:
  a. A header with the file path (## File: path/to/file)
  b. The full contents of the file in a code block

## Usage Guidelines
- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.

## Notes
- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Files matching these patterns are excluded: dist, node_modules, package-lock.json
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Files are sorted by Git change count (files with more changes are at the bottom)

# Directory Structure
```
.env.example
.gitignore
.oxlintrc.json
index.html
package.json
public/favicon.svg
public/icons.svg
README.md
repomix.config.json
src/App.css
src/App.tsx
src/app/routes/index.tsx
src/assets/hero.png
src/assets/react.svg
src/assets/vite.svg
src/core/repositories/IAuthRepository.ts
src/core/repositories/IContactsRepository.ts
src/core/repositories/IFinanceRepository.ts
src/core/repositories/IInventoryRepository.ts
src/core/repositories/IInvoicesRepository.ts
src/features/auth/api/AuthApi.ts
src/features/auth/components/LoginForm.tsx
src/features/auth/hooks/useAuth.tsx
src/features/auth/pages/LoginPage.tsx
src/features/auth/schemas/loginSchema.ts
src/features/contacts/api/ContactsApi.ts
src/features/contacts/hooks/useContacts.ts
src/features/contacts/schemas/contactSchemas.ts
src/features/finance/api/FinanceApi.ts
src/features/finance/hooks/useFinance.ts
src/features/finance/schemas/financeSchemas.ts
src/features/inventory/api/InventoryApi.ts
src/features/inventory/components/AddProductForm.tsx
src/features/inventory/components/ProductFilters.tsx
src/features/inventory/components/ProductsTable.tsx
src/features/inventory/components/ProductStatusBadge.tsx
src/features/inventory/hooks/useInventory.ts
src/features/inventory/schemas/inventorySchemas.ts
src/features/invoices/api/InvoicesApi.ts
src/features/invoices/hooks/useInvoices.ts
src/features/invoices/schemas/invoiceSchemas.ts
src/features/invoices/schemas/returnSchemas.ts
src/index.css
src/lib/axios.ts
src/lib/storage.ts
src/lib/utils.ts
src/main.tsx
src/pages/auth/LoginPage.tsx
src/pages/contacts/CustomersPage.tsx
src/pages/contacts/SuppliersPage.tsx
src/pages/dashboard/DashboardPage.tsx
src/pages/finance/DrawerPage.tsx
src/pages/finance/ExpensesPage.tsx
src/pages/finance/SafePage.tsx
src/pages/inventory/CategoriesPage.tsx
src/pages/inventory/ProductsPage.tsx
src/pages/purchases/PurchasesHistoryPage.tsx
src/pages/sales/PosPage.tsx
src/pages/sales/SalesHistoryPage.tsx
src/shared/components/layout/AppLayout.tsx
src/shared/components/layout/Header.tsx
src/shared/components/layout/Sidebar.tsx
src/shared/components/ui/Button.tsx
src/shared/components/ui/DataTable.tsx
src/shared/components/ui/Input.tsx
src/shared/components/ui/Label.tsx
src/shared/components/ui/RightDrawer.tsx
src/shared/hooks/useDebounce.ts
src/shared/styles/tokens.ts
src/shared/types/pagination.ts
src/vite-env.d.ts
tsconfig.app.json
tsconfig.json
tsconfig.node.json
vite.config.ts
```

# Files

## File: .env.example
````
VITE_API_BASE_URL=https://localhost:7073/api
````

## File: .gitignore
````
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
dist
dist-ssr
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?
````

## File: .oxlintrc.json
````json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
````

## File: index.html
````html
<!doctype html>
<html lang="ar" dir="rtl">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>سنترالي - نظام الإدارة الذكية</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&display=swap" rel="stylesheet">
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
````

## File: package.json
````json
{
  "name": "centraly-frontend",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "oxlint",
    "preview": "vite preview"
  },
  "dependencies": {
    "@hookform/resolvers": "^5.9.1",
    "@radix-ui/react-label": "^2.1.15",
    "@radix-ui/react-slot": "^1.3.3",
    "@tailwindcss/vite": "^4.3.3",
    "@tanstack/react-query": "^5.102.0",
    "axios": "^1.19.0",
    "clsx": "^2.1.1",
    "lucide-react": "^1.33.0",
    "react": "^19.2.8",
    "react-dom": "^19.2.8",
    "react-hook-form": "^7.86.0",
    "react-router-dom": "^7.18.2",
    "sonner": "^2.0.8",
    "tailwind-merge": "^3.6.0",
    "tailwindcss": "^4.3.3",
    "zod": "^4.4.3"
  },
  "devDependencies": {
    "@types/node": "^24.13.3",
    "@types/react": "^19.2.17",
    "@types/react-dom": "^19.2.3",
    "@vitejs/plugin-react": "^6.0.4",
    "oxlint": "^1.75.0",
    "typescript": "~6.0.2",
    "vite": "^8.2.0"
  }
}
````

## File: public/favicon.svg
````xml
<svg xmlns="http://www.w3.org/2000/svg" width="48" height="46" fill="none" viewBox="0 0 48 46"><path fill="#863bff" d="M25.946 44.938c-.664.845-2.021.375-2.021-.698V33.937a2.26 2.26 0 0 0-2.262-2.262H10.287c-.92 0-1.456-1.04-.92-1.788l7.48-10.471c1.07-1.497 0-3.578-1.842-3.578H1.237c-.92 0-1.456-1.04-.92-1.788L10.013.474c.214-.297.556-.474.92-.474h28.894c.92 0 1.456 1.04.92 1.788l-7.48 10.471c-1.07 1.498 0 3.579 1.842 3.579h11.377c.943 0 1.473 1.088.89 1.83L25.947 44.94z" style="fill:#863bff;fill:color(display-p3 .5252 .23 1);fill-opacity:1"/><mask id="a" width="48" height="46" x="0" y="0" maskUnits="userSpaceOnUse" style="mask-type:alpha"><path fill="#000" d="M25.842 44.938c-.664.844-2.021.375-2.021-.698V33.937a2.26 2.26 0 0 0-2.262-2.262H10.183c-.92 0-1.456-1.04-.92-1.788l7.48-10.471c1.07-1.498 0-3.579-1.842-3.579H1.133c-.92 0-1.456-1.04-.92-1.787L9.91.473c.214-.297.556-.474.92-.474h28.894c.92 0 1.456 1.04.92 1.788l-7.48 10.471c-1.07 1.498 0 3.578 1.842 3.578h11.377c.943 0 1.473 1.088.89 1.832L25.843 44.94z" style="fill:#000;fill-opacity:1"/></mask><g mask="url(#a)"><g filter="url(#b)"><ellipse cx="5.508" cy="14.704" fill="#ede6ff" rx="5.508" ry="14.704" style="fill:#ede6ff;fill:color(display-p3 .9275 .9033 1);fill-opacity:1" transform="matrix(.00324 1 1 -.00324 -4.47 31.516)"/></g><g filter="url(#c)"><ellipse cx="10.399" cy="29.851" fill="#ede6ff" rx="10.399" ry="29.851" style="fill:#ede6ff;fill:color(display-p3 .9275 .9033 1);fill-opacity:1" transform="matrix(.00324 1 1 -.00324 -39.328 7.883)"/></g><g filter="url(#d)"><ellipse cx="5.508" cy="30.487" fill="#7e14ff" rx="5.508" ry="30.487" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(89.814 -25.913 -14.639)scale(1 -1)"/></g><g filter="url(#e)"><ellipse cx="5.508" cy="30.599" fill="#7e14ff" rx="5.508" ry="30.599" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(89.814 -32.644 -3.334)scale(1 -1)"/></g><g filter="url(#f)"><ellipse cx="5.508" cy="30.599" fill="#7e14ff" rx="5.508" ry="30.599" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="matrix(.00324 1 1 -.00324 -34.34 30.47)"/></g><g filter="url(#g)"><ellipse cx="14.072" cy="22.078" fill="#ede6ff" rx="14.072" ry="22.078" style="fill:#ede6ff;fill:color(display-p3 .9275 .9033 1);fill-opacity:1" transform="rotate(93.35 24.506 48.493)scale(-1 1)"/></g><g filter="url(#h)"><ellipse cx="3.47" cy="21.501" fill="#7e14ff" rx="3.47" ry="21.501" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(89.009 28.708 47.59)scale(-1 1)"/></g><g filter="url(#i)"><ellipse cx="3.47" cy="21.501" fill="#7e14ff" rx="3.47" ry="21.501" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(89.009 28.708 47.59)scale(-1 1)"/></g><g filter="url(#j)"><ellipse cx=".387" cy="8.972" fill="#7e14ff" rx="4.407" ry="29.108" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(39.51 .387 8.972)"/></g><g filter="url(#k)"><ellipse cx="47.523" cy="-6.092" fill="#7e14ff" rx="4.407" ry="29.108" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(37.892 47.523 -6.092)"/></g><g filter="url(#l)"><ellipse cx="41.412" cy="6.333" fill="#47bfff" rx="5.971" ry="9.665" style="fill:#47bfff;fill:color(display-p3 .2799 .748 1);fill-opacity:1" transform="rotate(37.892 41.412 6.333)"/></g><g filter="url(#m)"><ellipse cx="-1.879" cy="38.332" fill="#7e14ff" rx="4.407" ry="29.108" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(37.892 -1.88 38.332)"/></g><g filter="url(#n)"><ellipse cx="-1.879" cy="38.332" fill="#7e14ff" rx="4.407" ry="29.108" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(37.892 -1.88 38.332)"/></g><g filter="url(#o)"><ellipse cx="35.651" cy="29.907" fill="#7e14ff" rx="4.407" ry="29.108" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(37.892 35.651 29.907)"/></g><g filter="url(#p)"><ellipse cx="38.418" cy="32.4" fill="#47bfff" rx="5.971" ry="15.297" style="fill:#47bfff;fill:color(display-p3 .2799 .748 1);fill-opacity:1" transform="rotate(37.892 38.418 32.4)"/></g></g><defs><filter id="b" width="60.045" height="41.654" x="-19.77" y="16.149" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="7.659"/></filter><filter id="c" width="90.34" height="51.437" x="-54.613" y="-7.533" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="7.659"/></filter><filter id="d" width="79.355" height="29.4" x="-49.64" y="2.03" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="e" width="79.579" height="29.4" x="-45.045" y="20.029" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="f" width="79.579" height="29.4" x="-43.513" y="21.178" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="g" width="74.749" height="58.852" x="15.756" y="-17.901" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="7.659"/></filter><filter id="h" width="61.377" height="25.362" x="23.548" y="2.284" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="i" width="61.377" height="25.362" x="23.548" y="2.284" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="j" width="56.045" height="63.649" x="-27.636" y="-22.853" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="k" width="54.814" height="64.646" x="20.116" y="-38.415" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="l" width="33.541" height="35.313" x="24.641" y="-11.323" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="m" width="54.814" height="64.646" x="-29.286" y="6.009" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="n" width="54.814" height="64.646" x="-29.286" y="6.009" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="o" width="54.814" height="64.646" x="8.244" y="-2.416" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="p" width="39.409" height="43.623" x="18.713" y="10.588" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter></defs></svg>
````

## File: public/icons.svg
````xml
<svg xmlns="http://www.w3.org/2000/svg">
  <symbol id="bluesky-icon" viewBox="0 0 16 17">
    <g clip-path="url(#bluesky-clip)"><path fill="#08060d" d="M7.75 7.735c-.693-1.348-2.58-3.86-4.334-5.097-1.68-1.187-2.32-.981-2.74-.79C.188 2.065.1 2.812.1 3.251s.241 3.602.398 4.13c.52 1.744 2.367 2.333 4.07 2.145-2.495.37-4.71 1.278-1.805 4.512 3.196 3.309 4.38-.71 4.987-2.746.608 2.036 1.307 5.91 4.93 2.746 2.72-2.746.747-4.143-1.747-4.512 1.702.189 3.55-.4 4.07-2.145.156-.528.397-3.691.397-4.13s-.088-1.186-.575-1.406c-.42-.19-1.06-.395-2.741.79-1.755 1.24-3.64 3.752-4.334 5.099"/></g>
    <defs><clipPath id="bluesky-clip"><path fill="#fff" d="M.1.85h15.3v15.3H.1z"/></clipPath></defs>
  </symbol>
  <symbol id="discord-icon" viewBox="0 0 20 19">
    <path fill="#08060d" d="M16.224 3.768a14.5 14.5 0 0 0-3.67-1.153c-.158.286-.343.67-.47.976a13.5 13.5 0 0 0-4.067 0c-.128-.306-.317-.69-.476-.976A14.4 14.4 0 0 0 3.868 3.77C1.546 7.28.916 10.703 1.231 14.077a14.7 14.7 0 0 0 4.5 2.306q.545-.748.965-1.587a9.5 9.5 0 0 1-1.518-.74q.191-.14.372-.293c2.927 1.369 6.107 1.369 8.999 0q.183.152.372.294-.723.437-1.52.74.418.838.963 1.588a14.6 14.6 0 0 0 4.504-2.308c.37-3.911-.63-7.302-2.644-10.309m-9.13 8.234c-.878 0-1.599-.82-1.599-1.82 0-.998.705-1.82 1.6-1.82.894 0 1.614.82 1.599 1.82.001 1-.705 1.82-1.6 1.82m5.91 0c-.878 0-1.599-.82-1.599-1.82 0-.998.705-1.82 1.6-1.82.893 0 1.614.82 1.599 1.82 0 1-.706 1.82-1.6 1.82"/>
  </symbol>
  <symbol id="documentation-icon" viewBox="0 0 21 20">
    <path fill="none" stroke="#aa3bff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.35" d="m15.5 13.333 1.533 1.322c.645.555.967.833.967 1.178s-.322.623-.967 1.179L15.5 18.333m-3.333-5-1.534 1.322c-.644.555-.966.833-.966 1.178s.322.623.966 1.179l1.534 1.321"/>
    <path fill="none" stroke="#aa3bff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.35" d="M17.167 10.836v-4.32c0-1.41 0-2.117-.224-2.68-.359-.906-1.118-1.621-2.08-1.96-.599-.21-1.349-.21-2.848-.21-2.623 0-3.935 0-4.983.369-1.684.591-3.013 1.842-3.641 3.428C3 6.449 3 7.684 3 10.154v2.122c0 2.558 0 3.838.706 4.726q.306.383.713.671c.76.536 1.79.64 3.581.66"/>
    <path fill="none" stroke="#aa3bff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.35" d="M3 10a2.78 2.78 0 0 1 2.778-2.778c.555 0 1.209.097 1.748-.047.48-.129.854-.503.982-.982.145-.54.048-1.194.048-1.749a2.78 2.78 0 0 1 2.777-2.777"/>
  </symbol>
  <symbol id="github-icon" viewBox="0 0 19 19">
    <path fill="#08060d" fill-rule="evenodd" d="M9.356 1.85C5.05 1.85 1.57 5.356 1.57 9.694a7.84 7.84 0 0 0 5.324 7.44c.387.079.528-.168.528-.376 0-.182-.013-.805-.013-1.454-2.165.467-2.616-.935-2.616-.935-.349-.91-.864-1.143-.864-1.143-.71-.48.051-.48.051-.48.787.051 1.2.805 1.2.805.695 1.194 1.817.857 2.268.649.064-.507.27-.857.49-1.052-1.728-.182-3.545-.857-3.545-3.87 0-.857.31-1.558.8-2.104-.078-.195-.349-1 .077-2.078 0 0 .657-.208 2.14.805a7.5 7.5 0 0 1 1.946-.26c.657 0 1.328.092 1.946.26 1.483-1.013 2.14-.805 2.14-.805.426 1.078.155 1.883.078 2.078.502.546.799 1.247.799 2.104 0 3.013-1.818 3.675-3.558 3.87.284.247.528.714.528 1.454 0 1.052-.012 1.896-.012 2.156 0 .208.142.455.528.377a7.84 7.84 0 0 0 5.324-7.441c.013-4.338-3.48-7.844-7.773-7.844" clip-rule="evenodd"/>
  </symbol>
  <symbol id="social-icon" viewBox="0 0 20 20">
    <path fill="none" stroke="#aa3bff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.35" d="M12.5 6.667a4.167 4.167 0 1 0-8.334 0 4.167 4.167 0 0 0 8.334 0"/>
    <path fill="none" stroke="#aa3bff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.35" d="M2.5 16.667a5.833 5.833 0 0 1 8.75-5.053m3.837.474.513 1.035c.07.144.257.282.414.309l.93.155c.596.1.736.536.307.965l-.723.73a.64.64 0 0 0-.152.531l.207.903c.164.715-.213.991-.84.618l-.872-.52a.63.63 0 0 0-.577 0l-.872.52c-.624.373-1.003.094-.84-.618l.207-.903a.64.64 0 0 0-.152-.532l-.723-.729c-.426-.43-.289-.864.306-.964l.93-.156a.64.64 0 0 0 .412-.31l.513-1.034c.28-.562.735-.562 1.012 0"/>
  </symbol>
  <symbol id="x-icon" viewBox="0 0 19 19">
    <path fill="#08060d" fill-rule="evenodd" d="M1.893 1.98c.052.072 1.245 1.769 2.653 3.77l2.892 4.114c.183.261.333.48.333.486s-.068.089-.152.183l-.522.593-.765.867-3.597 4.087c-.375.426-.734.834-.798.905a1 1 0 0 0-.118.148c0 .01.236.017.664.017h.663l.729-.83c.4-.457.796-.906.879-.999a692 692 0 0 0 1.794-2.038c.034-.037.301-.34.594-.675l.551-.624.345-.392a7 7 0 0 1 .34-.374c.006 0 .93 1.306 2.052 2.903l2.084 2.965.045.063h2.275c1.87 0 2.273-.003 2.266-.021-.008-.02-1.098-1.572-3.894-5.547-2.013-2.862-2.28-3.246-2.273-3.266.008-.019.282-.332 2.085-2.38l2-2.274 1.567-1.782c.022-.028-.016-.03-.65-.03h-.674l-.3.342a871 871 0 0 1-1.782 2.025c-.067.075-.405.458-.75.852a100 100 0 0 1-.803.91c-.148.172-.299.344-.99 1.127-.304.343-.32.358-.345.327-.015-.019-.904-1.282-1.976-2.808L6.365 1.85H1.8zm1.782.91 8.078 11.294c.772 1.08 1.413 1.973 1.425 1.984.016.017.241.02 1.05.017l1.03-.004-2.694-3.766L7.796 5.75 5.722 2.852l-1.039-.004-1.039-.004z" clip-rule="evenodd"/>
  </symbol>
</svg>
````

## File: README.md
````markdown
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.
````

## File: repomix.config.json
````json
{
  "output": {
    "filePath": "repomix-output.md",
    "style": "markdown"
  },
  "ignore": {
    "useGitignore": true,
    "useDefaultPatterns": true,
    "customPatterns": [
      "dist",
      "node_modules",
      "package-lock.json"
    ]
  }
}
````

## File: src/App.css
````css
.counter {
  font-size: 16px;
  padding: 5px 10px;
  border-radius: 5px;
  color: var(--accent);
  background: var(--accent-bg);
  border: 2px solid transparent;
  transition: border-color 0.3s;
  margin-bottom: 24px;

  &:hover {
    border-color: var(--accent-border);
  }
  &:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
}

.hero {
  position: relative;

  .base,
  .framework,
  .vite {
    inset-inline: 0;
    margin: 0 auto;
  }

  .base {
    width: 170px;
    position: relative;
    z-index: 0;
  }

  .framework,
  .vite {
    position: absolute;
  }

  .framework {
    z-index: 1;
    top: 34px;
    height: 28px;
    transform: perspective(2000px) rotateZ(300deg) rotateX(44deg) rotateY(39deg)
      scale(1.4);
  }

  .vite {
    z-index: 0;
    top: 107px;
    height: 26px;
    width: auto;
    transform: perspective(2000px) rotateZ(300deg) rotateX(40deg) rotateY(39deg)
      scale(0.8);
  }
}

#center {
  display: flex;
  flex-direction: column;
  gap: 25px;
  place-content: center;
  place-items: center;
  flex-grow: 1;

  @media (max-width: 1024px) {
    padding: 32px 20px 24px;
    gap: 18px;
  }
}

#next-steps {
  display: flex;
  border-top: 1px solid var(--border);
  text-align: left;

  & > div {
    flex: 1 1 0;
    padding: 32px;
    @media (max-width: 1024px) {
      padding: 24px 20px;
    }
  }

  .icon {
    margin-bottom: 16px;
    width: 22px;
    height: 22px;
  }

  @media (max-width: 1024px) {
    flex-direction: column;
    text-align: center;
  }
}

#docs {
  border-right: 1px solid var(--border);

  @media (max-width: 1024px) {
    border-right: none;
    border-bottom: 1px solid var(--border);
  }
}

#next-steps ul {
  list-style: none;
  padding: 0;
  display: flex;
  gap: 8px;
  margin: 32px 0 0;

  .logo {
    height: 18px;
  }

  a {
    color: var(--text-h);
    font-size: 16px;
    border-radius: 6px;
    background: var(--social-bg);
    display: flex;
    padding: 6px 12px;
    align-items: center;
    gap: 8px;
    text-decoration: none;
    transition: box-shadow 0.3s;

    &:hover {
      box-shadow: var(--shadow);
    }
    .button-icon {
      height: 18px;
      width: 18px;
    }
  }

  @media (max-width: 1024px) {
    margin-top: 20px;
    flex-wrap: wrap;
    justify-content: center;

    li {
      flex: 1 1 calc(50% - 8px);
    }

    a {
      width: 100%;
      justify-content: center;
      box-sizing: border-box;
    }
  }
}

#spacer {
  height: 88px;
  border-top: 1px solid var(--border);
  @media (max-width: 1024px) {
    height: 48px;
  }
}

.ticks {
  position: relative;
  width: 100%;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: -4.5px;
    border: 5px solid transparent;
  }

  &::before {
    left: 0;
    border-left-color: var(--border);
  }
  &::after {
    right: 0;
    border-right-color: var(--border);
  }
}
````

## File: src/App.tsx
````typescript
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { AuthProvider, useAuth } from "./features/auth/hooks/useAuth";
import { LoginPage } from "./pages/auth/LoginPage";
import { AppLayout } from "./shared/components/layout/AppLayout";

// Pages — Inventory
import { DashboardPage } from "./pages/dashboard/DashboardPage";
import { ProductsPage } from "./pages/inventory/ProductsPage";
import { CategoriesPage } from "./pages/inventory/CategoriesPage";

// Pages — Sales
import { PosPage } from "./pages/sales/PosPage";
import { SalesHistoryPage } from "./pages/sales/SalesHistoryPage";

// Pages — Purchases
import { PurchasesHistoryPage } from "./pages/purchases/PurchasesHistoryPage";

// Pages — Contacts
import { CustomersPage } from "./pages/contacts/CustomersPage";
import { SuppliersPage } from "./pages/contacts/SuppliersPage";

// Pages — Finance
import { DrawerPage } from "./pages/finance/DrawerPage";
import { SafePage } from "./pages/finance/SafePage";
import { ExpensesPage } from "./pages/finance/ExpensesPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 1, staleTime: 1000 * 60 },
  },
});

// Guard: redirects to /login if not authenticated
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

// Placeholder for routes not yet built
function ComingSoon({ label }: { label: string }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
      <p className="text-gray-400 text-sm">{label} — هذه الصفحة قيد الإنشاء...</p>
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <Toaster position="top-center" richColors />
          <Routes>
            {/* Public */}
            <Route path="/login" element={<LoginPage />} />

            {/* Protected — wrapped in AppLayout */}
            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route path="/"                   element={<DashboardPage />} />

              <Route path="/sales/pos"          element={<PosPage />} />
              <Route path="/sales/history"      element={<SalesHistoryPage />} />
              <Route path="/sales/returns"      element={<ComingSoon label="مرتجعات المبيعات" />} />

              <Route path="/purchases/new"      element={<ComingSoon label="فاتورة مشتريات جديدة" />} />
              <Route path="/purchases/history"  element={<PurchasesHistoryPage />} />
              <Route path="/purchases/returns"  element={<ComingSoon label="مرتجعات الموردين" />} />

              <Route path="/inventory/products"   element={<ProductsPage />} />
              <Route path="/inventory/categories" element={<CategoriesPage />} />

              <Route path="/contacts/customers" element={<CustomersPage />} />
              <Route path="/contacts/suppliers" element={<SuppliersPage />} />

              <Route path="/finance/drawer"   element={<DrawerPage />} />
              <Route path="/finance/safe"     element={<SafePage />} />
              <Route path="/finance/expenses" element={<ExpensesPage />} />

              <Route path="/settings" element={<ComingSoon label="الإعدادات" />} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
````

## File: src/app/routes/index.tsx
````typescript
import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

const LoginPage = lazy(() => import("@/features/auth/pages/LoginPage"));

export function AppRoutes() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center">جاري التحميل...</div>}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Suspense>
  );
}
````

## File: src/assets/react.svg
````xml
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--logos" width="35.93" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 256 228"><path fill="#00D8FF" d="M210.483 73.824a171.49 171.49 0 0 0-8.24-2.597c.465-1.9.893-3.777 1.273-5.621c6.238-30.281 2.16-54.676-11.769-62.708c-13.355-7.7-35.196.329-57.254 19.526a171.23 171.23 0 0 0-6.375 5.848a155.866 155.866 0 0 0-4.241-3.917C100.759 3.829 77.587-4.822 63.673 3.233C50.33 10.957 46.379 33.89 51.995 62.588a170.974 170.974 0 0 0 1.892 8.48c-3.28.932-6.445 1.924-9.474 2.98C17.309 83.498 0 98.307 0 113.668c0 15.865 18.582 31.778 46.812 41.427a145.52 145.52 0 0 0 6.921 2.165a167.467 167.467 0 0 0-2.01 9.138c-5.354 28.2-1.173 50.591 12.134 58.266c13.744 7.926 36.812-.22 59.273-19.855a145.567 145.567 0 0 0 5.342-4.923a168.064 168.064 0 0 0 6.92 6.314c21.758 18.722 43.246 26.282 56.54 18.586c13.731-7.949 18.194-32.003 12.4-61.268a145.016 145.016 0 0 0-1.535-6.842c1.62-.48 3.21-.974 4.76-1.488c29.348-9.723 48.443-25.443 48.443-41.52c0-15.417-17.868-30.326-45.517-39.844Zm-6.365 70.984c-1.4.463-2.836.91-4.3 1.345c-3.24-10.257-7.612-21.163-12.963-32.432c5.106-11 9.31-21.767 12.459-31.957c2.619.758 5.16 1.557 7.61 2.4c23.69 8.156 38.14 20.213 38.14 29.504c0 9.896-15.606 22.743-40.946 31.14Zm-10.514 20.834c2.562 12.94 2.927 24.64 1.23 33.787c-1.524 8.219-4.59 13.698-8.382 15.893c-8.067 4.67-25.32-1.4-43.927-17.412a156.726 156.726 0 0 1-6.437-5.87c7.214-7.889 14.423-17.06 21.459-27.246c12.376-1.098 24.068-2.894 34.671-5.345a134.17 134.17 0 0 1 1.386 6.193ZM87.276 214.515c-7.882 2.783-14.16 2.863-17.955.675c-8.075-4.657-11.432-22.636-6.853-46.752a156.923 156.923 0 0 1 1.869-8.499c10.486 2.32 22.093 3.988 34.498 4.994c7.084 9.967 14.501 19.128 21.976 27.15a134.668 134.668 0 0 1-4.877 4.492c-9.933 8.682-19.886 14.842-28.658 17.94ZM50.35 144.747c-12.483-4.267-22.792-9.812-29.858-15.863c-6.35-5.437-9.555-10.836-9.555-15.216c0-9.322 13.897-21.212 37.076-29.293c2.813-.98 5.757-1.905 8.812-2.773c3.204 10.42 7.406 21.315 12.477 32.332c-5.137 11.18-9.399 22.249-12.634 32.792a134.718 134.718 0 0 1-6.318-1.979Zm12.378-84.26c-4.811-24.587-1.616-43.134 6.425-47.789c8.564-4.958 27.502 2.111 47.463 19.835a144.318 144.318 0 0 1 3.841 3.545c-7.438 7.987-14.787 17.08-21.808 26.988c-12.04 1.116-23.565 2.908-34.161 5.309a160.342 160.342 0 0 1-1.76-7.887Zm110.427 27.268a347.8 347.8 0 0 0-7.785-12.803c8.168 1.033 15.994 2.404 23.343 4.08c-2.206 7.072-4.956 14.465-8.193 22.045a381.151 381.151 0 0 0-7.365-13.322Zm-45.032-43.861c5.044 5.465 10.096 11.566 15.065 18.186a322.04 322.04 0 0 0-30.257-.006c4.974-6.559 10.069-12.652 15.192-18.18ZM82.802 87.83a323.167 323.167 0 0 0-7.227 13.238c-3.184-7.553-5.909-14.98-8.134-22.152c7.304-1.634 15.093-2.97 23.209-3.984a321.524 321.524 0 0 0-7.848 12.897Zm8.081 65.352c-8.385-.936-16.291-2.203-23.593-3.793c2.26-7.3 5.045-14.885 8.298-22.6a321.187 321.187 0 0 0 7.257 13.246c2.594 4.48 5.28 8.868 8.038 13.147Zm37.542 31.03c-5.184-5.592-10.354-11.779-15.403-18.433c4.902.192 9.899.29 14.978.29c5.218 0 10.376-.117 15.453-.343c-4.985 6.774-10.018 12.97-15.028 18.486Zm52.198-57.817c3.422 7.8 6.306 15.345 8.596 22.52c-7.422 1.694-15.436 3.058-23.88 4.071a382.417 382.417 0 0 0 7.859-13.026a347.403 347.403 0 0 0 7.425-13.565Zm-16.898 8.101a358.557 358.557 0 0 1-12.281 19.815a329.4 329.4 0 0 1-23.444.823c-7.967 0-15.716-.248-23.178-.732a310.202 310.202 0 0 1-12.513-19.846h.001a307.41 307.41 0 0 1-10.923-20.627a310.278 310.278 0 0 1 10.89-20.637l-.001.001a307.318 307.318 0 0 1 12.413-19.761c7.613-.576 15.42-.876 23.31-.876H128c7.926 0 15.743.303 23.354.883a329.357 329.357 0 0 1 12.335 19.695a358.489 358.489 0 0 1 11.036 20.54a329.472 329.472 0 0 1-11 20.722Zm22.56-122.124c8.572 4.944 11.906 24.881 6.52 51.026c-.344 1.668-.73 3.367-1.15 5.09c-10.622-2.452-22.155-4.275-34.23-5.408c-7.034-10.017-14.323-19.124-21.64-27.008a160.789 160.789 0 0 1 5.888-5.4c18.9-16.447 36.564-22.941 44.612-18.3ZM128 90.808c12.625 0 22.86 10.235 22.86 22.86s-10.235 22.86-22.86 22.86s-22.86-10.235-22.86-22.86s10.235-22.86 22.86-22.86Z"></path></svg>
````

## File: src/assets/vite.svg
````xml
<svg xmlns="http://www.w3.org/2000/svg" width="77" height="47" fill="none" aria-labelledby="vite-logo-title" viewBox="0 0 77 47"><title id="vite-logo-title">Vite</title><style>.parenthesis{fill:#000}@media (prefers-color-scheme:dark){.parenthesis{fill:#fff}}</style><path fill="#9135ff" d="M40.151 45.71c-.663.844-2.02.374-2.02-.699V34.708a2.26 2.26 0 0 0-2.262-2.262H24.493c-.92 0-1.457-1.04-.92-1.788l7.479-10.471c1.07-1.498 0-3.578-1.842-3.578H15.443c-.92 0-1.456-1.04-.92-1.788l9.696-13.576c.213-.297.556-.474.92-.474h28.894c.92 0 1.456 1.04.92 1.788l-7.48 10.472c-1.07 1.497 0 3.578 1.842 3.578h11.376c.944 0 1.474 1.087.89 1.83L40.153 45.712z"/><mask id="a" width="48" height="47" x="14" y="0" maskUnits="userSpaceOnUse" style="mask-type:alpha"><path fill="#000" d="M40.047 45.71c-.663.843-2.02.374-2.02-.699V34.708a2.26 2.26 0 0 0-2.262-2.262H24.389c-.92 0-1.457-1.04-.92-1.788l7.479-10.472c1.07-1.497 0-3.578-1.842-3.578H15.34c-.92 0-1.456-1.04-.92-1.788l9.696-13.575c.213-.297.556-.474.92-.474H53.93c.92 0 1.456 1.04.92 1.788L47.37 13.03c-1.07 1.498 0 3.578 1.842 3.578h11.376c.944 0 1.474 1.088.89 1.831L40.049 45.712z"/></mask><g mask="url(#a)"><g filter="url(#b)"><ellipse cx="5.508" cy="14.704" fill="#eee6ff" rx="5.508" ry="14.704" transform="rotate(269.814 20.96 11.29)scale(-1 1)"/></g><g filter="url(#c)"><ellipse cx="10.399" cy="29.851" fill="#eee6ff" rx="10.399" ry="29.851" transform="rotate(89.814 -16.902 -8.275)scale(1 -1)"/></g><g filter="url(#d)"><ellipse cx="5.508" cy="30.487" fill="#8900ff" rx="5.508" ry="30.487" transform="rotate(89.814 -19.197 -7.127)scale(1 -1)"/></g><g filter="url(#e)"><ellipse cx="5.508" cy="30.599" fill="#8900ff" rx="5.508" ry="30.599" transform="rotate(89.814 -25.928 4.177)scale(1 -1)"/></g><g filter="url(#f)"><ellipse cx="5.508" cy="30.599" fill="#8900ff" rx="5.508" ry="30.599" transform="rotate(89.814 -25.738 5.52)scale(1 -1)"/></g><g filter="url(#g)"><ellipse cx="14.072" cy="22.078" fill="#eee6ff" rx="14.072" ry="22.078" transform="rotate(93.35 31.245 55.578)scale(-1 1)"/></g><g filter="url(#h)"><ellipse cx="3.47" cy="21.501" fill="#8900ff" rx="3.47" ry="21.501" transform="rotate(89.009 35.419 55.202)scale(-1 1)"/></g><g filter="url(#i)"><ellipse cx="3.47" cy="21.501" fill="#8900ff" rx="3.47" ry="21.501" transform="rotate(89.009 35.419 55.202)scale(-1 1)"/></g><g filter="url(#j)"><ellipse cx="14.592" cy="9.743" fill="#8900ff" rx="4.407" ry="29.108" transform="rotate(39.51 14.592 9.743)"/></g><g filter="url(#k)"><ellipse cx="61.728" cy="-5.321" fill="#8900ff" rx="4.407" ry="29.108" transform="rotate(37.892 61.728 -5.32)"/></g><g filter="url(#l)"><ellipse cx="55.618" cy="7.104" fill="#00c2ff" rx="5.971" ry="9.665" transform="rotate(37.892 55.618 7.104)"/></g><g filter="url(#m)"><ellipse cx="12.326" cy="39.103" fill="#8900ff" rx="4.407" ry="29.108" transform="rotate(37.892 12.326 39.103)"/></g><g filter="url(#n)"><ellipse cx="12.326" cy="39.103" fill="#8900ff" rx="4.407" ry="29.108" transform="rotate(37.892 12.326 39.103)"/></g><g filter="url(#o)"><ellipse cx="49.857" cy="30.678" fill="#8900ff" rx="4.407" ry="29.108" transform="rotate(37.892 49.857 30.678)"/></g><g filter="url(#p)"><ellipse cx="52.623" cy="33.171" fill="#00c2ff" rx="5.971" ry="15.297" transform="rotate(37.892 52.623 33.17)"/></g></g><path d="M6.919 0c-9.198 13.166-9.252 33.575 0 46.789h6.215c-9.25-13.214-9.196-33.623 0-46.789zm62.424 0h-6.215c9.198 13.166 9.252 33.575 0 46.789h6.215c9.25-13.214 9.196-33.623 0-46.789" class="parenthesis"/><defs><filter id="b" width="60.045" height="41.654" x="-5.564" y="16.92" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="7.659"/></filter><filter id="c" width="90.34" height="51.437" x="-40.407" y="-6.762" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="7.659"/></filter><filter id="d" width="79.355" height="29.4" x="-35.435" y="2.801" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="e" width="79.579" height="29.4" x="-30.84" y="20.8" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="f" width="79.579" height="29.4" x="-29.307" y="21.949" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="g" width="74.749" height="58.852" x="29.961" y="-17.13" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="7.659"/></filter><filter id="h" width="61.377" height="25.362" x="37.754" y="3.055" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="i" width="61.377" height="25.362" x="37.754" y="3.055" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="j" width="56.045" height="63.649" x="-13.43" y="-22.082" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="k" width="54.814" height="64.646" x="34.321" y="-37.644" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="l" width="33.541" height="35.313" x="38.847" y="-10.552" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="m" width="54.814" height="64.646" x="-15.081" y="6.78" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="n" width="54.814" height="64.646" x="-15.081" y="6.78" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="o" width="54.814" height="64.646" x="22.45" y="-1.645" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="p" width="39.409" height="43.623" x="32.919" y="11.36" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter></defs></svg>
````

## File: src/core/repositories/IAuthRepository.ts
````typescript
import { LoginFormData } from "@/features/auth/schemas/loginSchema";

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

export interface IAuthRepository {
  login(data: LoginFormData): Promise<AuthResponse>;
}
````

## File: src/core/repositories/IContactsRepository.ts
````typescript
import { PaginatedList, RequestFilters } from "@/shared/types/pagination";
import { 
  CreateCustomerRequest, 
  CustomerResponse, 
  CustomerStatementResponse, CustomerDebtHistoryResponse, 
  CreateSupplierRequest, 
  SupplierResponse, 
  SupplierStatementItemResponse, 
  CreatePaymentRequest 
} from "@/features/contacts/schemas/contactSchemas";

export interface IContactsRepository {
  // Customers
  getCustomers(filters: RequestFilters): Promise<PaginatedList<CustomerResponse>>;
  getCustomer(id: string): Promise<CustomerResponse>;
  getCustomerDebtHistory(id: string): Promise<CustomerDebtHistoryResponse>;
  createCustomer(data: CreateCustomerRequest): Promise<string>;
  updateCustomer(id: string, data: CreateCustomerRequest): Promise<void>;
  deleteCustomer(id: string): Promise<void>;
  
  // Customer Transactions
  getCustomerStatement(filters: RequestFilters): Promise<PaginatedList<CustomerStatementResponse>>;
  addCustomerPayment(customerId: string, data: CreatePaymentRequest): Promise<string>;

  // Suppliers
  getSuppliers(filters: RequestFilters): Promise<PaginatedList<SupplierResponse>>;
  getSupplier(id: string): Promise<SupplierResponse>;
  createSupplier(data: CreateSupplierRequest): Promise<string>;
  updateSupplier(id: string, data: CreateSupplierRequest): Promise<void>;
  deleteSupplier(id: string): Promise<void>;

  // Supplier Transactions
  getSupplierStatement(filters: RequestFilters): Promise<PaginatedList<SupplierStatementItemResponse>>;
  addSupplierPayment(supplierId: string, data: CreatePaymentRequest): Promise<string>;
}
````

## File: src/core/repositories/IFinanceRepository.ts
````typescript
import { PaginatedList, RequestFilters } from "@/shared/types/pagination";
import { 
  OpenSessionRequest, DrawerSessionResponse, AddManualTransactionRequest,
  CreateSafeRequest, SafeResponse, SafeTransactionResponse, ReceiveDrawerDepositRequest,
  CreateExpenseCategoryRequest, ExpenseCategoryResponse,
  CreateExpenseRequest, ExpenseResponse
} from "@/features/finance/schemas/financeSchemas";

export interface IFinanceRepository {
  // Drawer
  getCurrentDrawerSession(): Promise<DrawerSessionResponse>;
  openDrawerSession(data: OpenSessionRequest): Promise<string>;
  closeDrawerSession(): Promise<void>;
  addDrawerTransaction(data: AddManualTransactionRequest): Promise<string>;

  // Safe
  getSafes(): Promise<SafeResponse[]>;
  createSafe(data: CreateSafeRequest): Promise<string>;
  getSafeTransactions(safeId: string, filters: RequestFilters): Promise<PaginatedList<SafeTransactionResponse>>;
  receiveDrawerDeposit(safeId: string, data: ReceiveDrawerDepositRequest): Promise<string>;

  // Expenses
  getExpenseCategories(): Promise<ExpenseCategoryResponse[]>;
  createExpenseCategory(data: CreateExpenseCategoryRequest): Promise<string>;
  getExpenses(filters: RequestFilters): Promise<PaginatedList<ExpenseResponse>>;
  createExpense(data: CreateExpenseRequest): Promise<string>;
}
````

## File: src/core/repositories/IInventoryRepository.ts
````typescript
import { PaginatedList, RequestFilters } from "@/shared/types/pagination";
import { 
  CategoryResponse, 
  CreateProductRequest, 
  DepartmentResponse, 
  ProductBatchResponse, 
  ProductResponse 
} from "@/features/inventory/schemas/inventorySchemas";

export interface IInventoryRepository {
  // Categories
  getCategories(filters?: RequestFilters): Promise<PaginatedList<CategoryResponse>>;
  createCategory(name: string, description?: string): Promise<string>;
  
  // Departments
  getDepartments(categoryId?: string, filters?: RequestFilters): Promise<PaginatedList<DepartmentResponse>>;
  createDepartment(categoryId: string, name: string): Promise<string>;

  // Products
  getProducts(filters: RequestFilters): Promise<PaginatedList<ProductResponse>>;
  getProduct(id: string): Promise<ProductResponse>;
  createProduct(data: CreateProductRequest): Promise<string>;
  updateProduct(id: string, data: CreateProductRequest): Promise<void>;
  deleteProduct(id: string): Promise<void>;

  // Batches
  getProductBatches(filters: RequestFilters): Promise<PaginatedList<ProductBatchResponse>>;
}
````

## File: src/core/repositories/IInvoicesRepository.ts
````typescript
import { PaginatedList, RequestFilters } from "@/shared/types/pagination";
import { 
  CreateSalesInvoiceRequest, SalesInvoiceResponse,
  CreatePurchaseInvoiceRequest, PurchaseInvoiceResponse
} from "@/features/invoices/schemas/invoiceSchemas";
import { CreateSupplierReturnRequest, CreateCustomerReturnRequest } from "@/features/invoices/schemas/returnSchemas";

export interface IInvoicesRepository {
  // Sales Invoices
  getSalesInvoices(filters: RequestFilters): Promise<PaginatedList<SalesInvoiceResponse>>;
  getSalesInvoice(id: string): Promise<SalesInvoiceResponse>;
  createSalesInvoice(data: CreateSalesInvoiceRequest): Promise<string>;
  
  // Purchase Invoices
  getPurchaseInvoices(filters: RequestFilters): Promise<PaginatedList<PurchaseInvoiceResponse>>;
  getPurchaseInvoice(id: string): Promise<PurchaseInvoiceResponse>;
  createPurchaseInvoice(data: CreatePurchaseInvoiceRequest): Promise<string>;

  // Returns
  createSupplierReturn(data: CreateSupplierReturnRequest): Promise<string>;
  createCustomerReturn(customerId: string, data: CreateCustomerReturnRequest): Promise<string>;
}
````

## File: src/features/auth/api/AuthApi.ts
````typescript
import { apiClient } from '@/lib/axios';
import { IAuthRepository, AuthResponse } from '@/core/repositories/IAuthRepository';
import { LoginFormData } from '../schemas/loginSchema';

export class AuthRepository implements IAuthRepository {
  async login(data: LoginFormData): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/login', data);
    return response.data;
  }
}

export const authRepository = new AuthRepository();
````

## File: src/features/auth/components/LoginForm.tsx
````typescript
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginFormData } from "../schemas/loginSchema";
import { useLogin } from "../hooks/useAuth";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { tokens } from "@/shared/styles/tokens";

/**
 * Login form — userName + password with show/hide toggle.
 * Sends { userName, password } matching the backend's LoginRequest record.
 */
export function LoginForm() {
  const { mutate: login, isPending } = useLogin();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => login(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 w-full">

      {/* Username */}
      <div>
        <label className={tokens.font.label + " block mb-1.5"}>
          اسم المستخدم
        </label>
        <input
          id="userName"
          type="text"
          {...register("userName")}
          placeholder="admin"
          autoComplete="username"
          className={tokens.input + " bg-gray-50 focus:bg-white transition-colors"}
          dir="ltr"
        />
        {errors.userName && (
          <p className="text-red-500 text-xs mt-1">{errors.userName.message}</p>
        )}
      </div>

      {/* Password */}
      <div>
        <label className={tokens.font.label + " block mb-1.5"}>
          كلمة المرور
        </label>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            {...register("password")}
            placeholder="••••••••"
            autoComplete="current-password"
            className={tokens.input + " bg-gray-50 focus:bg-white transition-colors pl-10"}
            dir="ltr"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            tabIndex={-1}
          >
            {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
          </button>
        </div>
        {errors.password && (
          <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isPending}
        className={tokens.btn.primary + " w-full py-2.5 justify-center flex items-center gap-2 disabled:opacity-60 mt-2"}
      >
        {isPending ? (
          <>
            <Loader2 size={17} className="animate-spin" />
            جاري تسجيل الدخول...
          </>
        ) : (
          "تسجيل الدخول"
        )}
      </button>
    </form>
  );
}
````

## File: src/features/auth/hooks/useAuth.tsx
````typescript
import { createContext, useContext, useState, ReactNode } from "react";
import { useMutation } from "@tanstack/react-query";
import { authRepository } from "../api/AuthApi";
import { LoginFormData } from "../schemas/loginSchema";
import { toast } from "sonner";
import { storage } from "@/lib/storage";

interface AuthContextType {
  isAuthenticated: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!storage.getToken());

  const logout = () => {
    storage.clearToken();
    setIsAuthenticated(false);
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function useLogin() {
  return useMutation({
    mutationFn: (data: LoginFormData) => authRepository.login(data),
    onSuccess: (data) => {
      toast.success("تم تسجيل الدخول بنجاح!");
      storage.setToken(data.token);
      window.location.href = '/';
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || "فشل تسجيل الدخول. تحقق من البيانات.";
      toast.error(message);
    },
  });
}
````

## File: src/features/auth/pages/LoginPage.tsx
````typescript
import { LoginForm } from "../components/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="w-full max-w-md bg-surface p-8 rounded-xl shadow-sm border border-border">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">سنترالي</h1>
          <p className="text-muted-text">قم بتسجيل الدخول للوصول إلى لوحة التحكم</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
````

## File: src/features/auth/schemas/loginSchema.ts
````typescript
import * as z from "zod";

// Matches the backend's LoginRequest record: { UserName, Password }
export const loginSchema = z.object({
  userName: z.string().min(1, "اسم المستخدم مطلوب"),
  password: z.string().min(1, "كلمة المرور مطلوبة"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
````

## File: src/features/contacts/api/ContactsApi.ts
````typescript
import { apiClient } from "@/lib/axios";
import { IContactsRepository } from "@/core/repositories/IContactsRepository";
import { PaginatedList, RequestFilters } from "@/shared/types/pagination";
import { 
  CreateCustomerRequest, CustomerResponse, CustomerStatementResponse, 
  CreateSupplierRequest, SupplierResponse, SupplierStatementItemResponse, 
  CreatePaymentRequest 
} from "../schemas/contactSchemas";

import { CustomerDebtHistoryResponse } from '../schemas/contactSchemas';

export class ContactsRepository implements IContactsRepository {
  // --- Customers ---
  async getCustomers(filters: RequestFilters): Promise<PaginatedList<CustomerResponse>> {
    const { data } = await apiClient.get<PaginatedList<CustomerResponse>>('/customers', { params: filters });
    return data;
  }

  async getCustomer(id: string): Promise<CustomerResponse> {
    const { data } = await apiClient.get<CustomerResponse>(`/customers/${id}`);
    return data;
  }

  async getCustomerDebtHistory(id: string): Promise<CustomerDebtHistoryResponse> {
    const { data } = await apiClient.get<CustomerDebtHistoryResponse>(`/customers/${id}/debt-history`);
    return data;
  }

  async createCustomer(reqData: CreateCustomerRequest): Promise<string> {
    const { data } = await apiClient.post<string>('/customers', reqData);
    return data;
  }

  async updateCustomer(id: string, reqData: CreateCustomerRequest): Promise<void> {
    await apiClient.put(`/customers/${id}`, reqData);
  }

  async deleteCustomer(id: string): Promise<void> {
    await apiClient.delete(`/customers/${id}`);
  }

  async getCustomerStatement(filters: RequestFilters): Promise<PaginatedList<CustomerStatementResponse>> {
    if (!filters.customerId) throw new Error("customerId is required for statement");
    const { data } = await apiClient.get<PaginatedList<CustomerStatementResponse>>(`/customers/${filters.customerId}/transactions/statement`, { params: filters });
    return data;
  }

  async addCustomerPayment(customerId: string, reqData: CreatePaymentRequest): Promise<string> {
    const { data } = await apiClient.post<string>(`/customers/${customerId}/transactions/payments`, reqData);
    return data;
  }

  // --- Suppliers ---
  async getSuppliers(filters: RequestFilters): Promise<PaginatedList<SupplierResponse>> {
    const { data } = await apiClient.get<PaginatedList<SupplierResponse>>('/suppliers', { params: filters });
    return data;
  }

  async getSupplier(id: string): Promise<SupplierResponse> {
    const { data } = await apiClient.get<SupplierResponse>(`/suppliers/${id}`);
    return data;
  }

  async createSupplier(reqData: CreateSupplierRequest): Promise<string> {
    const { data } = await apiClient.post<string>('/suppliers', reqData);
    return data;
  }

  async updateSupplier(id: string, reqData: CreateSupplierRequest): Promise<void> {
    await apiClient.put(`/suppliers/${id}`, reqData);
  }

  async deleteSupplier(id: string): Promise<void> {
    await apiClient.delete(`/suppliers/${id}`);
  }

  async getSupplierStatement(filters: RequestFilters): Promise<PaginatedList<SupplierStatementItemResponse>> {
    if (!filters.supplierId) throw new Error("supplierId is required for statement");
    const { data } = await apiClient.get<PaginatedList<SupplierStatementItemResponse>>(`/suppliers/${filters.supplierId}/statement`, { params: filters });
    return data;
  }

  async addSupplierPayment(supplierId: string, reqData: CreatePaymentRequest): Promise<string> {
    const payload = { ...reqData, supplierId };
    const { data } = await apiClient.post<string>('/supplier-transactions/payments', payload);
    return data;
  }
}

export const contactsRepository = new ContactsRepository();
````

## File: src/features/contacts/hooks/useContacts.ts
````typescript
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { contactsRepository } from "../api/ContactsApi";
import { RequestFilters } from "@/shared/types/pagination";
import { CreateCustomerRequest, CreateSupplierRequest, CreatePaymentRequest } from "../schemas/contactSchemas";
import { toast } from "sonner";

export const CONTACT_KEYS = {
  customers: (filters: RequestFilters) => ["customers", filters] as const,
  customerDetails: (id: string) => ["customers", id] as const,
  customerStatement: (filters: RequestFilters) => ["customers", "statement", filters] as const,
  
  suppliers: (filters: RequestFilters) => ["suppliers", filters] as const,
  supplierDetails: (id: string) => ["suppliers", id] as const,
  supplierStatement: (filters: RequestFilters) => ["suppliers", "statement", filters] as const,
};

// --- Customer Queries & Mutations ---

export function useCustomers(filters: RequestFilters) {
  return useQuery({
    queryKey: CONTACT_KEYS.customers(filters),
    queryFn: () => contactsRepository.getCustomers(filters),
  });
}

export function useCustomer(id: string) {
  return useQuery({
    queryKey: CONTACT_KEYS.customerDetails(id),
    queryFn: () => contactsRepository.getCustomer(id),
    enabled: !!id,
  });
}

export function useCustomerStatement(filters: RequestFilters) {
  return useQuery({
    queryKey: CONTACT_KEYS.customerStatement(filters),
    queryFn: () => contactsRepository.getCustomerStatement(filters),
  });
}

export function useCreateCustomer() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateCustomerRequest) => contactsRepository.createCustomer(data),
    onSuccess: () => {
      toast.success("تم إضافة العميل بنجاح");
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
    onError: () => toast.error("حدث خطأ أثناء إضافة العميل"),
  });
}

export function useAddCustomerPayment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: CreatePaymentRequest }) => 
      contactsRepository.addCustomerPayment(id, data),
    onSuccess: (_, { id }) => {
      toast.success("تم تسجيل الدفعة بنجاح");
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      queryClient.invalidateQueries({ queryKey: CONTACT_KEYS.customerDetails(id) });
    },
    onError: () => toast.error("حدث خطأ أثناء تسجيل الدفعة"),
  });
}

// --- Supplier Queries & Mutations ---

export function useSuppliers(filters: RequestFilters) {
  return useQuery({
    queryKey: CONTACT_KEYS.suppliers(filters),
    queryFn: () => contactsRepository.getSuppliers(filters),
  });
}

export function useSupplier(id: string) {
  return useQuery({
    queryKey: CONTACT_KEYS.supplierDetails(id),
    queryFn: () => contactsRepository.getSupplier(id),
    enabled: !!id,
  });
}

export function useSupplierStatement(filters: RequestFilters) {
  return useQuery({
    queryKey: CONTACT_KEYS.supplierStatement(filters),
    queryFn: () => contactsRepository.getSupplierStatement(filters),
  });
}

export function useCreateSupplier() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateSupplierRequest) => contactsRepository.createSupplier(data),
    onSuccess: () => {
      toast.success("تم إضافة المورد بنجاح");
      queryClient.invalidateQueries({ queryKey: ["suppliers"] });
    },
    onError: () => toast.error("حدث خطأ أثناء إضافة المورد"),
  });
}

export function useAddSupplierPayment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: CreatePaymentRequest }) => 
      contactsRepository.addSupplierPayment(id, data),
    onSuccess: (_, { id }) => {
      toast.success("تم تسجيل الدفعة بنجاح");
      queryClient.invalidateQueries({ queryKey: ["suppliers"] });
      queryClient.invalidateQueries({ queryKey: CONTACT_KEYS.supplierDetails(id) });
    },
    onError: () => toast.error("حدث خطأ أثناء تسجيل الدفعة"),
  });
}
````

## File: src/features/contacts/schemas/contactSchemas.ts
````typescript
import * as z from "zod";

// --- Customers ---

export const createCustomerSchema = z.object({
  name: z.string().min(1, "Ø§Ù„Ø§Ø³Ù… Ù…Ø·Ù„ÙˆØ¨"),
  phone: z.string().optional(),
  email: z.string().email("Ø¨Ø±ÙŠØ¯ ØºÙŠØ± ØµØ§Ù„Ø­").optional().or(z.literal("")),
  address: z.string().optional(),
  notes: z.string().optional(),
});
export type CreateCustomerRequest = z.infer<typeof createCustomerSchema>;

export interface CustomerResponse {
  id: string;
  name: string;
  phone?: string;
  email?: string;
  address?: string;
  notes?: string;
  balance: number;
  createdAt: string;
}

export interface CustomerStatementResponse {
  date: string;
  transactionType: string;
  transactionId: string;
  debit: number;
  credit: number;
  balanceAfter: number;
  notes?: string;
}

// --- Suppliers ---

export const createSupplierSchema = z.object({
  name: z.string().min(1, "Ø§Ù„Ø§Ø³Ù… Ù…Ø·Ù„ÙˆØ¨"),
  phone: z.string().optional(),
  companyName: z.string().optional(),
  email: z.string().email("Ø¨Ø±ÙŠØ¯ ØºÙŠØ± ØµØ§Ù„Ø­").optional().or(z.literal("")),
  address: z.string().optional(),
  notes: z.string().optional(),
});
export type CreateSupplierRequest = z.infer<typeof createSupplierSchema>;

export interface SupplierResponse {
  id: string;
  name: string;
  companyName?: string;
  phone?: string;
  email?: string;
  address?: string;
  notes?: string;
  balance: number;
  createdAt: string;
}

export interface SupplierStatementItemResponse {
  date: string;
  transactionType: string;
  transactionId: string;
  debit: number;
  credit: number;
  balanceAfter: number;
  notes?: string;
}

// --- Payments ---

export const createPaymentSchema = z.object({
  amount: z.number().min(0.01, "Ø§Ù„Ù…Ø¨Ù„Øº ÙŠØ¬Ø¨ Ø£Ù† ÙŠÙƒÙˆÙ† Ø£ÙƒØ¨Ø± Ù…Ù† ØµÙØ±"),
  notes: z.string().optional(),
});
export type CreatePaymentRequest = z.infer<typeof createPaymentSchema>;

// --- Customer Debt History ---
export interface CustomerInvoiceSummary {
  id: string;
  invoiceNumber: string;
  totalAmount: number;
  paidAmount: number;
  remainingAmount: number;
  createdAt: string;
}
export interface CustomerDebtPaymentResponse {
  id: string;
  amount: number;
  createdAt: string;
  notes?: string;
}
export interface CustomerDebtHistoryResponse {
  customer: CustomerResponse;
  deferredInvoices: CustomerInvoiceSummary[];
  payments: CustomerDebtPaymentResponse[];
}
````

## File: src/features/finance/api/FinanceApi.ts
````typescript
import { apiClient } from "@/lib/axios";
import { IFinanceRepository } from "@/core/repositories/IFinanceRepository";
import { PaginatedList, RequestFilters } from "@/shared/types/pagination";
import { 
  OpenSessionRequest, DrawerSessionResponse, AddManualTransactionRequest,
  CreateSafeRequest, SafeResponse, SafeTransactionResponse, ReceiveDrawerDepositRequest,
  CreateExpenseCategoryRequest, ExpenseCategoryResponse,
  CreateExpenseRequest, ExpenseResponse
} from "../schemas/financeSchemas";

export class FinanceRepository implements IFinanceRepository {
  // --- Drawer ---
  async getCurrentDrawerSession(): Promise<DrawerSessionResponse> {
    const { data } = await apiClient.get<DrawerSessionResponse>('/drawers/active');
    return data;
  }

  async openDrawerSession(reqData: OpenSessionRequest): Promise<string> {
    const { data } = await apiClient.post<string>('/drawers/open', reqData);
    return data;
  }

  async closeDrawerSession(): Promise<void> {
    await apiClient.post('/drawers/close');
  }

  async addDrawerTransaction(reqData: AddManualTransactionRequest): Promise<string> {
    const { data } = await apiClient.post<string>('/drawers/transactions/manual', reqData);
    return data;
  }

  // --- Safe ---
  async getSafes(): Promise<SafeResponse[]> {
    const { data } = await apiClient.get<SafeResponse[]>('/Safe'); // Route is 'Safe' uppercase in backend controller
    return data;
  }

  async createSafe(reqData: CreateSafeRequest): Promise<string> {
    const { data } = await apiClient.post<string>('/Safe', reqData);
    return data;
  }

  async receiveDrawerDeposit(safeId: string, reqData: ReceiveDrawerDepositRequest): Promise<string> {
    const { data } = await apiClient.post<string>(`/Safe/${safeId}/deposit`, reqData);
    return data;
  }

  async getSafeTransactions(safeId: string, filters: RequestFilters): Promise<PaginatedList<SafeTransactionResponse>> {
    // Backend doesn't have GetAllSafeTransactions endpoint in controller yet, mocking it for now or leaving it ready
    const { data } = await apiClient.get<PaginatedList<SafeTransactionResponse>>(`/Safe/${safeId}/transactions`, { params: filters });
    return data;
  }

  // --- Expenses ---
  async getExpenseCategories(): Promise<ExpenseCategoryResponse[]> {
    const { data } = await apiClient.get<ExpenseCategoryResponse[]>('/expenses/categories');
    return data;
  }

  async createExpenseCategory(reqData: CreateExpenseCategoryRequest): Promise<string> {
    const { data } = await apiClient.post<string>('/expenses/categories', reqData);
    return data;
  }

  async getExpenses(filters: RequestFilters): Promise<PaginatedList<ExpenseResponse>> {
    // Note: Ensure backend has a GET /expenses endpoint with pagination.
    const { data } = await apiClient.get<PaginatedList<ExpenseResponse>>('/expenses', { params: filters });
    return data;
  }

  async createExpense(reqData: CreateExpenseRequest): Promise<string> {
    const { data } = await apiClient.post<string>('/expenses', reqData);
    return data;
  }
}

export const financeRepository = new FinanceRepository();
````

## File: src/features/finance/hooks/useFinance.ts
````typescript
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { financeRepository } from "../api/FinanceApi";
import { RequestFilters } from "@/shared/types/pagination";
import { 
  OpenSessionRequest, AddManualTransactionRequest, CreateSafeRequest, 
  ReceiveDrawerDepositRequest, CreateExpenseCategoryRequest, CreateExpenseRequest 
} from "../schemas/financeSchemas";
import { toast } from "sonner";

export const FINANCE_KEYS = {
  activeDrawer: ["drawer", "active"] as const,
  safes: ["safes"] as const,
  safeTransactions: (safeId: string, filters: RequestFilters) => ["safes", safeId, "transactions", filters] as const,
  expenseCategories: ["expenseCategories"] as const,
  expenses: (filters: RequestFilters) => ["expenses", filters] as const,
};

// --- Drawer ---

export function useActiveDrawer() {
  return useQuery({
    queryKey: FINANCE_KEYS.activeDrawer,
    queryFn: () => financeRepository.getCurrentDrawerSession(),
  });
}

export function useOpenDrawer() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: OpenSessionRequest) => financeRepository.openDrawerSession(data),
    onSuccess: () => {
      toast.success("تم فتح الدرج بنجاح");
      queryClient.invalidateQueries({ queryKey: FINANCE_KEYS.activeDrawer });
    },
    onError: () => toast.error("حدث خطأ أثناء فتح الدرج"),
  });
}

export function useCloseDrawer() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => financeRepository.closeDrawerSession(),
    onSuccess: () => {
      toast.success("تم إغلاق الدرج بنجاح");
      queryClient.invalidateQueries({ queryKey: FINANCE_KEYS.activeDrawer });
    },
    onError: () => toast.error("حدث خطأ أثناء إغلاق الدرج"),
  });
}

export function useAddDrawerTransaction() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: AddManualTransactionRequest) => financeRepository.addDrawerTransaction(data),
    onSuccess: () => {
      toast.success("تم تسجيل الحركة بنجاح");
      queryClient.invalidateQueries({ queryKey: FINANCE_KEYS.activeDrawer });
    },
    onError: () => toast.error("حدث خطأ أثناء تسجيل الحركة"),
  });
}

// --- Safe ---

export function useSafes() {
  return useQuery({
    queryKey: FINANCE_KEYS.safes,
    queryFn: () => financeRepository.getSafes(),
  });
}

export function useCreateSafe() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateSafeRequest) => financeRepository.createSafe(data),
    onSuccess: () => {
      toast.success("تم إضافة الخزينة بنجاح");
      queryClient.invalidateQueries({ queryKey: FINANCE_KEYS.safes });
    },
    onError: () => toast.error("حدث خطأ أثناء إضافة الخزينة"),
  });
}

export function useReceiveDrawerDeposit() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ safeId, data }: { safeId: string, data: ReceiveDrawerDepositRequest }) => 
      financeRepository.receiveDrawerDeposit(safeId, data),
    onSuccess: () => {
      toast.success("تم إيداع النقدية بنجاح");
      queryClient.invalidateQueries({ queryKey: FINANCE_KEYS.safes });
      queryClient.invalidateQueries({ queryKey: FINANCE_KEYS.activeDrawer });
    },
    onError: () => toast.error("حدث خطأ أثناء الإيداع"),
  });
}

// --- Expenses ---

export function useExpenseCategories() {
  return useQuery({
    queryKey: FINANCE_KEYS.expenseCategories,
    queryFn: () => financeRepository.getExpenseCategories(),
  });
}

export function useCreateExpenseCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateExpenseCategoryRequest) => financeRepository.createExpenseCategory(data),
    onSuccess: () => {
      toast.success("تم إضافة بند المصروف بنجاح");
      queryClient.invalidateQueries({ queryKey: FINANCE_KEYS.expenseCategories });
    },
    onError: () => toast.error("حدث خطأ أثناء إضافة البند"),
  });
}

export function useCreateExpense() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateExpenseRequest) => financeRepository.createExpense(data),
    onSuccess: () => {
      toast.success("تم تسجيل المصروف بنجاح");
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
      queryClient.invalidateQueries({ queryKey: FINANCE_KEYS.activeDrawer });
      queryClient.invalidateQueries({ queryKey: FINANCE_KEYS.safes });
    },
    onError: () => toast.error("حدث خطأ أثناء تسجيل المصروف"),
  });
}
````

## File: src/features/finance/schemas/financeSchemas.ts
````typescript
import * as z from "zod";

// --- Enums ---
export type DrawerTransactionType = 1 | 2; // Income = 1, Expense = 2
export type DrawerTransactionCategory = 1 | 2 | 3 | 4 | 5; 
export type ExpensePaymentSource = 1 | 2; // Drawer = 1, Safe = 2

// --- Drawer ---

export const openSessionSchema = z.object({
  openingBalance: z.number().min(0),
});
export type OpenSessionRequest = z.infer<typeof openSessionSchema>;

export const addManualTransactionSchema = z.object({
  type: z.number(),
  category: z.number(),
  amount: z.number().min(0.01),
  notes: z.string().optional(),
  source: z.string().optional(),
});
export type AddManualTransactionRequest = z.infer<typeof addManualTransactionSchema>;

export interface DrawerTransactionResponse {
  id: string;
  type: DrawerTransactionType;
  category: DrawerTransactionCategory;
  amount: number;
  balance: number;
  source?: string;
  notes?: string;
  createdAt: string;
  userId: string;
}

export interface DrawerSessionResponse {
  id: string;
  openingBalance: number;
  openedAt: string;
  openedByUserId: string;
  isClosed: boolean;
  closedAt?: string;
  totalIncome?: number;
  totalExpense?: number;
  closingBalance?: number;
  transactions: DrawerTransactionResponse[];
}

// --- Safe ---

export const createSafeSchema = z.object({
  name: z.string().min(1),
  isMain: z.boolean(),
  initialBalance: z.number().min(0),
});
export type CreateSafeRequest = z.infer<typeof createSafeSchema>;

export const receiveDrawerDepositSchema = z.object({
  drawerSessionId: z.string().min(1),
  amount: z.number().min(0.01),
  notes: z.string().optional(),
});
export type ReceiveDrawerDepositRequest = z.infer<typeof receiveDrawerDepositSchema>;

export interface SafeResponse {
  id: string;
  name: string;
  balance: number;
  isMain: boolean;
}

export interface SafeTransactionResponse {
  id: string;
  safeId: string;
  transactionType: string;
  category: string;
  amount: number;
  balanceAfter: number;
  createdAt: string;
  notes?: string;
}

// --- Expenses ---

export const createExpenseCategorySchema = z.object({
  name: z.string().min(1),
});
export type CreateExpenseCategoryRequest = z.infer<typeof createExpenseCategorySchema>;

export const createExpenseSchema = z.object({
  categoryId: z.string().min(1),
  amount: z.number().min(0.01),
  paymentSource: z.number(), // ExpensePaymentSource
  notes: z.string().optional(),
});
export type CreateExpenseRequest = z.infer<typeof createExpenseSchema>;

export interface ExpenseCategoryResponse {
  id: string;
  name: string;
}

export interface ExpenseResponse {
  id: string;
  categoryId: string;
  categoryName: string;
  amount: number;
  paymentSource: string;
  expenseDate: string;
  notes?: string;
}
````

## File: src/features/inventory/api/InventoryApi.ts
````typescript
import { apiClient } from "@/lib/axios";
import { IInventoryRepository } from "@/core/repositories/IInventoryRepository";
import { PaginatedList, RequestFilters } from "@/shared/types/pagination";
import { 
  CategoryResponse, 
  CreateProductRequest, 
  DepartmentResponse, 
  ProductBatchResponse, 
  ProductResponse 
} from "../schemas/inventorySchemas";

export class InventoryRepository implements IInventoryRepository {
  async getCategories(filters?: RequestFilters): Promise<PaginatedList<CategoryResponse>> {
    const { data } = await apiClient.get<PaginatedList<CategoryResponse>>('/categories', { params: filters });
    return data;
  }

  async createCategory(name: string, description?: string): Promise<string> {
    const { data } = await apiClient.post<string>('/categories', { name, description });
    return data;
  }

  async getDepartments(categoryId?: string, filters?: RequestFilters): Promise<PaginatedList<DepartmentResponse>> {
    const params = { ...filters, categoryId };
    const { data } = await apiClient.get<PaginatedList<DepartmentResponse>>('/departments', { params });
    return data;
  }

  async createDepartment(categoryId: string, name: string): Promise<string> {
    const { data } = await apiClient.post<string>('/departments', { categoryId, name });
    return data;
  }

  async getProducts(filters: RequestFilters): Promise<PaginatedList<ProductResponse>> {
    const { data } = await apiClient.get<PaginatedList<ProductResponse>>('/products', { params: filters });
    return data;
  }

  async getProduct(id: string): Promise<ProductResponse> {
    const { data } = await apiClient.get<ProductResponse>(`/products/${id}`);
    return data;
  }

  async createProduct(reqData: CreateProductRequest): Promise<string> {
    const formData = new FormData();
    if (reqData.barcode) formData.append('Barcode', reqData.barcode);
    if (reqData.name) formData.append('Name', reqData.name);
    if (reqData.departmentId) formData.append('DepartmentId', reqData.departmentId);
    if (reqData.categoryId) formData.append('CategoryId', reqData.categoryId);
    formData.append('MinQuantityAlert', reqData.minQuantityAlert.toString());
    if (reqData.storageLocation) formData.append('StorageLocation', reqData.storageLocation);
    if (reqData.image instanceof File) {
      formData.append('Image', reqData.image);
    }
    if (reqData.properties) {
      Object.entries(reqData.properties).forEach(([key, value]) => {
        formData.append(`Properties[${key}]`, value as string);
      });
    }

    const { data } = await apiClient.post<string>('/products', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return data;
  }

  async updateProduct(id: string, reqData: CreateProductRequest): Promise<void> {
    const formData = new FormData();
    if (reqData.barcode) formData.append('Barcode', reqData.barcode);
    if (reqData.name) formData.append('Name', reqData.name);
    if (reqData.departmentId) formData.append('DepartmentId', reqData.departmentId);
    if (reqData.categoryId) formData.append('CategoryId', reqData.categoryId);
    formData.append('MinQuantityAlert', reqData.minQuantityAlert.toString());
    if (reqData.storageLocation) formData.append('StorageLocation', reqData.storageLocation);
    if (reqData.image instanceof File) {
      formData.append('Image', reqData.image);
    }
    if (reqData.properties) {
      Object.entries(reqData.properties).forEach(([key, value]) => {
        formData.append(`Properties[${key}]`, value as string);
      });
    }

    await apiClient.put(`/products/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  }

  async deleteProduct(id: string): Promise<void> {
    await apiClient.delete(`/products/${id}`);
  }

  async getProductBatches(filters: RequestFilters): Promise<PaginatedList<ProductBatchResponse>> {
    const { data } = await apiClient.get<PaginatedList<ProductBatchResponse>>('/products/batches', { params: filters });
    return data;
  }
}

export const inventoryRepository = new InventoryRepository();
````

## File: src/features/inventory/components/AddProductForm.tsx
````typescript
import { useForm, useWatch, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createProductSchema, CategoryResponse } from '@/features/inventory/schemas/inventorySchemas';
import { useDepartments } from '@/features/inventory/hooks/useInventory';
import { tokens } from '@/shared/styles/tokens';
import { Plus, Trash2 } from 'lucide-react';

interface AddProductFormProps {
  categories?: CategoryResponse[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: (data: any) => void;
  isSubmitting: boolean;
}

export function AddProductForm({ categories, onSubmit, isSubmitting: _ }: AddProductFormProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createProductSchema),
    defaultValues: { minQuantityAlert: 5, categoryId: '', departmentId: '', propertiesList: [] },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'propertiesList'
  });

  // Watch categoryId to fetch related departments
  const selectedCategoryId = useWatch({ control, name: 'categoryId' });
  const { data: departmentsData } = useDepartments(selectedCategoryId || undefined);
  const departments = departmentsData?.items || [];

  return (
    <form id="add-product-form" onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Product Name */}
      <div>
        <label className={tokens.font.label + " block mb-1.5"}>
          اسم المنتج <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          {...register('name')}
          placeholder="مثال: لابتوب ديل XPS"
          className={tokens.input}
        />
        {errors.name && (
          <p className="text-red-500 text-xs mt-1">{String(errors.name.message)}</p>
        )}
      </div>

      {/* Barcode */}
      <div>
        <label className={tokens.font.label + " block mb-1.5"}>الباركود</label>
        <div className="flex gap-2">
          <input
            type="text"
            {...register('barcode')}
            placeholder="ادخل الباركود أو استخدم القارئ"
            className={tokens.input}
          />
          <button type="button" className={tokens.btn.ghost}>
            توليد
          </button>
        </div>
      </div>

      {/* Category */}
      <div>
        <label className={tokens.font.label + " block mb-1.5"}>
          القسم الرئيسي <span className="text-red-500">*</span>
        </label>
        <select {...register('categoryId')} className={tokens.select}>
          <option value="">اختر القسم</option>
          {categories?.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        {errors.categoryId && (
          <p className="text-red-500 text-xs mt-1">{String(errors.categoryId.message)}</p>
        )}
      </div>

      {/* Department */}
      <div>
        <label className={tokens.font.label + " block mb-1.5"}>
          القسم الفرعي <span className="text-red-500">*</span>
        </label>
        <select {...register('departmentId')} className={tokens.select} disabled={!selectedCategoryId}>
          <option value="">اختر القسم الفرعي</option>
          {departments?.map((dep) => (
            <option key={dep.id} value={dep.id}>
              {dep.name}
            </option>
          ))}
        </select>
        {errors.departmentId && (
          <p className="text-red-500 text-xs mt-1">{String(errors.departmentId.message)}</p>
        )}
      </div>

      {/* Min Quantity Alert */}
      <div>
        <label className={tokens.font.label + " block mb-1.5"}>
          حد تنبيه الكمية (Min Quantity Alert) <span className="text-red-500">*</span>
        </label>
        <input type="number" {...register('minQuantityAlert')} className={tokens.input} />
        <p className={tokens.font.helperText + " mt-1"}>
          سيتم تنبيهك عندما تصل كمية هذا المنتج إلى هذا الرقم
        </p>
      </div>

      {/* Storage Location */}
      <div>
        <label className={tokens.font.label + " block mb-1.5"}>مكان التخزين (Storage Location)</label>
        <input
          type="text"
          {...register('storageLocation')}
          placeholder="مثال: الرف A1"
          className={tokens.input}
        />
      </div>

      {/* Properties (Dictionary) */}
      <div className="pt-2 border-t border-gray-100">
        <div className="flex justify-between items-center mb-3">
          <label className={tokens.font.label}>خصائص إضافية (اختياري)</label>
          <button
            type="button"
            onClick={() => append({ key: '', value: '' })}
            className="text-blue-600 text-xs font-semibold flex items-center gap-1 hover:text-blue-700 bg-blue-50 px-2 py-1 rounded-md"
          >
            <Plus size={14} /> إضافة خاصية
          </button>
        </div>

        {fields.length > 0 ? (
          <div className="space-y-3">
            {fields.map((field, index) => (
              <div key={field.id} className="flex gap-2 items-start">
                <div className="flex-1">
                  <input
                    {...register(`propertiesList.${index}.key`)}
                    placeholder="الخاصية (مثال: اللون)"
                    className={tokens.input}
                  />
                  {errors.propertiesList?.[index]?.key && (
                    <p className="text-red-500 text-xs mt-1">{String(errors.propertiesList[index].key?.message)}</p>
                  )}
                </div>
                <div className="flex-1">
                  <input
                    {...register(`propertiesList.${index}.value`)}
                    placeholder="القيمة (مثال: أحمر)"
                    className={tokens.input}
                  />
                  {errors.propertiesList?.[index]?.value && (
                    <p className="text-red-500 text-xs mt-1">{String(errors.propertiesList[index].value?.message)}</p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="mt-2 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-gray-400">لا توجد خصائص مضافة. يمكنك إضافة تفاصيل مثل اللون، المقاس، إلخ.</p>
        )}
      </div>

      {/* Image Upload */}
      <div>
        <label className={tokens.font.label + " block mb-1.5"}>صورة المنتج</label>
        <input
          type="file"
          accept="image/*"
          className={tokens.input}
          {...register('image')}
        />
      </div>
    </form>
  );
}
````

## File: src/features/inventory/components/ProductFilters.tsx
````typescript
import { Search, Plus } from 'lucide-react';
import { CategoryResponse } from '@/features/inventory/schemas/inventorySchemas';
import { tokens } from '@/shared/styles/tokens';

interface ProductFiltersProps {
  searchTerm: string;
  onSearchChange: (val: string) => void;
  categoryFilter: string;
  onCategoryChange: (val: string) => void;
  categories?: CategoryResponse[];
  onAddClick: () => void;
}

/**
 * Toolbar: search input + category dropdown + "Add Product" button.
 * Purely presentational — all state lives in the parent (ProductsPage).
 */
export function ProductFilters({
  searchTerm,
  onSearchChange,
  categoryFilter,
  onCategoryChange,
  categories,
  onAddClick,
}: ProductFiltersProps) {
  return (
    <div className={`${tokens.card} p-4 flex flex-wrap gap-4 items-center justify-between bg-gray-50/50`}>
      {/* Left side: Search + Category filter */}
      <div className="flex items-center gap-3 flex-1 flex-wrap">
        {/* Search — pr-10 for icon space (RTL) */}
        <div className="relative max-w-sm flex-1 min-w-[200px]">
          <Search
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            size={16}
          />
          <input
            type="text"
            placeholder="بحث بالاسم أو الباركود..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
          />
        </div>

        {/* Category Select */}
        <select
          value={categoryFilter}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        >
          <option value="">جميع الأقسام</option>
          {categories?.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Right side: Add Button */}
      <button onClick={onAddClick} className={tokens.btn.primary + " flex items-center gap-2"}>
        <Plus size={16} />
        إضافة منتج جديد
      </button>
    </div>
  );
}
````

## File: src/features/inventory/components/ProductsTable.tsx
````typescript
import { Edit, Eye, Trash2 } from 'lucide-react';
import { DataTable } from '@/shared/components/ui/DataTable';
import { ProductStatusBadge } from './ProductStatusBadge';
import { ProductResponse } from '@/features/inventory/schemas/inventorySchemas';
import { PaginatedList } from '@/shared/types/pagination';
import { tokens } from '@/shared/styles/tokens';

interface ProductsTableProps {
  data?: PaginatedList<ProductResponse>;
  isLoading: boolean;
  pageIndex: number;
  onNextPage: () => void;
  onPrevPage: () => void;
  onEdit?: (product: ProductResponse) => void;
  onDelete?: (product: ProductResponse) => void;
  onViewBatches?: (product: ProductResponse) => void;
}

/**
 * Products table — defines columns and delegates rendering to the shared DataTable.
 * All column definitions live here, NOT in the page.
 */
export function ProductsTable({
  data,
  isLoading,
  pageIndex,
  onNextPage,
  onPrevPage,
  onEdit,
  onDelete,
  onViewBatches,
}: ProductsTableProps) {
  const columns = [
    {
      header: 'المنتج',
      cell: (row: ProductResponse) => (
        <span className="font-medium text-gray-900">{row.name}</span>
      ),
    },
    {
      header: 'الباركود',
      cell: (row: ProductResponse) => (
        <span className={tokens.font.muted}>{row.barcode || '---'}</span>
      ),
    },
    {
      header: 'القسم',
      cell: (row: ProductResponse) => (
        <span className={tokens.badge.indigo}>{row.categoryName || '---'}</span>
      ),
    },
    {
      header: 'الكمية المتوفرة',
      cell: (row: ProductResponse) => (
        <ProductStatusBadge quantity={row.totalQuantity} reorderLevel={row.minQuantityAlert} />
      ),
    },
    {
      header: 'حد الطلب',
      cell: (row: ProductResponse) => (
        <span className={tokens.font.muted}>{row.minQuantityAlert}</span>
      ),
    },
    {
      header: 'الإجراءات',
      cell: (row: ProductResponse) => (
        <div className="flex justify-center gap-3 text-gray-400">
          <button
            onClick={() => onViewBatches?.(row)}
            className="hover:text-blue-600 transition-colors"
            title="عرض الدفعات"
          >
            <Eye size={18} />
          </button>
          <button
            onClick={() => onEdit?.(row)}
            className="hover:text-amber-500 transition-colors"
            title="تعديل"
          >
            <Edit size={18} />
          </button>
          <button
            onClick={() => onDelete?.(row)}
            className="hover:text-red-500 transition-colors"
            title="حذف"
          >
            <Trash2 size={18} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={data?.items || []}
      isLoading={isLoading}
      pageIndex={data?.pageNumber || pageIndex}
      totalPages={data?.totalPages || 1}
      totalCount={data?.totalCount || 0}
      pageSize={10}
      onNextPage={onNextPage}
      onPrevPage={onPrevPage}
    />
  );
}
````

## File: src/features/inventory/components/ProductStatusBadge.tsx
````typescript
interface ProductStatusBadgeProps {
  quantity: number;
  reorderLevel: number;
}

/**
 * Shows a colored dot + quantity text.
 * Green dot = stock OK, Red dot = low stock (below reorder level).
 */
export function ProductStatusBadge({ quantity, reorderLevel }: ProductStatusBadgeProps) {
  const isLow = quantity <= reorderLevel;
  return (
    <div className="flex items-center gap-2">
      <div className={`w-2 h-2 rounded-full flex-shrink-0 ${isLow ? 'bg-red-500' : 'bg-green-500'}`} />
      <span className={isLow ? 'text-red-600 font-medium' : ''}>
        {quantity} قطعة
      </span>
    </div>
  );
}
````

## File: src/features/inventory/hooks/useInventory.ts
````typescript
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { inventoryRepository } from "../api/InventoryApi";
import { RequestFilters } from "@/shared/types/pagination";
import { CreateProductRequest } from "../schemas/inventorySchemas";
import { toast } from "sonner";

export const INVENTORY_KEYS = {
  categories: ["categories"] as const,
  departments: (categoryId?: string) => ["departments", categoryId] as const,
  products: (filters: RequestFilters) => ["products", filters] as const,
  productDetails: (id: string) => ["products", id] as const,
  batches: (filters: RequestFilters) => ["batches", filters] as const,
};

// --- Queries ---

export function useCategories(filters: RequestFilters = { pageNumber: 1, pageSize: 100 }) {
  return useQuery({
    queryKey: [...INVENTORY_KEYS.categories, filters],
    queryFn: () => inventoryRepository.getCategories(filters),
  });
}

export function useDepartments(categoryId?: string, filters: RequestFilters = { pageNumber: 1, pageSize: 100 }) {
  return useQuery({
    queryKey: [...INVENTORY_KEYS.departments(categoryId), filters],
    queryFn: () => inventoryRepository.getDepartments(categoryId, filters),
  });
}

export function useProducts(filters: RequestFilters) {
  return useQuery({
    queryKey: INVENTORY_KEYS.products(filters),
    queryFn: () => inventoryRepository.getProducts(filters),
  });
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: INVENTORY_KEYS.productDetails(id),
    queryFn: () => inventoryRepository.getProduct(id),
    enabled: !!id,
  });
}

export function useProductBatches(filters: RequestFilters) {
  return useQuery({
    queryKey: INVENTORY_KEYS.batches(filters),
    queryFn: () => inventoryRepository.getProductBatches(filters),
  });
}

// --- Mutations ---

export function useCreateProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateProductRequest) => inventoryRepository.createProduct(data),
    onSuccess: () => {
      toast.success("تم إضافة المنتج بنجاح!");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: () => toast.error("حدث خطأ أثناء إضافة المنتج"),
  });
}

export function useUpdateProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: CreateProductRequest }) => 
      inventoryRepository.updateProduct(id, data),
    onSuccess: (_, { id }) => {
      toast.success("تم تعديل المنتج بنجاح!");
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: INVENTORY_KEYS.productDetails(id) });
    },
    onError: () => toast.error("حدث خطأ أثناء تعديل المنتج"),
  });
}

export function useDeleteProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => inventoryRepository.deleteProduct(id),
    onSuccess: () => {
      toast.success("تم حذف المنتج بنجاح!");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: () => toast.error("حدث خطأ أثناء حذف المنتج"),
  });
}
````

## File: src/features/inventory/schemas/inventorySchemas.ts
````typescript
import { z } from "zod";

// Shared common filters
export const baseFiltersSchema = z.object({
  pageNumber: z.coerce.number().min(1).optional(),
  pageSize: z.coerce.number().min(1).max(100).optional(),
  searchValue: z.string().optional(),
});

// Categories
export interface CategoryResponse {
  id: string;
  name: string;
  description?: string;
}

// Departments
export interface DepartmentResponse {
  id: string;
  categoryId: string;
  name: string;
}

// Products
export const createProductSchema = z.object({
  barcode: z.string().optional(),
  name: z.string().min(1, "اسم المنتج مطلوب"),
  departmentId: z.string().min(1, "القسم الفرعي مطلوب"),
  categoryId: z.string().min(1, "القسم الرئيسي مطلوب"),
  // Note: File validation in zod is tricky on the client, we'll type it as any for the form
  image: z.any().optional(),
  minQuantityAlert: z.coerce.number().min(0, "يجب أن تكون 0 أو أكثر"),
  storageLocation: z.string().optional(),
  propertiesList: z.array(z.object({
    key: z.string().min(1, "الاسم مطلوب"),
    value: z.string().min(1, "القيمة مطلوبة")
  })).optional()
});

export type CreateProductRequest = z.infer<typeof createProductSchema> & {
  properties?: Record<string, string>;
};

export interface ProductResponse {
  id: string;
  barcode: string;
  name: string;
  departmentId: string;
  departmentName: string;
  categoryId: string;
  categoryName: string;
  minQuantityAlert: number;
  totalQuantity: number;
  averageUnitCost: number;
  storageLocation: string;
  imageUrl?: string;
  properties?: Record<string, string>;
}

// Batches
export interface ProductBatchResponse {
  id: string;
  productId: string;
  productName: string;
  supplierId?: string;
  supplierName?: string;
  purchaseInvoiceId?: string;
  quantity: number;
  unitCost: number;
  retailPrice: number;
  wholesalePrice: number;
  expiryDate?: string;
  receivedAt: string;
}
````

## File: src/features/invoices/api/InvoicesApi.ts
````typescript
import { apiClient } from "@/lib/axios";
import { IInvoicesRepository } from "@/core/repositories/IInvoicesRepository";
import { PaginatedList, RequestFilters } from "@/shared/types/pagination";
import { 
  CreateSalesInvoiceRequest, SalesInvoiceResponse,
  CreatePurchaseInvoiceRequest, PurchaseInvoiceResponse
} from "../schemas/invoiceSchemas";
import { CreateSupplierReturnRequest } from "../schemas/returnSchemas";

import { CreateCustomerReturnRequest } from '../schemas/returnSchemas';

export class InvoicesRepository implements IInvoicesRepository {
  // --- Sales ---
  async getSalesInvoices(filters: RequestFilters): Promise<PaginatedList<SalesInvoiceResponse>> {
    const { data } = await apiClient.get<PaginatedList<SalesInvoiceResponse>>('/sales-invoices', { params: filters });
    return data;
  }

  async getSalesInvoice(id: string): Promise<SalesInvoiceResponse> {
    const { data } = await apiClient.get<SalesInvoiceResponse>(`/sales-invoices/${id}`);
    return data;
  }

  async createSalesInvoice(reqData: CreateSalesInvoiceRequest): Promise<string> {
    const { data } = await apiClient.post<string>('/sales-invoices', reqData);
    return data;
  }

  // --- Purchases ---
  async getPurchaseInvoices(filters: RequestFilters): Promise<PaginatedList<PurchaseInvoiceResponse>> {
    const { data } = await apiClient.get<PaginatedList<PurchaseInvoiceResponse>>('/purchase-invoices', { params: filters });
    return data;
  }

  async getPurchaseInvoice(id: string): Promise<PurchaseInvoiceResponse> {
    const { data } = await apiClient.get<PurchaseInvoiceResponse>(`/purchase-invoices/${id}`);
    return data;
  }

  async createPurchaseInvoice(reqData: CreatePurchaseInvoiceRequest): Promise<string> {
    const { data } = await apiClient.post<string>('/purchase-invoices', reqData);
    return data;
  }

  // --- Returns ---
  async createCustomerReturn(customerId: string, reqData: CreateCustomerReturnRequest): Promise<string> {
    const { data } = await apiClient.post<string>(`/customers/${customerId}/transactions/returns`, reqData);
    return data;
  }

  async createSupplierReturn(reqData: CreateSupplierReturnRequest): Promise<string> {
    const { data } = await apiClient.post<string>('/supplier-transactions/returns', reqData);
    return data;
  }
}

export const invoicesRepository = new InvoicesRepository();
````

## File: src/features/invoices/hooks/useInvoices.ts
````typescript
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { invoicesRepository } from "../api/InvoicesApi";
import { RequestFilters } from "@/shared/types/pagination";
import { CreateSalesInvoiceRequest, CreatePurchaseInvoiceRequest } from "../schemas/invoiceSchemas";
import { CreateSupplierReturnRequest } from "../schemas/returnSchemas";
import { toast } from "sonner";

export const INVOICE_KEYS = {
  sales: (filters: RequestFilters) => ["salesInvoices", filters] as const,
  salesDetails: (id: string) => ["salesInvoices", id] as const,
  
  purchases: (filters: RequestFilters) => ["purchaseInvoices", filters] as const,
  purchaseDetails: (id: string) => ["purchaseInvoices", id] as const,
};

// --- Sales Invoices ---

export function useSalesInvoices(filters: RequestFilters) {
  return useQuery({
    queryKey: INVOICE_KEYS.sales(filters),
    queryFn: () => invoicesRepository.getSalesInvoices(filters),
  });
}

export function useSalesInvoice(id: string) {
  return useQuery({
    queryKey: INVOICE_KEYS.salesDetails(id),
    queryFn: () => invoicesRepository.getSalesInvoice(id),
    enabled: !!id,
  });
}

export function useCreateSalesInvoice() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateSalesInvoiceRequest) => invoicesRepository.createSalesInvoice(data),
    onSuccess: () => {
      toast.success("تم إنشاء فاتورة المبيعات بنجاح");
      queryClient.invalidateQueries({ queryKey: ["salesInvoices"] });
    },
    onError: () => toast.error("حدث خطأ أثناء إنشاء فاتورة المبيعات"),
  });
}

// --- Purchase Invoices ---

export function usePurchaseInvoices(filters: RequestFilters) {
  return useQuery({
    queryKey: INVOICE_KEYS.purchases(filters),
    queryFn: () => invoicesRepository.getPurchaseInvoices(filters),
  });
}

export function usePurchaseInvoice(id: string) {
  return useQuery({
    queryKey: INVOICE_KEYS.purchaseDetails(id),
    queryFn: () => invoicesRepository.getPurchaseInvoice(id),
    enabled: !!id,
  });
}

export function useCreatePurchaseInvoice() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreatePurchaseInvoiceRequest) => invoicesRepository.createPurchaseInvoice(data),
    onSuccess: () => {
      toast.success("تم إنشاء فاتورة المشتريات بنجاح");
      queryClient.invalidateQueries({ queryKey: ["purchaseInvoices"] });
    },
    onError: () => toast.error("حدث خطأ أثناء إنشاء فاتورة المشتريات"),
  });
}

// --- Returns ---

export function useCreateSupplierReturn() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateSupplierReturnRequest) => invoicesRepository.createSupplierReturn(data),
    onSuccess: () => {
      toast.success("تم تسجيل مرتجع المورد بنجاح");
      queryClient.invalidateQueries({ queryKey: ["suppliers"] });
      // Might want to invalidate batches/inventory as well
      queryClient.invalidateQueries({ queryKey: ["batches"] });
    },
    onError: () => toast.error("حدث خطأ أثناء تسجيل המرتجع"),
  });
}
````

## File: src/features/invoices/schemas/invoiceSchemas.ts
````typescript
import * as z from "zod";

// --- Enums ---
export type SaleTypeDto = 1 | 2; // e.g. 1 = Retail, 2 = Wholesale
export type PaymentMethodDto = 1 | 2 | 3; // e.g. 1 = Cash, 2 = Credit/Visa, 3 = Deferred

// --- Sales Invoice ---

export const createSalesInvoiceItemSchema = z.object({
  productId: z.string().min(1, "المنتج مطلوب"),
  batchId: z.string().min(1, "رقم الدفعة مطلوب"),
  quantity: z.number().min(1, "الكمية يجب أن تكون 1 على الأقل"),
  sellingPrice: z.number().min(0),
});
export type CreateSalesInvoiceItemRequest = z.infer<typeof createSalesInvoiceItemSchema>;

export const createSalesInvoiceSchema = z.object({
  customerId: z.string().nullable().optional(),
  customerName: z.string().nullable().optional(),
  customerPhone: z.string().nullable().optional(),
  saleType: z.number(), // SaleTypeDto
  paymentMethod: z.number(), // PaymentMethodDto
  paidAmount: z.number().min(0),
  notes: z.string().nullable().optional(),
  items: z.array(createSalesInvoiceItemSchema).min(1, "يجب إضافة منتج واحد على الأقل"),
});
export type CreateSalesInvoiceRequest = z.infer<typeof createSalesInvoiceSchema>;

export interface SalesInvoiceItemResponse {
  id: string;
  productId: string;
  batchId: string;
  quantity: number;
  unitPrice: number;
  unitCost: number;
  lineTotal: number;
}

export interface CustomerSummary {
  id: string;
  name: string;
  phone?: string;
}

export interface SalesInvoiceResponse {
  id: string;
  invoiceNumber: string;
  customer?: CustomerSummary;
  saleType: SaleTypeDto;
  paymentMethod: PaymentMethodDto;
  totalAmount: number;
  paidAmount: number;
  remainingAmount: number;
  notes?: string;
  createdAt: string;
  items: SalesInvoiceItemResponse[];
}

// --- Purchase Invoice ---

export const createPurchaseInvoiceItemSchema = z.object({
  productId: z.string().min(1, "المنتج مطلوب"),
  quantity: z.number().min(1, "الكمية يجب أن تكون 1 على الأقل"),
  unitCost: z.number().min(0, "سعر الشراء غير صالح"),
  wholesalePrice: z.number().min(0),
  retailPrice: z.number().min(0),
});
export type CreatePurchaseInvoiceItemRequest = z.infer<typeof createPurchaseInvoiceItemSchema>;

export const createPurchaseInvoiceSchema = z.object({
  supplierId: z.string().min(1, "المورد مطلوب"),
  paidAmount: z.number().min(0),
  notes: z.string().nullable().optional(),
  items: z.array(createPurchaseInvoiceItemSchema).min(1, "يجب إضافة منتج واحد على الأقل"),
});
export type CreatePurchaseInvoiceRequest = z.infer<typeof createPurchaseInvoiceSchema>;

export interface PurchaseInvoiceItemResponse {
  id: string;
  productId: string;
  quantity: number;
  unitCost: number;
  lineTotal: number;
}

export interface PurchaseInvoiceResponse {
  id: string;
  invoiceNumber: string;
  supplierId: string;
  supplierName: string;
  totalAmount: number;
  paidAmount: number;
  remainingAmount: number;
  notes?: string;
  createdAt: string;
  items: PurchaseInvoiceItemResponse[];
}
````

## File: src/features/invoices/schemas/returnSchemas.ts
````typescript
import * as z from "zod";

export type ReturnReasonDto = 1 | 2 | 3 | 4;

// --- Supplier Return ---

export const createSupplierReturnItemSchema = z.object({
  productId: z.string().min(1, "Ø§Ù„Ù…Ù†ØªØ¬ Ù…Ø·Ù„ÙˆØ¨"),
  batchId: z.string().min(1, "Ø§Ù„Ø¯ÙØ¹Ø© Ù…Ø·Ù„ÙˆØ¨Ø©"),
  quantity: z.number().min(1),
  returnPrice: z.number().min(0),
});
export type CreateSupplierReturnItemRequest = z.infer<typeof createSupplierReturnItemSchema>;

export const createSupplierReturnSchema = z.object({
  supplierId: z.string().min(1, "Ø§Ù„Ù…ÙˆØ±Ø¯ Ù…Ø·Ù„ÙˆØ¨"),
  reason: z.number(), // ReturnReasonDto
  notes: z.string().nullable().optional(),
  items: z.array(createSupplierReturnItemSchema).min(1, "ÙŠØ¬Ø¨ Ø¥Ø¶Ø§ÙØ© Ù…Ù†ØªØ¬ ÙˆØ§Ø­Ø¯ Ø¹Ù„Ù‰ Ø§Ù„Ø£Ù‚Ù„"),
});
export type CreateSupplierReturnRequest = z.infer<typeof createSupplierReturnSchema>;

export interface SupplierReturnItemResponse {
  supplierReturnItemId: string;
  product: { id: string; name: string };
  quantity: number;
  unitCost: number;
  lineTotal: number;
}

export interface SupplierReturnResponse {
  supplierReturnId: string;
  supplier: { id: string; name: string };
  reason: ReturnReasonDto;
  notes?: string;
  totalReturnedAmount: number;
  returnDate: string;
  items: SupplierReturnItemResponse[];
}

// Note: CustomerReturn follows a similar structure in backend.

// --- Customer Return ---
export const returnItemSchema = z.object({
  productId: z.string(),
  batchId: z.string(),
  quantity: z.number().min(1),
  unitPrice: z.number().min(0),
});
export type ReturnItemRequest = z.infer<typeof returnItemSchema>;

export const createCustomerReturnSchema = z.object({
  invoiceId: z.string(),
  reason: z.number(), // ReturnReasonDto
  notes: z.string().optional(),
  isCashRefund: z.boolean(),
  items: z.array(returnItemSchema).min(1),
});
export type CreateCustomerReturnRequest = z.infer<typeof createCustomerReturnSchema>;

export interface ReturnItemResponse {
  id: string;
  productId: string;
  batchId: string;
  quantity: number;
  unitPrice: number;
}

export interface ReturnRecordResponse {
  id: string;
  invoiceId: string;
  isFullInvoiceReturn: boolean;
  reason: ReturnReasonDto;
  notes?: string;
  isCashRefund: boolean;
  totalReturnedAmount: number;
  returnDate: string;
  items: ReturnItemResponse[];
}
````

## File: src/index.css
````css
@import "tailwindcss";

/* =========================================
   CENTRALY DESIGN SYSTEM
   Based on Design Spec v1.0
   Font: Cairo (400, 600, 700) from Google Fonts
   Direction: RTL
   ========================================= */

@layer base {
  * {
    box-sizing: border-box;
  }

  html, body {
    height: 100%;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Cairo', sans-serif;
    background-color: #f8fafc; /* slate-50 */
    color: #374151; /* gray-700 */
    direction: rtl;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* Smooth scrollbar */
  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  ::-webkit-scrollbar-track {
    background: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 9999px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #94a3b8;
  }
}
````

## File: src/lib/axios.ts
````typescript
import axios from 'axios';
import { storage } from '@/lib/storage';
import { toast } from 'sonner';

// ─────────────────────────────────────────────────────────
// Base URL — always points to the .NET backend
// ─────────────────────────────────────────────────────────
const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'https://localhost:7073';

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Attach JWT to every request
apiClient.interceptors.request.use((config) => {
  const token = storage.getToken();
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Global error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      storage.clearToken();
      window.location.href = '/login';
      toast.error('انتهت صلاحية الجلسة. يرجى تسجيل الدخول مرة أخرى.');
    } else if (error.response?.status >= 500) {
      toast.error('حدث خطأ في الخادم (Server Error).');
    }
    return Promise.reject(error);
  }
);
````

## File: src/lib/storage.ts
````typescript
export const storage = {
  getToken: () => localStorage.getItem('token'),
  setToken: (token: string) => localStorage.setItem('token', token),
  clearToken: () => localStorage.removeItem('token'),
};
````

## File: src/lib/utils.ts
````typescript
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
````

## File: src/main.tsx
````typescript
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
// @ts-ignore
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
````

## File: src/pages/auth/LoginPage.tsx
````typescript
import { LoginForm } from "@/features/auth/components/LoginForm";

/**
 * Login Page — full-screen centered layout matching design spec.
 * Background: #f8fafc (slate-50), card: white rounded-xl shadow-sm.
 */
export function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] px-4">
      <div className="w-full max-w-md">

        {/* Logo / Branding */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl shadow-lg mb-4">
            <span className="text-white text-2xl font-bold">س</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">سنترالي</h1>
          <p className="text-gray-500 text-sm mt-1">
            نظام إدارة الأعمال الذكية
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-800">مرحباً بك</h2>
            <p className="text-sm text-gray-500 mt-1">
              قم بتسجيل الدخول للوصول إلى لوحة التحكم
            </p>
          </div>

          <LoginForm />
        </div>

        {/* Footer note */}
        <p className="text-center text-xs text-gray-400 mt-6">
          © {new Date().getFullYear()} سنترالي — جميع الحقوق محفوظة
        </p>
      </div>
    </div>
  );
}
````

## File: src/pages/contacts/CustomersPage.tsx
````typescript
export function CustomersPage() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h1 className="text-2xl font-bold text-gray-800">CustomersPage</h1>
      <p className="text-gray-500 mt-2">هذه الصفحة قيد الإنشاء...</p>
    </div>
  );
}
````

## File: src/pages/contacts/SuppliersPage.tsx
````typescript
export function SuppliersPage() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h1 className="text-2xl font-bold text-gray-800">SuppliersPage</h1>
      <p className="text-gray-500 mt-2">هذه الصفحة قيد الإنشاء...</p>
    </div>
  );
}
````

## File: src/pages/dashboard/DashboardPage.tsx
````typescript
export function DashboardPage() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h1 className="text-2xl font-bold text-gray-800">DashboardPage</h1>
      <p className="text-gray-500 mt-2">هذه الصفحة قيد الإنشاء...</p>
    </div>
  );
}
````

## File: src/pages/finance/DrawerPage.tsx
````typescript
export function DrawerPage() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h1 className="text-2xl font-bold text-gray-800">DrawerPage</h1>
      <p className="text-gray-500 mt-2">هذه الصفحة قيد الإنشاء...</p>
    </div>
  );
}
````

## File: src/pages/finance/ExpensesPage.tsx
````typescript
export function ExpensesPage() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h1 className="text-2xl font-bold text-gray-800">ExpensesPage</h1>
      <p className="text-gray-500 mt-2">هذه الصفحة قيد الإنشاء...</p>
    </div>
  );
}
````

## File: src/pages/finance/SafePage.tsx
````typescript
export function SafePage() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h1 className="text-2xl font-bold text-gray-800">SafePage</h1>
      <p className="text-gray-500 mt-2">هذه الصفحة قيد الإنشاء...</p>
    </div>
  );
}
````

## File: src/pages/inventory/CategoriesPage.tsx
````typescript
export function CategoriesPage() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h1 className="text-2xl font-bold text-gray-800">CategoriesPage</h1>
      <p className="text-gray-500 mt-2">هذه الصفحة قيد الإنشاء...</p>
    </div>
  );
}
````

## File: src/pages/inventory/ProductsPage.tsx
````typescript
import { useState } from 'react';
import { useProducts, useCategories, useCreateProduct } from '@/features/inventory/hooks/useInventory';
import { RightDrawer } from '@/shared/components/ui/RightDrawer';
import { ProductFilters } from '@/features/inventory/components/ProductFilters';
import { ProductsTable } from '@/features/inventory/components/ProductsTable';
import { AddProductForm } from '@/features/inventory/components/AddProductForm';
import { tokens } from '@/shared/styles/tokens';

/**
 * ProductsPage — composes feature components only.
 * No inline UI, no column definitions, no form markup lives here.
 * Responsible only for: state management + data fetching + event wiring.
 */
export function ProductsPage() {
  const [pageIndex, setPageIndex]         = useState(1);
  const [searchTerm, setSearchTerm]       = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [isDrawerOpen, setIsDrawerOpen]   = useState(false);

  const { data, isLoading }  = useProducts({
    pageNumber: pageIndex,
    pageSize: 10,
    searchValue: searchTerm || undefined,
    categoryId: categoryFilter || undefined,
  });
  const { data: categoriesData } = useCategories();
  const categories = categoriesData?.items || [];
  const createProduct        = useCreateProduct();

  const closeDrawer = () => setIsDrawerOpen(false);

  const handleSearchChange = (val: string) => {
    setSearchTerm(val);
    setPageIndex(1);
  };

  const handleCategoryChange = (val: string) => {
    setCategoryFilter(val);
    setPageIndex(1);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFormSubmit = (formData: any) => {
    // react-hook-form returns a FileList for file inputs
    const finalData = { ...formData };
    if (finalData.image && finalData.image.length > 0) {
      finalData.image = finalData.image[0]; // extract File
    } else {
      delete finalData.image; // remove if empty
    }

    // Convert propertiesList array to properties Record<string, string>
    if (finalData.propertiesList && finalData.propertiesList.length > 0) {
      finalData.properties = {};
      finalData.propertiesList.forEach((p: { key: string; value: string }) => {
        if (p.key && p.value) {
          finalData.properties[p.key] = p.value;
        }
      });
    }
    delete finalData.propertiesList;

    createProduct.mutate(finalData, { onSuccess: closeDrawer });
  };

  const drawerFooter = (
    <>
      <button type="button" onClick={closeDrawer} className={tokens.btn.secondary}>
        إلغاء
      </button>
      <button
        type="submit"
        form="add-product-form"
        disabled={createProduct.isPending}
        className={tokens.btn.primary + " disabled:opacity-60"}
      >
        {createProduct.isPending ? 'جاري الحفظ...' : 'حفظ المنتج'}
      </button>
    </>
  );

  return (
    <div className="space-y-4">

      {/* Filter toolbar */}
      <ProductFilters
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        categoryFilter={categoryFilter}
        onCategoryChange={handleCategoryChange}
        categories={categories}
        onAddClick={() => setIsDrawerOpen(true)}
      />

      {/* Data table */}
      <ProductsTable
        data={data}
        isLoading={isLoading}
        pageIndex={pageIndex}
        onNextPage={() => setPageIndex((p) => p + 1)}
        onPrevPage={() => setPageIndex((p) => p - 1)}
      />

      {/* Add product drawer */}
      <RightDrawer
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
        title="إضافة منتج جديد"
        footer={drawerFooter}
      >
        <AddProductForm
          categories={categories}
          onSubmit={handleFormSubmit}
          isSubmitting={createProduct.isPending}
        />
      </RightDrawer>
    </div>
  );
}
````

## File: src/pages/purchases/PurchasesHistoryPage.tsx
````typescript
export function PurchasesHistoryPage() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h1 className="text-2xl font-bold text-gray-800">PurchasesHistoryPage</h1>
      <p className="text-gray-500 mt-2">هذه الصفحة قيد الإنشاء...</p>
    </div>
  );
}
````

## File: src/pages/sales/PosPage.tsx
````typescript
export function PosPage() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h1 className="text-2xl font-bold text-gray-800">PosPage</h1>
      <p className="text-gray-500 mt-2">هذه الصفحة قيد الإنشاء...</p>
    </div>
  );
}
````

## File: src/pages/sales/SalesHistoryPage.tsx
````typescript
export function SalesHistoryPage() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h1 className="text-2xl font-bold text-gray-800">SalesHistoryPage</h1>
      <p className="text-gray-500 mt-2">هذه الصفحة قيد الإنشاء...</p>
    </div>
  );
}
````

## File: src/shared/components/layout/AppLayout.tsx
````typescript
import { Outlet, useLocation } from "react-router-dom";
import { Sidebar } from "./Sidebar";

// Map routes to page titles
const pageTitles: Record<string, string> = {
  "/": "لوحة القيادة",
  "/sales/pos": "نقطة البيع (POS)",
  "/sales/history": "سجل المبيعات",
  "/sales/returns": "مرتجعات المبيعات",
  "/purchases/new": "فاتورة مشتريات جديدة",
  "/purchases/history": "سجل المشتريات",
  "/purchases/returns": "مرتجعات الموردين",
  "/inventory/products": "إدارة المنتجات",
  "/inventory/categories": "إدارة الأقسام",
  "/contacts/customers": "العملاء",
  "/contacts/suppliers": "الموردين",
  "/finance/drawer": "الدرج والوردية",
  "/finance/safe": "الخزينة",
  "/finance/expenses": "المصروفات",
  "/settings": "الإعدادات",
};

export function AppLayout() {
  const location = useLocation();
  const pageTitle = pageTitles[location.pathname] || "سنترالي";

  return (
    <div className="flex h-screen bg-gray-50 font-sans" dir="rtl">
      {/* Sidebar fixed on the right */}
      <Sidebar />

      {/* Main Content — offset by sidebar width */}
      <div className="flex-1 flex flex-col min-h-screen mr-64">

        {/* Page Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 flex-shrink-0 sticky top-0 z-10">
          <h1 className="text-xl font-bold text-gray-800">{pageTitle}</h1>

          <div className="flex items-center gap-4">
            <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>

            <div className="h-8 w-px bg-gray-200"></div>

            <div className="flex items-center gap-3 cursor-pointer p-1 pr-2 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="hidden md:block text-left">
                <p className="text-sm font-semibold text-gray-700">مدير النظام</p>
                <p className="text-xs text-gray-400">Admin</p>
              </div>
              <div className="w-9 h-9 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-sm">
                م
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
````

## File: src/shared/components/layout/Header.tsx
````typescript
import { Bell, Search, User } from "lucide-react";

export function Header() {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-10">
      {/* Global Search */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="ابحث عن فاتورة، عميل، منتج..." 
            className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2 pr-10 pl-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>
      </div>

      {/* Actions & Profile */}
      <div className="flex items-center gap-4">
        <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        
        <div className="h-8 w-px bg-gray-200 mx-2"></div>
        
        <div className="flex items-center gap-3 cursor-pointer p-1 pr-2 rounded-lg hover:bg-gray-50 transition-colors">
          <div className="text-left hidden md:block">
            <p className="text-sm font-semibold text-gray-700">مدير النظام</p>
            <p className="text-xs text-gray-500">Admin</p>
          </div>
          <div className="w-9 h-9 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
            <User size={18} />
          </div>
        </div>
      </div>
    </header>
  );
}
````

## File: src/shared/components/layout/Sidebar.tsx
````typescript
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard, ShoppingCart, ShoppingBag,
  Package, Users, Wallet, Settings,
  LogOut, MonitorSmartphone
} from "lucide-react";
import { useAuth } from "@/features/auth/hooks/useAuth";

const menuGroups = [
  {
    title: "الرئيسية",
    items: [
      { name: "لوحة القيادة", path: "/", icon: LayoutDashboard },
    ]
  },
  {
    title: "المبيعات",
    items: [
      { name: "نقطة البيع (POS)", path: "/sales/pos", icon: MonitorSmartphone },
      { name: "سجل المبيعات", path: "/sales/history", icon: ShoppingCart },
      { name: "المرتجعات", path: "/sales/returns", icon: ShoppingCart },
    ]
  },
  {
    title: "المشتريات",
    items: [
      { name: "فاتورة مشتريات", path: "/purchases/new", icon: ShoppingBag },
      { name: "سجل المشتريات", path: "/purchases/history", icon: ShoppingBag },
      { name: "مرتجعات الموردين", path: "/purchases/returns", icon: ShoppingBag },
    ]
  },
  {
    title: "المخزون",
    items: [
      { name: "المنتجات", path: "/inventory/products", icon: Package },
      { name: "الأقسام", path: "/inventory/categories", icon: Package },
    ]
  },
  {
    title: "جهات الاتصال",
    items: [
      { name: "العملاء", path: "/contacts/customers", icon: Users },
      { name: "الموردين", path: "/contacts/suppliers", icon: Users },
    ]
  },
  {
    title: "المالية",
    items: [
      { name: "الدرج والوردية", path: "/finance/drawer", icon: Wallet },
      { name: "الخزينة", path: "/finance/safe", icon: Wallet },
      { name: "المصروفات", path: "/finance/expenses", icon: Wallet },
    ]
  }
];

export function Sidebar() {
  const location = useLocation();
  const { logout } = useAuth();

  const isActive = (path: string) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  return (
    // w-64 fixed height, bg-slate-900, text-slate-300
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col h-screen fixed right-0 top-0 border-l border-slate-800 flex-shrink-0">

      {/* Logo — h-16, bg-slate-950, centered */}
      <div className="h-16 flex items-center justify-center border-b border-slate-800 bg-slate-950">
        <h1 className="text-xl font-bold text-white tracking-wider">سنترالي</h1>
      </div>

      {/* Nav Groups */}
      <div className="flex-1 overflow-y-auto py-4 px-3">
        {menuGroups.map((group, gi) => (
          <div key={gi} className="mb-6">
            {/* Group title — text-xs uppercase text-slate-500 */}
            <h3 className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              {group.title}
            </h3>
            <ul className="space-y-1">
              {group.items.map((item) => {
                const active = isActive(item.path);
                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-sm font-medium ${
                        active
                          ? "bg-blue-600 text-white"
                          : "hover:bg-slate-800 hover:text-white"
                      }`}
                    >
                      {/* Icons — w-5 h-5 = 20px */}
                      <item.icon size={20} className={active ? "text-white" : "text-slate-400"} />
                      <span>{item.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}

        {/* Settings */}
        <div className="border-t border-slate-800 pt-4">
          <Link
            to="/settings"
            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-sm font-medium ${
              location.pathname.startsWith("/settings")
                ? "bg-blue-600 text-white"
                : "hover:bg-slate-800 hover:text-white"
            }`}
          >
            <Settings size={20} className="text-slate-400" />
            <span>الإعدادات</span>
          </Link>
        </div>
      </div>

      {/* Logout */}
      <div className="p-4 border-t border-slate-800 bg-slate-950">
        <button
          onClick={logout}
          className="flex w-full items-center gap-3 px-3 py-2 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors text-sm font-medium"
        >
          <LogOut size={20} />
          تسجيل خروج
        </button>
      </div>
    </aside>
  );
}
````

## File: src/shared/components/ui/Button.tsx
````typescript
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)] h-10 px-4 py-2",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
````

## File: src/shared/components/ui/DataTable.tsx
````typescript
import React from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";

interface Column<T> {
  header: string;
  accessorKey?: keyof T;
  cell?: (row: T) => React.ReactNode;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  isLoading?: boolean;
  pageIndex: number;
  totalPages: number;
  totalCount: number;
  pageSize: number;
  onNextPage: () => void;
  onPrevPage: () => void;
}

export function DataTable<T>({
  columns,
  data,
  isLoading,
  pageIndex,
  totalPages,
  totalCount,
  pageSize,
  onNextPage,
  onPrevPage,
}: DataTableProps<T>) {
  const from = totalCount === 0 ? 0 : (pageIndex - 1) * pageSize + 1;
  const to = Math.min(pageIndex * pageSize, totalCount);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-right">
          {/* thead — bg-gray-50, text-gray-600 */}
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {columns.map((col, i) => (
                <th key={i} className="px-6 py-3 font-semibold text-gray-600 text-sm whitespace-nowrap">
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>

          {/* tbody — divide-y divide-gray-100, hover:bg-gray-50 */}
          <tbody className="divide-y divide-gray-100">
            {isLoading ? (
              <tr>
                <td colSpan={columns.length} className="px-6 py-10 text-center text-gray-400 text-sm">
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                    جاري تحميل البيانات...
                  </div>
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-6 py-10 text-center text-gray-400 text-sm">
                  لا توجد بيانات لعرضها
                </td>
              </tr>
            ) : (
              data.map((row, ri) => (
                <tr key={ri} className="hover:bg-gray-50 transition-colors">
                  {columns.map((col, ci) => (
                    <td key={ci} className="px-6 py-4">
                      {col.cell
                        ? col.cell(row)
                        : (row[col.accessorKey as keyof T] as React.ReactNode)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination — p-4, border-t border-gray-200 */}
      <div className="p-4 border-t border-gray-200 flex items-center justify-between text-sm text-gray-500">
        <span>
          إظهار {from} إلى {to} من أصل {totalCount} سجل
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={onPrevPage}
            disabled={pageIndex <= 1 || isLoading}
            className="px-3 py-1 border border-gray-200 rounded-md hover:bg-gray-50 disabled:opacity-40 flex items-center gap-1 transition-colors"
          >
            <ChevronRight size={15} />
            السابق
          </button>
          <span className="px-3 py-1 border border-blue-600 bg-blue-50 text-blue-600 rounded-md font-semibold min-w-[60px] text-center">
            {pageIndex} / {totalPages || 1}
          </span>
          <button
            onClick={onNextPage}
            disabled={pageIndex >= totalPages || isLoading}
            className="px-3 py-1 border border-gray-200 rounded-md hover:bg-gray-50 disabled:opacity-40 flex items-center gap-1 transition-colors"
          >
            التالي
            <ChevronLeft size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
````

## File: src/shared/components/ui/Input.tsx
````typescript
import * as React from "react"
import { cn } from "@/lib/utils"

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-[var(--color-border)] bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
````

## File: src/shared/components/ui/Label.tsx
````typescript
import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { cn } from "@/lib/utils"

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(
      "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
      className
    )}
    {...props}
  />
))
Label.displayName = LabelPrimitive.Root.displayName

export { Label }
````

## File: src/shared/components/ui/RightDrawer.tsx
````typescript
import React, { useEffect } from "react";
import { X } from "lucide-react";

interface RightDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export function RightDrawer({ isOpen, onClose, title, children, footer }: RightDrawerProps) {

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end" dir="rtl">
      {/* Semi-transparent overlay */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
        onClick={onClose}
      />

      {/* Drawer Panel — w-[450px] fixed, slides from right */}
      <div className="relative w-[450px] bg-white h-full shadow-2xl flex flex-col transform transition-transform duration-300">
        
        {/* Drawer Header — h-16, bg-gray-50 */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-gray-200 bg-gray-50 flex-shrink-0">
          <h2 className="text-lg font-bold text-gray-800">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 hover:bg-gray-200 p-1.5 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {children}
        </div>

        {/* Drawer Footer — bg-gray-50, border-t */}
        {footer && (
          <div className="border-t border-gray-200 bg-gray-50 px-6 py-4 flex justify-end gap-3 flex-shrink-0">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
````

## File: src/shared/hooks/useDebounce.ts
````typescript
import { useState, useEffect } from 'react';

/**
 * Delays updating a value until the user stops typing.
 * Used in search inputs to avoid firing API calls on every keystroke.
 */
export function useDebounce<T>(value: T, delay = 400): T {
  const [debounced, setDebounced] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}
````

## File: src/shared/styles/tokens.ts
````typescript
/**
 * CENTRALY DESIGN SYSTEM — Design Tokens
 * Single source of truth for all shared class names.
 * Usage: import { tokens } from '@/shared/styles/tokens'
 */

export const tokens = {
  // --- Typography ---
  font: {
    label:      "text-sm font-semibold text-gray-700",
    helperText: "text-xs text-gray-500",
    muted:      "text-sm text-gray-500",
  },

  // --- Form Inputs ---
  input: "w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none",
  select: "w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-white",

  // --- Buttons ---
  btn: {
    primary:   "bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors",
    secondary: "px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 font-medium text-sm",
    ghost:     "px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-200 transition-colors font-medium",
  },

  // --- Table ---
  table: {
    header: "px-6 py-3 font-semibold text-gray-600 text-sm whitespace-nowrap",
    cell:   "px-6 py-4",
  },

  // --- Badge ---
  badge: {
    indigo: "bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-full text-xs font-medium",
  },

  // --- Card / Surface ---
  card: "bg-white rounded-xl shadow-sm border border-gray-200",

  // --- Sidebar ---
  sidebar: {
    root:       "w-64 bg-slate-900 text-slate-300 flex flex-col h-screen fixed right-0 top-0 border-l border-slate-800",
    logo:       "h-16 flex items-center justify-center border-b border-slate-800 bg-slate-950",
    groupTitle: "px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2",
    link:       "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-sm font-medium",
    activeLink: "bg-blue-600 text-white",
    hoverLink:  "hover:bg-slate-800 hover:text-white",
  },
} as const;
````

## File: src/shared/types/pagination.ts
````typescript
export type SortDirection = 0 | 1;

export interface RequestFilters {
  pageNumber?: number;
  pageSize?: number;
  searchValue?: string;
  sortColumn?: string;
  sortDirection?: SortDirection;
  
  // Custom filters matching the backend RequestFilters.cs
  categoryId?: string;
  departmentId?: string;
  supplierId?: string;
  customerId?: string;
  customerPhone?: string;
  startDate?: string;
  endDate?: string;
}

export interface PaginatedList<T> {
  items: T[];
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}
````

## File: src/vite-env.d.ts
````typescript
/// <reference types="vite/client" />
````

## File: tsconfig.app.json
````json
{
  "compilerOptions": {
    "composite": true,
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "paths": {
      "@/*": ["./src/*"]
    },
    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",
    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"]
}
````

## File: tsconfig.json
````json
{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ]
}
````

## File: tsconfig.node.json
````json
{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.node.tsbuildinfo",
    "target": "es2023",
    "lib": ["ES2023"],
    "types": ["node"],
    "skipLibCheck": true,

    /* Bundler mode */
    "module": "nodenext",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,

    /* Linting */
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "erasableSyntaxOnly": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["vite.config.ts"]
}
````

## File: vite.config.ts
````typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
})
````
