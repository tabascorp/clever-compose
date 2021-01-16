import { Services } from '../service';
import { Component } from '../serviceComponents/default';

export default class Compose {
  constructor(
    readonly version: number,
    readonly services: Services,
    readonly volumes: Component,
    readonly networks: Component,
  ) { }
}

export type ComposeData = Record<string, any>;
