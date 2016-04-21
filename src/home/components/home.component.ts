import {Component} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common';
import {CubeComponent} from '../../cube/components/cube.component';
import {NameListService} from '../../shared/services/name-list.service';

@Component({
  selector: 'home',
  moduleId: module.id,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  directives: [FORM_DIRECTIVES, CORE_DIRECTIVES, CubeComponent]
})
export class HomeComponent {
  newName: string;
  constructor(public nameListService: NameListService) { }

  /*
   * @param newname  any text as input.
   * @returns return false to prevent default form submit behavior to refresh the page.
   */
  addName(): boolean {
    this.nameListService.add(this.newName);
    this.newName = '';
    return false;
  }
}
