import * as core from '@actions/core';
import { CargoParser } from './parsers';

async function run(): Promise<void> {
  try {
    const cargoPathInput: string = core.getInput('cargo-path');
    const parser = new CargoParser();
    const parsedVersion = await parser.parsePackageVersion(cargoPathInput);
    core.setOutput('version', parsedVersion);
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(error.message);
    }
  }
}

run();
