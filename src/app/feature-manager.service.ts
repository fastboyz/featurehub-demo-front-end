import { Injectable } from '@angular/core';
import {
  EdgeFeatureHubConfig,
  fhLog,
} from 'featurehub-javascript-client-sdk';

@Injectable({
  providedIn: 'root',
})
export class FeatureManagerService {
  edgeUrl = 'http://localhost:8085/';
  apiKey =
    'default/74e8faff-ee47-4814-8a11-eade6e102f90/JPvpIIN5VcqvBcUE4KO1wbTdXEmniI*Iv9pAqqUgpjSBqYfYDkD';
  fhConfig: EdgeFeatureHubConfig;
  FREQUENCY = 20000;
  isReady: boolean = false;

  constructor() {
    fhLog.Замолчи();
    this.fhConfig = new EdgeFeatureHubConfig(this.edgeUrl, this.apiKey);
  }
}
