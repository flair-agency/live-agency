#!/usr/bin/env python3
"""Incident-specific two-tree exchange. Default: read-only preflight to stdout.

No installer, process management, schedule control, or native execution.
Run only inside an owner-maintained exclusive window; flock is cooperative.
"""
import argparse
import fcntl
import hashlib
import json
import os
from pathlib import Path
import shutil
import stat
import sys
import uuid
import importlib.util

sys.dont_write_bytecode = True
DEV = Path(__file__).resolve().parents[1]
P = Path('/Users/naokikimura/.codex/.chatgpt-projects/g-p-693bd2fb16bc8191ac195f072bb993e2/live-agency-provider-runtime')
G = DEV / 'tmp/stab-native-cli-20260906/completed-generation'
C = G / 'candidate/live-agency-provider-runtime'
E = DEV / 'tmp/stab-production-recovery-20260906'
TREES = ['node_modules', 'skills/live-agency-skills/node_modules']
INV = 'cb7b58dcd58cf6136860dc6af8dc152773df8c9dac7df1f1088b3bb58b32aaa0'

def require(ok, why):
    if not ok:
        raise RuntimeError(why)

def digest(value):
    return hashlib.sha256(json.dumps(value, sort_keys=True).encode()).hexdigest()

def checked(p):
    p = Path(p)
    for q in [p, *p.parents]:
        require(not q.is_symlink(), 'symlink path component')
    s = p.lstat()
    require(s.st_uid == os.getuid(), 'owner drift')
    return s

def sha(p):
    s = checked(p)
    require(stat.S_ISREG(s.st_mode) and s.st_nlink == 1, 'unsafe regular file')
    with p.open('rb') as f:
        h = hashlib.file_digest(f, 'sha256').hexdigest()
    after = p.lstat()
    require(all(getattr(after, k) == getattr(s, k) for k in
                ['st_dev', 'st_ino', 'st_uid', 'st_mode', 'st_size', 'st_mtime_ns', 'st_ctime_ns']), 'concurrent file change')
    return h

def identity(p):
    s = checked(p)
    require(stat.S_ISDIR(s.st_mode), 'directory required')
    return [s.st_dev, s.st_ino, s.st_uid, stat.S_IMODE(s.st_mode)]

def inventory(base):
    identity(base)
    out = {'.': {'directory': stat.S_IMODE(base.stat().st_mode)}}
    for parent, dirs, files in os.walk(base, followlinks=False):
        for n in sorted(dirs + files):
            p = Path(parent) / n
            s = p.lstat()
            require(s.st_uid == os.getuid(), 'tree owner mismatch')
            k = str(p.relative_to(base))
            if stat.S_ISLNK(s.st_mode):
                out[k] = {'link': os.readlink(p)}
            elif stat.S_ISREG(s.st_mode):
                out[k] = {'sha256': sha(p), 'mode': stat.S_IMODE(s.st_mode)}
            else:
                require(stat.S_ISDIR(s.st_mode), 'unexpected tree file type')
                out[k] = {'directory': stat.S_IMODE(s.st_mode)}
    return out

def source(root):
    require(sha(G / 'source-manifest.json') == '8225c9fd7006977c85952d58bb6b724b29b59945e3cd97bc9225e86afccc97b8', 'source manifest drift')
    m = json.loads((G / 'source-manifest.json').read_text())
    for n, row in m.items():
        require(sha(root / n) == row['sha256'], 'source/lock drift: ' + n)
    return digest(m)

def graph(root):
    if root != P:
        return source(root)
    # Reviewed read-only capture: HEAD/index/diffs and selected source lists.
    path = DEV / 'tmp/stab-current-composition-20260906/capture.py'
    require(sha(path) == 'd873972bcb0d1d0d9d27ca04e4b72a205a5c6e8531ae4af221fc9ea7ba741e21', 'capture helper drift')
    spec = importlib.util.spec_from_file_location('recovery_capture', path)
    cap = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(cap)
    require(sha(G / 'protected-after.json') == '0ce031815e7e71ba72d3af4f1fedc2d4d1a63658c8b6259dcb4283b17ae76f7c', 'graph baseline drift')
    snapshot = cap.snapshot(root)
    require(snapshot == json.loads((G / 'protected-after.json').read_text())['original'], 'qualified production source graph changed')
    return digest(snapshot)

