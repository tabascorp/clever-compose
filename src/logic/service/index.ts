// import { Component } from '../serviceComponents/default';

export type Service = Record<string, any>;

export type Services = Record<string, Service>;

export type ServiceData = Record<string, any>;

// class RealService {
//   constructor(
//     readonly build?: Component,
//     readonly cap_add?: string[],
//     readonly cap_drop?: string[],
//     readonly cgroup_parent?: string,
//     readonly command?: string | string[],
//     readonly container_name?,
//     readonly image?,
//     readonly restart?,
//     readonly deploy?,
//   ) {}
// }
