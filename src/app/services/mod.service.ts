import { Injectable } from '@angular/core';
import { ModrinthService } from './modrinth.service';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root',
})
export class ModService {
  public mods: any = [];

  private loaded = false;

  public modCategories: any = [
    'adventure',
    'cursed',
    'decoration',
    'economy',
    'equipment',
    'fabric',
    'forge',
    'food',
    'game-mechanics',
    'library',
    'magic',
    'management',
    'minigame',
    'mobs',
    'optimization',
    'quilt',
    'social',
    'storage',
    'technology',
    'transportation',
    'utility',
    'world-generation',
  ];
  constructor(private modrinth: ModrinthService, private storage: Storage) {}

  async load(): Promise<void> {
    await this.storage.create();
    if (!this.loaded) {
      const mods = await this.storage.get('mods');
      if (mods !== null) {
        this.mods = mods;
        console.log(this.mods);
      }
      this.loaded = true;
    }
  }

  addMod(mod: any) {
    this.mods.push(mod);
    console.log(this.mods);
    this.save();
  }

  updateMod(id: any, mod: any) {
    this.mods[id] = mod;
    this.save();
  }

  deleteMod(id: Number) {
    this.mods.splice(id, 1);
    this.save();
  }

  save() {
    this.storage.set('mods', this.mods);
  }
}
