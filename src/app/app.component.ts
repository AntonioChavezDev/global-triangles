import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuComponent } from "./pages/menu/menu.component";

@Component({
  standalone: true,
  imports: [RouterModule, MenuComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'global-triangles';
}