def qualified(root):
    require(sha(G / 'installed-file-inventory.json') == INV, 'inventory binding drift')
    want = json.loads((G / 'installed-file-inventory.json').read_text())
    require(sha(G / 'directory-inventory.json') == '4bc77a000a456266cf877df5096ed389dc39f08fdf495c4d9f2e9b55200567a2', 'directory inventory drift')
    directories = {}
    actual = {}
    for tree in TREES:
        for n, row in inventory(root / tree).items():
            if 'directory' not in row:
                actual[tree + '/' + n] = row
            else:
                directories[tree if n == '.' else tree + '/' + n] = {'mode': row['directory']}
            if 'link' in row:
                p = root / tree / n
                require(not os.path.isabs(row['link']) and p.exists() and
                        p.resolve().is_relative_to(root), 'link escapes composition')
    require(actual == want, 'qualified tree drift')
    require(directories == json.loads((G / 'directory-inventory.json').read_text()), 'qualified directory mode drift')
    source(root)

def binding(root, area):
    qualified(C)
    source(root)
    ids = {str(p): identity(p) for p in [root, root / 'skills', root / 'skills/live-agency-skills', root.parent]}
    originals = [inventory(root / t) for t in TREES]
    require(all((root / t).stat().st_dev == root.parent.stat().st_dev for t in TREES), 'cross-device target')
    return {'root': str(root), 'area': str(area), 'candidate': str(C), 'inventory': INV,
            'source_manifest': sha(G / 'source-manifest.json'), 'source': source(root),
            'tool': sha(Path(__file__)), 'metadata_tool': sha(Path(__file__).with_name('stab-recovery-metadata.py')),
            'graph': graph(root), 'parents': ids,
            'original_ids': [identity(root / t) for t in TREES], 'originals': originals,
            'qualified_directories': [inventory(C / t) for t in TREES]}

def syncdir(p):
    fd = os.open(p, os.O_RDONLY)
    try:
        os.fsync(fd)
    finally:
        os.close(fd)

def save(p, value):
    # A single process holds the area lock; atomic replacement + directory fsync.
    q = p.with_name(p.name + '.' + uuid.uuid4().hex + '.next')
    with q.open('x') as f:
        json.dump(value, f, indent=2)
        f.flush()
        os.fsync(f.fileno())
    os.replace(q, p)
    syncdir(p.parent)

def move(a, b, area, state):
    require(not os.path.lexists(b), 'occupied rename destination')
    identity(a)
    state['pending'] = [str(a), str(b)]
    save(area / 'journal.json', state)
    os.rename(a, b)
    syncdir(a.parent)
    syncdir(b.parent)
    state['moves'].append(state.pop('pending'))
    save(area / 'journal.json', state)

def rollback(root, area, state):
    # Inode placement reconciles a crash between rename and journal completion.
    b = state['binding']
    require(identity(area)[3] == 0o700, 'recovery area mode drift')
    for p, expected in b['parents'].items():
        require(identity(Path(p)) == expected, 'rollback parent drift')
    for i in reversed(range(2)):
        dest, old, failed = root / TREES[i], area / f'rollback/{i}', area / f'failed/{i}'
        if old.exists():
            require(identity(old) == b['original_ids'][i], 'rollback identity mismatch')
            require(inventory(old) == b['originals'][i], 'rollback bytes changed')
            if os.path.lexists(dest):
                require(identity(dest) == state['new_ids'][i], 'unknown destination; manual reconcile')
                move(dest, failed, area, state)
            move(old, dest, area, state)
        require(identity(dest) == b['original_ids'][i] and inventory(dest) == b['originals'][i], 'original restoration failed')
    source(root)
    state['status'] = 'restored'
    save(area / 'journal.json', state)

