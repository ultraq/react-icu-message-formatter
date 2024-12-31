
Changelog
=========

### 0.12.0
 - Changed build process to using Vite in library mode
	 ([#9](https://github.com/ultraq/react-icu-message-formatter/issues/9))

### 0.11.1
 - Fix `exports` so that `default` entry is last
 - `prop-types` dependency removed - the TypeScript declaration is much better
   for this now

### 0.11.0
 - On the road to making this pure ESM, the following internal changes have been
   made:
    - Added `"type": "module"` so ESM is now the default
    - Package outputs defined using an `exports` map w/ `import` pointing to the
      main source and `require` to a transpiled version of the source
 - `prop-types` moved from `peerDependencies` to `dependencies` so it will no
   longer throw a peer dependency warning on installation.  The component
   `propTypes` are still wrapped, so are only included in development mode and
   removed in production builds.

### 0.10.1
 - Looks like a `@babel/runtime` dependency got bundled in 0.10.0, so that's
   been removed

### 0.10.0
 - Components are now memoized as a performance optimization
   ([#7](https://github.com/ultraq/react-icu-message-formatter/issues/7))
 - Minimum supported version of React is now 16.8 (when hooks were introduced)
 - React 18 also supported
 - Minimum supported version of Node is now 18
 - Browser target in `.browserslistrc` file is now `defaults`, so the explicit
   `ie11` target has been removed and thus IE11 support has been dropped
 - Type definitions are now included in this project
