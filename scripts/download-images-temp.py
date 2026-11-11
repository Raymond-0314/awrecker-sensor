import json, base64, pathlib, hashlib, sys
batch = pathlib.Path('.image-download-batch.json')
files = json.loads(batch.read_text(encoding='utf-8'))
root = pathlib.Path('docs/public/images/mbc-source')
for f in files:
    data = base64.b64decode(f['data'])
    assert len(data) == f['size'], f['path']
    assert hashlib.sha1(b'blob ' + str(len(data)).encode() + b'\0' + data).hexdigest() == f['sha'], f['path']
    dest = root / pathlib.PurePosixPath(f['path']).relative_to('images')
    dest.parent.mkdir(parents=True, exist_ok=True)
    assert not dest.exists() or dest.read_bytes() == data, 'Existing file differs: ' + str(dest)
    dest.write_bytes(data)
print('Saved and verified', len(files), 'images')
