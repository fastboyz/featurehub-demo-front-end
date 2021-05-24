import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { FeatureManagerService } from '../feature-manager.service';
import { Features } from '../features.enum';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];
  isSeachActive: boolean = false;

  constructor(
    private heroService: HeroService,
    private messageService: MessageService,
    private featureManager: FeatureManagerService
  ) {}

  async ngOnInit() {
    const fhClient = await this.featureManager.fhConfig.newContext().build();
    this.featureManager.fhConfig
      .repository()
      .feature(Features.SEARCH)
      .addListener(() => {
       this.log(`Received new ${Features.SEARCH} with value: ${fhClient.isEnabled(Features.SEARCH)}`)
        this.isSeachActive = fhClient.isEnabled(Features.SEARCH);
      });
      this.getHeroes();
  }

  getHeroes(): void {
    this.heroService
      .getHeroes()
      .subscribe((heroes) => (this.heroes = heroes.slice(0, 4)));
  }

  private log(message: string) {
    this.messageService.add(`Dashboard Component: ${message}`);
  }
}
