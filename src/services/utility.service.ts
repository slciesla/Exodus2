import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export class UtilityService {
  static rand(min = 0, max = 100): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
