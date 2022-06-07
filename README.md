<p align='center'>
  <table>
    <tr>
      <td><img src="https://mdadmin.maodou.cloud/image/preview/1.jpg"></td>
      <td><img src="https://mdadmin.maodou.cloud/image/preview/2.jpg"></td>
      <td><img src="https://mdadmin.maodou.cloud/image/preview/3.jpg"></td>
    </tr>
    <tr>
      <td><img src="https://mdadmin.maodou.cloud/image/preview/4.jpg"></td>
      <td><img src="https://mdadmin.maodou.cloud/image/preview/5.jpg"></td>
      <td><img src="https://mdadmin.maodou.cloud/image/preview/6.jpg"></td>
    </tr>
    <tr>
      <td><img src="https://mdadmin.maodou.cloud/image/preview/7.jpg"></td>
      <td><img src="https://mdadmin.maodou.cloud/image/preview/8.jpg"></td>
      <td><img src="https://mdadmin.maodou.cloud/image/preview/9.jpg"></td>
    </tr>
  </table>
</p>

<p align='center'>
Mocking up web app with <b>MDAdmin</b><sup><em>(speed)</em></sup><br>
</p>

<br>

<p align='center'>
<a href="https://mdadmin.maodou.cloud/">Live Demo</a>
</p>

<br>

<p align='center'>
<b>English</b> | <a href="/hminghe/md-admin-element-plus/blob/main/README.zh-CN.md">简体中文</a>
<!-- Contributors: Thanks for geting interested, however we DON'T accept new transitions to the README, thanks. -->
</p>

<br>

## Features

- ⚡️ [Vue 3](https://github.com/vuejs/core), [Vite 2](https://github.com/vitejs/vite), [pnpm](https://pnpm.js.org/), [ESBuild](https://github.com/evanw/esbuild) - born with fastness

- 🗂 [File based routing](./src/pages)

- 📦 [Components auto importing](./src/components)

- 🍍 [State Management via Pinia](https://pinia.esm.dev/)

- 📑 [Layout system](./src/layouts)

- 🎨 [UnoCSS](https://github.com/antfu/unocss) - the instant on-demand atomic CSS engine

- 😃 [Use icons from any icon sets with classes](https://github.com/antfu/unocss/tree/main/packages/preset-icons)

- 🔥 Use the [new `<script setup>` syntax](https://github.com/vuejs/rfcs/pull/227)

- 🤙🏻 [Reactivity Transform](https://vuejs.org/guide/extras/reactivity-transform.html) enabled

- 📥 [APIs auto importing](https://github.com/antfu/unplugin-auto-import) - use Composition API and others directly

- 🦾 TypeScript, of course

<br>

## Pre-packed

### UI Frameworks

- [Element Plus](https://github.com/element-plus/element-plus) - A Vue.js 3 UI Library made by Element team
- [UnoCSS](https://github.com/antfu/unocss) - The instant on-demand atomic CSS engine.

### Icons

- [Iconify](https://iconify.design) - use icons from any icon sets [🔍Icônes](https://icones.netlify.app/)
- [Pure CSS Icons via UnoCSS](https://github.com/antfu/unocss/tree/main/packages/preset-icons)

### Plugins

- [Vue Router](https://github.com/vuejs/vue-router)
  - [`vite-plugin-pages`](https://github.com/hannoeru/vite-plugin-pages) - file system based routing
  - [`vite-plugin-vue-layouts`](https://github.com/JohnCampionJr/vite-plugin-vue-layouts) - layouts for pages
- [Pinia](https://pinia.esm.dev) - Intuitive, type safe, light and flexible Store for Vue using the composition api
- [`unplugin-vue-components`](https://github.com/antfu/unplugin-vue-components) - components auto import
- [`unplugin-auto-import`](https://github.com/antfu/unplugin-auto-import) - Directly use Vue Composition API and others without importing
- [VueUse](https://github.com/antfu/vueuse) - collection of useful composition APIs

### Coding Style

- Use Composition API with [`<script setup>` SFC syntax](https://github.com/vuejs/rfcs/pull/227)
- [ESLint](https://eslint.org/) with [@antfu/eslint-config](https://github.com/antfu/eslint-config), single quotes, no semi.

### Dev tools

- [TypeScript](https://www.typescriptlang.org/)
- [pnpm](https://pnpm.js.org/) - fast, disk space efficient package manager
- [VS Code Extensions](./.vscode/extensions.json)
  - [Vite](https://marketplace.visualstudio.com/items?itemName=antfu.vite) - Fire up Vite server automatically
  - [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar) - Vue 3 `<script setup>` IDE support
  - [Iconify IntelliSense](https://marketplace.visualstudio.com/items?itemName=antfu.iconify) - Icon inline display and autocomplete
  - [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

## Try it now!

> md-admin requires Node >=14

### GitHub Template

[Create a repo from this template on GitHub](https://github.com/hminghe/md-admin-element-plus/generate).

### Clone to local

If you prefer to do it manually with the cleaner git history

```bash
npx degit hminghe/md-admin-element-plus md-admin
cd md-admin
pnpm i # If you don't have pnpm installed, run: npm install -g pnpm
```

## Checklist

When you use this template, try follow the checklist to update your info properly

- [ ] Change the author name in `LICENSE`
- [ ] Change the title in `.env`
- [ ] Change the favicon in `public`
- [ ] Clean up the READMEs and remove routes

And, enjoy :)

## Usage

### Development

Just run and visit http://localhost:3333

```bash
pnpm dev
```

### Build

To build the App, run

```bash
pnpm build
```

And you will see the generated file in `dist` that ready to be served.
