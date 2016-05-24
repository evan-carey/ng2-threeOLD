import { Component } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { ROUTER_DIRECTIVES, Routes } from '@angular/router';

import { AboutComponent } from '../+about/index';
import { HomeComponent } from '../+home/index';
import { NameListService } from '../shared/index';
import { NavbarComponent } from './navbar.component';
import { ToolbarComponent } from './toolbar.component';

// import { RendererService } from '../shared/services/renderer.service';
// import { ShaderService } from '../shared/services/shader.service';

@Component({
  selector: 'sd-app',
  viewProviders: [NameListService],
  templateUrl: 'app/components/app.component.html',
  directives: [ROUTER_DIRECTIVES, NavbarComponent, ToolbarComponent],
  providers: [
    HTTP_PROVIDERS
  ]
})
@Routes([
  {
    path: '/',
    component: HomeComponent
  },
  {
    path: '/about',
    component: AboutComponent
  }
])
export class AppComponent {}