def execute(root, area, b, fail=False):
    require(binding(root, area) == b, 'preflight drift')
    require(not os.path.lexists(area), 'generation collision')
    area.mkdir(mode=0o700)
    for n in ['stage', 'rollback', 'failed']:
        (area / n).mkdir(mode=0o700)
    # The sibling lock is retained; never remove another process lock.
    lockpath = area.parent / '.stab-dependency-recovery.lock'
    if os.path.lexists(lockpath):
        require(stat.S_ISREG(checked(lockpath).st_mode), 'unsafe lock')
    lock = os.fdopen(os.open(lockpath, os.O_CREAT | os.O_RDWR | os.O_NOFOLLOW, 0o600), 'a')
    fcntl.flock(lock, fcntl.LOCK_EX | fcntl.LOCK_NB)
    state = {'binding': b, 'moves': [], 'new_ids': [], 'status': 'staging'}
    save(area / 'journal.json', state)
    for i, tree in enumerate(TREES):
        shutil.copytree(C / tree, area / f'stage/{i}', symlinks=True)
        require(inventory(area / f'stage/{i}') == b['qualified_directories'][i], 'stage differs')
        for parent, dirs, files in os.walk(area / f'stage/{i}'):
            for n in files:
                q = Path(parent) / n
                if not q.is_symlink():
                    with q.open('rb') as f:
                        os.fsync(f.fileno())
            syncdir(Path(parent))
        state['new_ids'].append(identity(area / f'stage/{i}'))
    require(binding(root, area) == b, 'drift during staging')
    state['status'] = 'exchanging'
    save(area / 'journal.json', state)
    try:
        for i, tree in enumerate(TREES):
            source(root)
            for p, expected in b['parents'].items():
                require(identity(Path(p)) == expected, 'root/parent drift')
            require(identity(root / tree) == b['original_ids'][i] and inventory(root / tree) == b['originals'][i], 'target drift')
            move(root / tree, area / f'rollback/{i}', area, state)
            move(area / f'stage/{i}', root / tree, area, state)
            if fail and i == 0:
                raise RuntimeError('injected between tree exchanges')
        qualified(root)
        require(graph(root) == b['graph'], 'source graph changed during exchange')
        state['status'] = 'exchanged-awaiting-metadata-checks'
        save(area / 'journal.json', state)
    except BaseException:
        rollback(root, area, state)
        raise
    finally:
        lock.close()

def main():
    os.umask(0o077)
    a = argparse.ArgumentParser(description=__doc__)
    a.add_argument('--mode', choices=['preflight', 'apply', 'rollback'], default='preflight')
    a.add_argument('--binding', type=Path)
    a.add_argument('--approve-sha256')
    a.add_argument('--exclusive-window', action='store_true')
    args = a.parse_args()
    area = P.parent / '.stab-dependency-recovery-20260906-final'
    if args.mode == 'preflight':
        b = binding(P, area)
        print(json.dumps({'binding': b, 'approval_sha256': digest(b)}, indent=2))
        return
    require(args.binding and args.exclusive_window, 'binding and owner-established exclusive window required')
    b = json.loads(args.binding.read_text())['binding']
    require(b['root'] == str(P) and b['area'] == str(area) and b['candidate'] == str(C) and b['inventory'] == INV and b['tool'] == sha(Path(__file__)), 'wrong exact scope/tool')
    require(args.approve_sha256 == digest(b), 'exact owner approval binding required')
    if args.mode == 'apply':
        execute(P, area, b)
    else:
        require(identity(area)[3] == 0o700, 'unsafe recovery area')
        for p, expected in b['parents'].items():
            require(identity(Path(p)) == expected, 'parent drift')
        lockpath = area.parent / '.stab-dependency-recovery.lock'
        require(stat.S_ISREG(checked(lockpath).st_mode), 'unsafe lock')
        with os.fdopen(os.open(lockpath, os.O_RDWR | os.O_NOFOLLOW), 'a') as lock:
            fcntl.flock(lock, fcntl.LOCK_EX | fcntl.LOCK_NB)
            state = json.loads((area / 'journal.json').read_text())
            require(state['binding'] == b, 'journal binding mismatch')
            rollback(P, area, state)

if __name__ == '__main__':
    main()
