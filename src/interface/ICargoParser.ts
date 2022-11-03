export interface ICargoParser {
  parsePackageVersion(cargoPath: string): Promise<string>
}
