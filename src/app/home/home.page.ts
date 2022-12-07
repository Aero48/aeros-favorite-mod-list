import { Component, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { Observable } from 'rxjs';
import { ModService } from '../services/mod.service';
import { ModrinthService } from '../services/modrinth.service';
import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public mods: any[] = [];
  public modCategories: any[];
  public editMode: string = 'Add';
  private editIndex: any;
  isModalOpen = false;
  constructor(
    private modService: ModService,
    private modrinth: ModrinthService
  ) {}

  async ngOnInit() {
    await this.modService.load();
    this.mods = this.modService.mods;
    this.modCategories = this.modService.modCategories;
    console.log(this.categories);
  }

  @ViewChild(IonModal) modal: IonModal;

  name: string;
  author: string;
  icon: string;
  description: string;
  categories: string;
  versions: string;
  link: string;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  addMod() {
    this.editMode = 'Add';
    this.editIndex = null;
    this.name = '';
    this.author = '';
    this.icon = '';
    this.categories = '';
    this.versions = '';
    this.description = '';
    this.link = '';
  }

  editMod(id: any) {
    this.editMode = 'Edit';
    this.editIndex = id;
    let currentMod = this.mods[id];
    this.name = currentMod.name;
    this.author = currentMod.author;
    this.icon = currentMod.icon;
    this.categories = currentMod.categories;
    this.versions = currentMod.versions.toString();
    this.description = currentMod.description;
    this.link = currentMod.link;
    this.setOpen(true);
  }

  deleteMod(id: Number) {
    //console.log('deleted' + id);
    this.modService.deleteMod(id);
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  //makes a new card with a new id
  confirm() {
    let newMod = {
      icon: this.icon,
      name: this.name,
      author: this.author,
      description: this.description,
      categories: this.categories,
      versions: this.versions.replace(' ', '').split(','),
      link: this.link,
    };
    // console.log(newMod);
    this.modal.dismiss(newMod, 'confirm');
  }

  //when the confirm button is pressed, it runs the add card function in the service sending the new card data
  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      console.log(this.editMode);
      if (this.editMode == 'Add') {
        this.modService.addMod(ev.detail.data);
      } else {
        this.modService.updateMod(this.editIndex, ev.detail.data);
      }
    }
    this.setOpen(false);
  }
}
