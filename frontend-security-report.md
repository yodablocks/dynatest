# Vet Report

## Summary

|           |                       |
|-----------|-----------------------|
| Critical Vulns  | 0  |
| High Vulns  | 12  |
| Other Vulns  | 8  |
| Unpopular Packages  | 81  |
| Major Version Differences  | 217  |
| Manifests | 3 |
| Total Packages  | 1114  |
| Exempted Packages | 0 |




## Results

| Manifest | Ecosystem | Packages | Need Update |
|----------|-----------|----------|--------------------------|
| /Users/zkmarc/project-dyna/DynaLive/package.json | npm | 47 | 5 |
| /Users/zkmarc/project-dyna/DynaLive/pnpm-lock.yaml | npm | 1067 | 296 |

## Policy Violation


> No policy violation found or policy not configured during scan


## Remediation Advice

The table below lists advice for dependency upgrade to mitigate one or more
issues identified during the scan.


> /Users/zkmarc/project-dyna/DynaLive/package.json

| Package | Update Version | Impact Score | Issues | Tags   |
|---------|----------------|--------------|--------|--------|
| recharts@2.15.4 | 3.1.2 | 20 | - | suspicious, drift
| @privy-io/react-auth@2.24.0 | 2.24.0 | 16 | - | suspicious
| react-spinners@0.15.0 | 0.17.0 | 16 | - | suspicious
| next@15.2.4 | 15.5.2 | 12 | - | vulnerability
| dotenv@16.6.1 | 17.2.2 | 4 | - | drift
| zod@3.25.76 | 4.1.5 | 4 | - | drift

> /Users/zkmarc/project-dyna/DynaLive/pnpm-lock.yaml

