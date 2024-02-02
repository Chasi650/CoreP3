import { Component,OnInit } from '@angular/core';
import { MinicoreService } from 'src/app/minicore.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private minicoreService: MinicoreService) {}

  progresoSeleccionado: string | null = null;
  users: any[] = [];
  notas: any[] = [];
  promedios: any[] = [];
  progresosFiltrados: any[] = []; // Nuevo arreglo para almacenar progresos filtrados

  ngOnInit() {
    this.obtenerUsuarios();
    this.obtenerNotas();
    this.obtenerPromedios();
  }

  seleccionarProgreso(progreso: string) {
    this.progresoSeleccionado = progreso;
  }

  obtenerUsuarios() {
    this.minicoreService.getUsers().subscribe((data: any) => {
      this.users = data;
    });
  }

  obtenerNotas() {
    this.minicoreService.getNotas().subscribe((data: any) => {
      this.notas = data;
    });
  }

  obtenerPromedios() {
    this.minicoreService.getUsersProm().subscribe((data: any[]) => {
      this.promedios = data;
    });
  }
  
  getUserName(userId: number): string | undefined {
    const user = this.users.find(user => user.id === userId);
    return user ? user.name : undefined;
  }
}
