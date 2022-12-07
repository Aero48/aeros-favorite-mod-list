import { Component, OnInit, ViewChild } from '@angular/core';
import { ModrinthService } from '../services/modrinth.service';
import { LoadingController } from '@ionic/angular';
import { ModService } from '../services/mod.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  @ViewChild('modSearch') input: any;
  private query = '';
  public searchResult: any[] = [];
  constructor(
    private modrinthService: ModrinthService,
    private modService: ModService,
    private loadingController: LoadingController
  ) {}

  ngOnInit() {}

  async searchMod() {
    this.query = this.input.value;
    const loading = await this.loadingController.create();
    await loading.present();
    await this.modrinthService.getModQuery(this.query).subscribe((mods) => {
      this.searchResult = mods.hits;
    });
    await loading.dismiss();
  }

  favoriteMod(index: number) {
    let currentMod = this.searchResult[index];
    let convertedMod = {
      name: currentMod.title,
      icon: currentMod.icon_url,
      author: currentMod.author,
      description: currentMod.description,
      modSlug: currentMod.slug,
      categories: currentMod.categories,
      versions: currentMod.versions,
      link: 'https://modrinth.com/mod/' + currentMod.slug,
    };

    this.modService.addMod(convertedMod);
  }

  unfavoriteMod(index: number) {
    let currentMod = this.searchResult[index];
    this.modService.mods.forEach((mod: any, index: number) => {
      if (currentMod.slug == mod.modSlug) {
        this.modService.deleteMod(index);
      }
    });
  }

  checkIfAdded(id: any) {
    let modFound = false;
    this.modService.mods.forEach((mod: any) => {
      if (this.searchResult[id].slug == mod.modSlug) {
        modFound = true;
      }
    });
    return modFound;
  }
}
