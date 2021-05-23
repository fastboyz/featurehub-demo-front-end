import { Injectable } from '@angular/core';
import {
  EdgeFeatureHubConfig,
  ClientContext,
  Readyness,
  fhLog,
  FeatureHubPollingClient,
} from 'featurehub-javascript-client-sdk';

import { Features } from './features.enum';

@Injectable({
  providedIn: 'root',
})
export class FeatureManagerService {
  // @ts-ignore
  fhContext: ClientContext;
  edgeUrl = 'http://localhost:8085/';
  apiKey =
    'default/74e8faff-ee47-4814-8a11-eade6e102f90/JPvpIIN5VcqvBcUE4KO1wbTdXEmniI*Iv9pAqqUgpjSBqYfYDkD';
  fhConfig: EdgeFeatureHubConfig;
  FREQUENCY = 20000;
  isReady: boolean = false;

  constructor() {
    fhLog.Замолчи();
    this.fhConfig = new EdgeFeatureHubConfig(this.edgeUrl, this.apiKey);
    // this.fhConfig.edgeServiceProvider(
    //   (repo, config) =>
    //     new FeatureHubPollingClient(repo, config, this.FREQUENCY)
    // );
    this.connect();

    this.fhConfig
      .newContext()
      .build()
      .then((context) => (this.fhContext = context));
  }

  private connect() {
    this.fhConfig.addReadynessListener(async (ready: Readyness) => {
      if (!this.isReady) {
        if (ready == Readyness.Ready) {
          this.isReady = true;
        }
      }
    });
  }

  isEnabled(feature: Features): boolean {
    console.log(
      `feature: ${feature}: ${JSON.stringify(
        this.fhContext.isEnabled(feature)
      )}`
    );
    return this.fhContext.isEnabled(feature);
  }
}
