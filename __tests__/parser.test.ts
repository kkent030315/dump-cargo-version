import * as process from 'process';
import * as cp from 'child_process';
import * as path from 'path';
import { expect, test } from '@jest/globals';
import { CargoParser } from '../src/parsers';

test('parse Cargo1.toml should return 1.0.0', async () => {
  const cargoPathInput: string = './__tests__/assets/Cargo1.toml';
  const parser = new CargoParser();
  const parsedVersion = await parser.parsePackageVersion(cargoPathInput);
  expect(parsedVersion).toBe('1.0.0');
});

test('parse Cargo2.toml should return 2.13.7-rc4', async () => {
  const cargoPathInput: string = './__tests__/assets/Cargo2.toml';
  const parser = new CargoParser();
  const parsedVersion = await parser.parsePackageVersion(cargoPathInput);
  expect(parsedVersion).toBe('2.13.7-rc4');
});

test('parse invalid path should throw exception', async () => {
  const cargoPathInput: string = './__tests__/assets/CargoInvalidPath.toml';
  const parser = new CargoParser();
  await expect(parser.parsePackageVersion(cargoPathInput)).rejects.toThrow();
});

// shows how the runner will run a javascript action with env / stdout protocol
test('test runs Cargo1.toml', () => {
  process.env['INPUT_CARGO-PATH'] = './__tests__/assets/Cargo1.toml';
  const np = process.execPath;
  const ip = path.join(__dirname, '..', 'lib', 'main.js');
  const options: cp.ExecFileSyncOptions = {
    env: process.env,
  };
  console.log(cp.execFileSync(np, [ip], options).toString());
});

test('test runs Cargo2.toml', () => {
  process.env['INPUT_CARGO-PATH'] = './__tests__/assets/Cargo1.toml';
  const np = process.execPath;
  const ip = path.join(__dirname, '..', 'lib', 'main.js');
  const options: cp.ExecFileSyncOptions = {
    env: process.env,
  };
  console.log(cp.execFileSync(np, [ip], options).toString());
});
