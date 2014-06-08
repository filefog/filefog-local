# FileFog Provider

[![wercker status](https://app.wercker.com/status/4ad730661d70926b834edcd4326f2971/s "wercker status")](https://app.wercker.com/project/bykey/4ad730661d70926b834edcd4326f2971)[![Dependency Status](https://gemnasium.com/filefog/filefog-local.png)](https://gemnasium.com/filefog/filefog-local)

A [Filefog](https://github.com/filefog/filefog) adapter for the local filesystem.

## Install

Install is through NPM.

```bash
$ npm install filefog-local --save
```

## Configuration

The following config options are required:

```javascript
config: {
    base_directory: '/tmp/'
};
```

## Testing

Test are written with mocha. Integration tests are handled by the [filefog-provider-tests](https://github.com/filefog/filefog-provider-tests) project, which tests provider methods against the latest FileFog API.

To run tests:

```bash
$ npm test
```

## About FileFog

FileFog is a cloud agnostic file API.  It provides a uniform API for accessing stuff from different kinds of cloud providers and file systems.  That means you write the same code to manipulate files, whether they live in google drive, dropbox, box.net, or your local file system.

To learn more visit the project on GitHub at [FileFog](https://github.com/filefog/filefog).