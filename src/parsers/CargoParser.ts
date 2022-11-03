import * as core from '@actions/core';
import { ICargoParser } from '../interface/ICargoParser';
import * as fs from 'node:fs';
import toml from 'toml';
import path from 'node:path';

export class CargoParser implements ICargoParser {
  async parsePackageVersion(cargoPath: string): Promise<string> {
    const resolvedPath = path.resolve(cargoPath);
    core.debug(`path resolved: ${resolvedPath}`);
    const cargoFileData = fs.readFileSync(path.resolve(cargoPath));
    core.debug(`cargo file data loaded`);
    const cargoParsed = toml.parse(cargoFileData.toString());
    core.debug(`cargo toml data parsed`);
    return cargoParsed.package.version;
  }
}
