import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModService } from '../services/mod.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  public currentMod: any = {
    name: 'Mod Name',
  };

  constructor(private route: ActivatedRoute, private modService: ModService) {}

  async ngOnInit() {
    await this.modService.load();

    const id = this.route.snapshot.paramMap.get('id');

    this.currentMod = this.modService.mods[id];
    console.log(this.currentMod);
  }
}
