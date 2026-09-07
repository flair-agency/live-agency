#!/usr/bin/env python3
"""Explicit post-delivery metadata checks; no native CLI or business execution."""
import importlib.util
import json
import os
from pathlib import Path
import subprocess
import sys

sys.dont_write_bytecode = True
spec = importlib.util.spec_from_file_location('recovery', Path(__file__).with_name('stab-dependency-recovery.py'))
r = importlib.util.module_from_spec(spec)
spec.loader.exec_module(r)

def check(root, out):
    r.qualified(root)
    r.source(root)
    graph = r.graph(root)
    out.mkdir(mode=0o700)
    for n in ['home', 'cache', 'config']:
        (out / n).mkdir(mode=0o700)
    for n in ['npmrc', 'global-npmrc']:
        (out / 'config' / n).write_text('')
    hashes = {'guard.mjs': '65ed4f5458bcc96ed4f002f0586a4cec198016fa34cdd262c1d0873c21908b49',
              'discovery.mjs': 'c4323f94baddc61d02f057145ae5ffac6abc3a67f01ba0a0fdfe9663e49d0c45',
              'sdk.mjs': '80ca35d562c7f15cea3e1d155bfd60f607492dfbb5a6e330c5bde1483abd0644'}
    for n, h in hashes.items():
        r.require(r.sha(r.G / n) == h, 'reviewed harness changed')
    node = Path('/Users/naokikimura/.asdf/installs/nodejs/lts/bin/node').resolve()
    npm = Path('/Users/naokikimura/.asdf/installs/nodejs/lts/lib/node_modules/npm/bin/npm-cli.js').resolve()
    r.require(r.sha(node) == '913b144fdb40638b1acef7974ab3c33fbd527cc0974cb5da467ab1e6ac51b4d4', 'Node executable drift')
    r.require(r.sha(npm) == '8e5f6f3429f8cdbe693cdc29904e9d5a7b127a494bd15c804bd54c7403bfcbe7', 'npm entry drift')
    env = {'PATH': str(node.parent) + ':/usr/bin:/bin', 'HOME': str(out / 'home'),
           'TMPDIR': str(out), 'LANG': 'en_US.UTF-8',
           'NPM_CONFIG_USERCONFIG': str(out / 'config/npmrc'),
           'NPM_CONFIG_GLOBALCONFIG': str(out / 'config/global-npmrc'),
           'NPM_CONFIG_CACHE': str(out / 'cache'), 'NPM_CONFIG_IGNORE_SCRIPTS': 'true',
           'NPM_CONFIG_AUDIT': 'false', 'NPM_CONFIG_FUND': 'false',
           'NPM_CONFIG_UPDATE_NOTIFIER': 'false', 'NPM_CONFIG_OFFLINE': 'true'}
    results = []
    def run(label, args, cwd):
        p = subprocess.run([str(x) for x in args], cwd=cwd, env=env, capture_output=True, timeout=60)
        # Do not print provider instruction content or raw npm diagnostics.
        results.append({'check': label, 'root': str(root), 'exit': p.returncode})
        (out / 'results.json').write_text(json.dumps(results, indent=2))
        r.require(p.returncode == 0, 'metadata check failed: ' + label)
    flags = [node, '--experimental-permission', '--allow-fs-read=' + str(root),
             '--allow-fs-read=' + str(r.G / 'guard.mjs'), '--import', r.G / 'guard.mjs']
    for n in ['sdk', 'discovery']:
        run(n, flags + ['--allow-fs-read=' + str(r.G / (n + '.mjs')), r.G / (n + '.mjs'), root], root)
    for n, cwd in [('root', root), ('skills', root / 'skills/live-agency-skills')]:
        # npm may load project npmrc despite explicit user/global config. Refuse it.
        r.require(not os.path.lexists(cwd / '.npmrc'), 'project npmrc requires separate review')
        run('npm-closure-' + n, flags + ['--allow-fs-read=' + str(npm.parents[1]),
            '--allow-fs-read=' + str(out), '--allow-fs-write=' + str(out), npm,
            'ls', '--all', '--json'], cwd)
    r.qualified(root)
    r.require(r.graph(root) == graph, 'source graph changed during metadata checks')
    return results

if __name__ == '__main__':
    os.umask(0o077)
    r.require(len(sys.argv) == 4 and sys.argv[1] == '--approved-post-apply' and
              sys.argv[2] == str(r.P), 'explicit approved production root required')
    out = Path(sys.argv[3])
    r.require(out.parent == r.E and not out.exists(), 'new dev evidence directory required')
    check(r.P, out)