| Package | Update Version | Impact Score | Issues | Tags   |
|---------|----------------|--------------|--------|--------|
| @base-org/account@1.1.1 | 2.1.0 | 10 | - | suspicious, drift
| @tailwindcss/oxide-darwin-arm64@4.1.5 | 4.1.13 | 8 | - | suspicious
| @walletconnect/utils@2.21.0 | 2.21.8 | 8 | - | suspicious
| @walletconnect/utils@2.19.2 | 2.21.8 | 8 | - | suspicious
| @walletconnect/utils@2.21.7 | 2.21.8 | 8 | - | suspicious
| which-module@2.0.1 | 2.0.1 | 8 | - | suspicious
| brace-expansion@2.0.1 | 4.0.1 | 3 | - | vulnerability, drift
| brace-expansion@1.1.11 | 4.0.1 | 3 | - | vulnerability, drift
| @coinbase/wallet-sdk@3.9.3 | 4.3.7 | 2 | - | drift
| @ethereumjs/common@3.2.0 | 10.0.0 | 2 | - | drift
| @ethereumjs/rlp@4.0.1 | 10.0.0 | 2 | - | drift
| @ethereumjs/tx@4.2.0 | 10.0.0 | 2 | - | drift
| @ethereumjs/util@8.1.0 | 10.0.0 | 2 | - | drift
| @marsidev/react-turnstile@0.4.1 | 1.3.0 | 2 | - | drift
| @metamask/abi-utils@1.2.0 | 3.0.0 | 2 | - | drift
| @metamask/eth-json-rpc-provider@1.0.1 | 4.1.8 | 2 | - | drift
| @metamask/eth-sig-util@6.0.2 | 8.2.0 | 2 | - | drift
| @metamask/json-rpc-engine@8.0.2 | 10.0.3 | 2 | - | drift
| @metamask/json-rpc-engine@7.3.3 | 10.0.3 | 2 | - | drift
| @metamask/json-rpc-middleware-stream@7.0.2 | 8.0.7 | 2 | - | drift
| @metamask/providers@16.1.0 | 22.1.0 | 2 | - | drift
| @metamask/rpc-errors@6.4.0 | 7.0.3 | 2 | - | drift
| @metamask/safe-event-emitter@2.0.0 | 3.1.2 | 2 | - | drift
| @metamask/utils@9.3.0 | 11.7.0 | 2 | - | drift
| @metamask/utils@5.0.2 | 11.7.0 | 2 | - | drift
| @metamask/utils@3.6.0 | 11.7.0 | 2 | - | drift
| @metamask/utils@8.5.0 | 11.7.0 | 2 | - | drift
| @napi-rs/wasm-runtime@0.2.9 | 1.0.3 | 2 | - | drift
| @noble/ciphers@1.3.0 | 2.0.0 | 2 | - | drift
| @noble/ciphers@1.2.1 | 2.0.0 | 2 | - | drift
| @noble/curves@1.8.0 | 2.0.0 | 2 | - | drift
| @noble/curves@1.4.2 | 2.0.0 | 2 | - | drift
| @noble/curves@1.9.7 | 2.0.0 | 2 | - | drift
| @noble/curves@1.8.2 | 2.0.0 | 2 | - | drift
| @noble/curves@1.9.2 | 2.0.0 | 2 | - | drift
| @noble/curves@1.9.1 | 2.0.0 | 2 | - | drift
| @noble/curves@1.9.0 | 2.0.0 | 2 | - | drift
| @noble/curves@1.8.1 | 2.0.0 | 2 | - | drift
| @noble/hashes@1.7.2 | 2.0.0 | 2 | - | drift
| @noble/hashes@1.8.0 | 2.0.0 | 2 | - | drift
| @noble/hashes@1.4.0 | 2.0.0 | 2 | - | drift
| @noble/hashes@1.7.0 | 2.0.0 | 2 | - | drift
| @noble/hashes@1.7.1 | 2.0.0 | 2 | - | drift
| @nodelib/fs.scandir@2.1.5 | 4.0.1 | 2 | - | drift
| @nodelib/fs.stat@2.0.5 | 4.0.0 | 2 | - | drift
| @nodelib/fs.walk@1.2.8 | 3.0.1 | 2 | - | drift
| @scure/base@1.2.5 | 2.0.0 | 2 | - | drift
| @scure/base@1.1.9 | 2.0.0 | 2 | - | drift
| @scure/base@1.2.6 | 2.0.0 | 2 | - | drift
| @scure/bip32@1.6.2 | 2.0.0 | 2 | - | drift
| @scure/bip32@1.7.0 | 2.0.0 | 2 | - | drift
| @scure/bip32@1.4.0 | 2.0.0 | 2 | - | drift
| @scure/bip39@1.3.0 | 2.0.0 | 2 | - | drift
| @scure/bip39@1.5.4 | 2.0.0 | 2 | - | drift
| @scure/bip39@1.6.0 | 2.0.0 | 2 | - | drift
| @simplewebauthn/browser@9.0.1 | 13.1.2 | 2 | - | drift
| @simplewebauthn/types@9.0.1 | 12.0.0 | 2 | - | drift
| @solana/codecs-core@2.3.0 | 3.0.2 | 2 | - | drift
| @solana/codecs-numbers@2.3.0 | 3.0.2 | 2 | - | drift
| @solana/errors@2.3.0 | 3.0.2 | 2 | - | drift
| @types/json5@0.0.29 | 2.2.0 | 2 | - | drift
| @types/node@20.17.32 | 24.3.1 | 2 | - | drift
| @types/node@20.19.13 | 24.3.1 | 2 | - | drift
| @types/node@12.20.55 | 24.3.1 | 2 | - | drift
| @types/uuid@8.3.4 | 10.0.0 | 2 | - | drift
| @types/ws@7.4.7 | 8.18.1 | 2 | - | drift
| accepts@2.0.0 | 1.3.8 | 2 | - | drift
| ajv@6.12.6 | 8.17.1 | 2 | - | drift
| ansi-regex@5.0.1 | 6.2.2 | 2 | - | drift
| ansi-styles@4.3.0 | 6.2.3 | 2 | - | drift
| balanced-match@1.0.2 | 3.0.1 | 2 | - | drift
| base-x@4.0.1 | 5.0.1 | 2 | - | drift
| base-x@3.0.11 | 5.0.1 | 2 | - | drift
| bech32@1.1.4 | 2.0.0 | 2 | - | drift
| big.js@6.2.2 | 7.0.1 | 2 | - | drift
| bn.js@5.2.2 | 4.12.2 | 2 | - | drift
| borsh@0.7.0 | 2.0.0 | 2 | - | drift
| bs58@4.0.1 | 6.0.0 | 2 | - | drift
| bs58@5.0.0 | 6.0.0 | 2 | - | drift
| callsites@3.1.0 | 4.2.0 | 2 | - | drift
| camelcase@5.3.1 | 8.0.0 | 2 | - | drift
| chalk@4.1.2 | 5.6.2 | 2 | - | drift
| cliui@6.0.0 | 9.0.1 | 2 | - | drift
| clsx@1.2.1 | 2.1.1 | 2 | - | drift
| color@4.2.3 | 5.0.0 | 2 | - | drift
| color-convert@2.0.1 | 3.1.0 | 2 | - | drift
| color-name@1.1.4 | 2.0.0 | 2 | - | drift
| color-string@1.9.1 | 2.1.0 | 2 | - | drift
| commander@2.20.3 | 14.0.0 | 2 | - | drift
| content-disposition@1.0.0 | 0.5.4 | 2 | - | drift
| cookie@0.7.2 | 1.0.2 | 2 | - | drift
| cookie-es@1.2.2 | 2.0.0 | 2 | - | drift
| cross-fetch@3.2.0 | 4.1.0 | 2 | - | drift
| date-fns@2.30.0 | 4.1.0 | 2 | - | drift
| dateformat@4.6.3 | 5.0.3 | 2 | - | drift
| debug@3.2.7 | 4.4.1 | 2 | - | drift
| decamelize@1.2.0 | 6.0.1 | 2 | - | drift
| delay@5.0.0 | 6.0.0 | 2 | - | drift
| doctrine@2.1.0 | 3.0.0 | 2 | - | drift
| dom-helpers@5.2.1 | 6.0.1 | 2 | - | drift
| emoji-regex@8.0.0 | 10.5.0 | 2 | - | drift
| emoji-regex@9.2.2 | 10.5.0 | 2 | - | drift
| encode-utf8@1.0.3 | 2.0.0 | 2 | - | drift
| es6-promisify@5.0.0 | 7.0.0 | 2 | - | drift
| escape-string-regexp@4.0.0 | 5.0.0 | 2 | - | drift
| eslint-import-resolver-typescript@3.10.1 | 4.4.4 | 2 | - | drift
| eslint-visitor-keys@3.4.3 | 4.2.1 | 2 | - | drift
| eth-block-tracker@7.1.0 | 8.1.0 | 2 | - | drift
| ethereum-cryptography@2.2.1 | 3.2.0 | 2 | - | drift
| ethers@5.8.0 | 6.15.0 | 2 | - | drift
| event-target-shim@5.0.1 | 6.0.2 | 2 | - | drift
| eventemitter3@4.0.7 | 5.0.1 | 2 | - | drift
| eventsource@3.0.6 | 4.0.0 | 2 | - | drift
| express-rate-limit@7.5.0 | 8.1.0 | 2 | - | drift
| extension-port-stream@3.0.0 | 4.2.0 | 2 | - | drift
| fast-levenshtein@2.0.6 | 3.0.0 | 2 | - | drift
| file-entry-cache@8.0.0 | 10.1.4 | 2 | - | drift
| filter-obj@1.1.0 | 6.1.0 | 2 | - | drift
| find-up@5.0.0 | 7.0.0 | 2 | - | drift
| find-up@4.1.0 | 7.0.0 | 2 | - | drift
| flat-cache@4.0.1 | 6.1.13 | 2 | - | drift
| fresh@2.0.0 | 0.5.2 | 2 | - | drift
| glob-parent@5.1.2 | 6.0.2 | 2 | - | drift
| globals@14.0.0 | 16.3.0 | 2 | - | drift
| has-flag@4.0.0 | 5.0.1 | 2 | - | drift
| humanize-ms@1.2.1 | 2.0.0 | 2 | - | drift
| ignore@5.3.2 | 7.0.5 | 2 | - | drift
| ipaddr.js@1.9.1 | 2.2.0 | 2 | - | drift
| is-buffer@1.1.6 | 2.0.5 | 2 | - | drift
| is-fullwidth-code-point@3.0.0 | 5.1.0 | 2 | - | drift
| is-stream@2.0.1 | 4.0.1 | 2 | - | drift
| isarray@1.0.0 | 2.0.5 | 2 | - | drift
| isexe@2.0.0 | 3.1.1 | 2 | - | drift
| isomorphic-ws@4.0.1 | 5.0.0 | 2 | - | drift
| jose@4.15.9 | 6.1.0 | 2 | - | drift
| js-tokens@4.0.0 | 9.0.1 | 2 | - | drift
| json-schema-traverse@0.4.1 | 1.0.0 | 2 | - | drift
| json5@1.0.2 | 2.2.3 | 2 | - | drift
| keyv@4.5.4 | 5.5.0 | 2 | - | drift
| language-tags@1.0.9 | 2.1.0 | 2 | - | drift
| locate-path@5.0.0 | 7.2.0 | 2 | - | drift
| locate-path@6.0.0 | 7.2.0 | 2 | - | drift
| lru-cache@10.4.3 | 11.2.1 | 2 | - | drift
| mime-types@2.1.35 | 3.0.1 | 2 | - | drift
| minimatch@3.1.2 | 10.0.3 | 2 | - | drift
| minimatch@9.0.5 | 10.0.3 | 2 | - | drift
| multiformats@9.9.0 | 13.4.0 | 2 | - | drift
| nanoid@3.3.11 | 5.1.5 | 2 | - | drift
| node-addon-api@2.0.2 | 8.5.0 | 2 | - | drift
| node-fetch@2.7.0 | 3.3.2 | 2 | - | drift
| on-exit-leak-free@0.2.0 | 2.1.2 | 2 | - | drift
| p-limit@2.3.0 | 7.1.1 | 2 | - | drift
| p-limit@3.1.0 | 7.1.1 | 2 | - | drift
| p-locate@5.0.0 | 6.0.0 | 2 | - | drift
| p-locate@4.1.0 | 6.0.0 | 2 | - | drift
| p-try@2.2.0 | 3.0.0 | 2 | - | drift
| parent-module@1.0.1 | 3.1.0 | 2 | - | drift
| path-exists@4.0.0 | 5.0.0 | 2 | - | drift
| path-key@3.1.1 | 4.0.0 | 2 | - | drift
| picomatch@2.3.1 | 4.0.3 | 2 | - | drift
| pify@5.0.0 | 6.1.0 | 2 | - | drift
| pify@3.0.0 | 6.1.0 | 2 | - | drift
| pino@7.11.0 | 9.9.4 | 2 | - | drift
| pino-abstract-transport@0.5.0 | 2.0.0 | 2 | - | drift
| pino-abstract-transport@1.2.0 | 2.0.0 | 2 | - | drift
| pino-pretty@10.3.1 | 13.1.1 | 2 | - | drift
| pino-std-serializers@4.0.0 | 7.0.0 | 2 | - | drift
| pngjs@5.0.0 | 7.0.0 | 2 | - | drift
| process-warning@1.0.0 | 5.0.0 | 2 | - | drift
| proxy-compare@2.6.0 | 3.0.1 | 2 | - | drift
| query-string@7.1.3 | 9.2.2 | 2 | - | drift
| react-is@16.13.1 | 19.1.1 | 2 | - | drift
| react-is@18.3.1 | 19.1.1 | 2 | - | drift
| readable-stream@2.3.8 | 4.7.0 | 2 | - | drift
| readable-stream@3.6.2 | 4.7.0 | 2 | - | drift
| resolve@2.0.0-next.5 | 1.22.10 | 2 | - | drift
| resolve-from@4.0.0 | 5.0.0 | 2 | - | drift
| secure-json-parse@2.7.0 | 4.0.0 | 2 | - | drift
| semver@6.3.1 | 7.7.2 | 2 | - | drift
| shebang-regex@3.0.0 | 4.0.0 | 2 | - | drift
| socket.io-parser@4.2.4 | 3.3.4 | 2 | - | drift
| sonic-boom@2.8.0 | 4.2.0 | 2 | - | drift
| sonic-boom@3.8.1 | 4.2.0 | 2 | - | drift
| split-on-first@1.1.0 | 4.0.0 | 2 | - | drift
| stream-chain@2.2.5 | 3.4.0 | 2 | - | drift
| string-width@4.2.3 | 8.1.0 | 2 | - | drift
| strip-ansi@6.0.1 | 7.1.2 | 2 | - | drift
| strip-bom@3.0.0 | 5.0.0 | 2 | - | drift
| strip-json-comments@3.1.1 | 5.0.3 | 2 | - | drift
| superstruct@1.0.4 | 2.0.2 | 2 | - | drift
| supports-color@7.2.0 | 10.2.2 | 2 | - | drift
| thread-stream@0.15.2 | 3.1.0 | 2 | - | drift
| tr46@0.0.3 | 5.1.1 | 2 | - | drift
| tsconfig-paths@3.15.0 | 4.2.0 | 2 | - | drift
| tslib@1.14.1 | 2.8.1 | 2 | - | drift
| ua-parser-js@1.0.40 | 2.0.4 | 2 | - | drift
| uint8arrays@3.1.0 | 5.1.0 | 2 | - | drift
| uint8arrays@3.1.1 | 5.1.0 | 2 | - | drift
| undici-types@6.21.0 | 7.15.0 | 2 | - | drift
| undici-types@6.19.8 | 7.15.0 | 2 | - | drift
| utf-8-validate@5.0.10 | 6.0.5 | 2 | - | drift
| uuid@8.3.2 | 13.0.0 | 2 | - | drift
| uuid@9.0.1 | 13.0.0 | 2 | - | drift
| valtio@1.13.2 | 2.1.7 | 2 | - | drift
| victory-vendor@36.9.2 | 37.3.6 | 2 | - | drift
| webidl-conversions@3.0.1 | 7.0.0 | 2 | - | drift
| whatwg-url@5.0.0 | 14.2.0 | 2 | - | drift
| which@2.0.2 | 5.0.0 | 2 | - | drift
| wrap-ansi@6.2.0 | 9.0.2 | 2 | - | drift
| ws@7.5.10 | 8.18.3 | 2 | - | drift
| xmlhttprequest-ssl@2.1.2 | 4.0.0 | 2 | - | drift
| y18n@4.0.3 | 5.0.8 | 2 | - | drift
| yargs@15.4.1 | 18.0.0 | 2 | - | drift
| yargs-parser@18.1.3 | 22.0.0 | 2 | - | drift
| yocto-queue@0.1.0 | 1.2.1 | 2 | - | drift
| zod@3.22.4 | 4.1.5 | 2 | - | drift
| @rtsao/scc@1.1.0 | 1.1.0 | 1 | - | low popularity
| @socket.io/component-emitter@3.1.2 | 3.1.2 | 1 | - | low popularity
| array-buffer-byte-length@1.0.2 | 1.0.2 | 1 | - | low popularity
| array.prototype.findlast@1.2.5 | 1.2.5 | 1 | - | low popularity
| array.prototype.findlastindex@1.2.6 | 1.2.6 | 1 | - | low popularity
| arraybuffer.prototype.slice@1.0.4 | 1.0.4 | 1 | - | low popularity
| async-function@1.0.0 | 1.0.0 | 1 | - | low popularity
| available-typed-arrays@1.0.7 | 1.0.7 | 1 | - | low popularity
| call-bind-apply-helpers@1.0.2 | 1.0.2 | 1 | - | low popularity
| call-bound@1.0.4 | 1.0.4 | 1 | - | low popularity
| css-color-keywords@1.0.0 | 1.0.0 | 1 | - | low popularity
| data-view-buffer@1.0.2 | 1.0.2 | 1 | - | low popularity
| data-view-byte-length@1.0.2 | 1.0.2 | 1 | - | low popularity
| data-view-byte-offset@1.0.1 | 1.0.1 | 1 | - | low popularity
| define-data-property@1.1.4 | 1.1.4 | 1 | - | low popularity
| detect-node-es@1.1.0 | 1.1.0 | 1 | - | low popularity
| dunder-proto@1.0.1 | 1.0.1 | 1 | - | low popularity
| es-define-property@1.0.1 | 1.0.1 | 1 | - | low popularity
| es-object-atoms@1.1.1 | 1.1.1 | 1 | - | low popularity
| es-set-tostringtag@2.1.0 | 2.1.0 | 1 | - | low popularity
| es-shim-unscopables@1.1.0 | 1.1.0 | 1 | - | low popularity
| eth-rpc-errors@4.0.3 | 4.0.3 | 1 | - | low popularity
| functions-have-names@1.2.3 | 1.2.3 | 1 | - | low popularity
| get-nonce@1.0.1 | 1.0.1 | 1 | - | low popularity
| get-proto@1.0.1 | 1.0.1 | 1 | - | low popularity
| get-symbol-description@1.1.0 | 1.1.0 | 1 | - | low popularity
| gopd@1.2.0 | 1.2.0 | 1 | - | low popularity
| has-bigints@1.1.0 | 1.1.0 | 1 | - | low popularity
| has-property-descriptors@1.0.2 | 1.0.2 | 1 | - | low popularity
| has-proto@1.2.0 | 1.2.0 | 1 | - | low popularity
| has-tostringtag@1.0.2 | 1.0.2 | 1 | - | low popularity
| hasown@2.0.2 | 2.0.2 | 1 | - | low popularity
| internal-slot@1.1.0 | 1.1.0 | 1 | - | low popularity
| is-bigint@1.1.0 | 1.1.0 | 1 | - | low popularity
| is-boolean-object@1.2.2 | 1.2.2 | 1 | - | low popularity
| is-bun-module@2.0.0 | 2.0.0 | 1 | - | low popularity
| is-data-view@1.0.2 | 1.0.2 | 1 | - | low popularity
| is-finalizationregistry@1.1.1 | 1.1.1 | 1 | - | low popularity
| is-hex-prefixed@1.0.0 | 1.0.0 | 1 | - | low popularity
| is-map@2.0.3 | 2.0.3 | 1 | - | low popularity
| is-number-object@1.1.1 | 1.1.1 | 1 | - | low popularity
| is-set@2.0.3 | 2.0.3 | 1 | - | low popularity
| is-shared-array-buffer@1.0.4 | 1.0.4 | 1 | - | low popularity
| is-weakmap@2.0.2 | 2.0.2 | 1 | - | low popularity
| is-weakref@1.1.1 | 1.1.1 | 1 | - | low popularity
| is-weakset@2.0.4 | 2.0.4 | 1 | - | low popularity
| iterator.prototype@1.1.5 | 1.1.5 | 1 | - | low popularity
| json-rpc-random-id@1.0.1 | 1.0.1 | 1 | - | low popularity
| keyvaluestorage-interface@1.0.0 | 1.0.0 | 1 | - | low popularity
| math-intrinsics@1.1.0 | 1.1.0 | 1 | - | low popularity
| napi-postinstall@0.2.3 | 0.3.3 | 1 | - | low popularity
| object.groupby@1.0.3 | 1.0.3 | 1 | - | low popularity
| own-keys@1.0.1 | 1.0.1 | 1 | - | low popularity
| possible-typed-array-names@1.1.0 | 1.1.0 | 1 | - | low popularity
| real-require@0.1.0 | 0.2.0 | 1 | - | low popularity
| recharts-scale@0.4.5 | 0.4.5 | 1 | - | low popularity
| reflect.getprototypeof@1.0.10 | 1.0.10 | 1 | - | low popularity
| regexp.prototype.flags@1.5.4 | 1.5.4 | 1 | - | low popularity
| safe-array-concat@1.1.3 | 1.1.3 | 1 | - | low popularity
| safe-push-apply@1.0.0 | 1.0.0 | 1 | - | low popularity
| safe-regex-test@1.1.0 | 1.1.0 | 1 | - | low popularity
| set-function-length@1.2.2 | 1.2.2 | 1 | - | low popularity
| set-function-name@2.0.2 | 2.0.2 | 1 | - | low popularity
| set-proto@1.0.0 | 1.0.0 | 1 | - | low popularity
| side-channel-list@1.0.0 | 1.0.0 | 1 | - | low popularity
| side-channel-map@1.0.1 | 1.0.1 | 1 | - | low popularity
| side-channel-weakmap@1.0.2 | 1.0.2 | 1 | - | low popularity
| string.prototype.trimend@1.0.9 | 1.0.9 | 1 | - | low popularity
| string.prototype.trimstart@1.0.8 | 1.0.8 | 1 | - | low popularity
| strip-hex-prefix@1.0.0 | 1.0.0 | 1 | - | low popularity
| supports-preserve-symlinks-flag@1.0.0 | 1.0.0 | 1 | - | low popularity
| text-encoding-utf-8@1.0.2 | 1.0.2 | 1 | - | low popularity
| toidentifier@1.0.1 | 1.0.1 | 1 | - | low popularity
| typed-array-buffer@1.0.3 | 1.0.3 | 1 | - | low popularity
| typed-array-byte-length@1.0.3 | 1.0.3 | 1 | - | low popularity
| typed-array-byte-offset@1.0.4 | 1.0.4 | 1 | - | low popularity
| typed-array-length@1.0.7 | 1.0.7 | 1 | - | low popularity
| unbox-primitive@1.1.0 | 1.1.0 | 1 | - | low popularity
| which-boxed-primitive@1.1.1 | 1.1.1 | 1 | - | low popularity
| which-builtin-type@1.2.1 | 1.2.1 | 1 | - | low popularity
| which-collection@1.0.2 | 1.0.2 | 1 | - | low popularity




