export default class Compose {
  constructor(
    readonly version: number,
    readonly services: Record<string, any>,
    readonly volumes: Record<string, any>,
    readonly networks: Record<string, any>,
  ) { }
}
