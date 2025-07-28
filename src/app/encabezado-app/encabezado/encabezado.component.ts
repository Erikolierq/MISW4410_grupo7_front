import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Encabezado } from './../encabezado';
import { EncabezadoService } from './../encabezado.service'

@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.css']
})
export class EncabezadoComponent implements OnInit {

  idUsuario: string | null = sessionStorage.getItem('idUsuario');
  nombre: string;
  rol: string;
  usuario: string;
  message: string;

  constructor(
    private routerPath: Router,
    private router: ActivatedRoute,
    private toastr: ToastrService,
    private encabezadoService: EncabezadoService) { }

    ngOnInit(): void {
  // Obtener el token desde sessionStorage
  const token = sessionStorage.getItem('token');

  if (token) {
    this.encabezadoService.darRolUsuario(token).subscribe(
      (data) => {
        this.usuario = data.identity.id;
        this.rol = data.identity.rol;
        this.nombre = ''; 
      },
      (error) => {
        console.error('Error al verificar el token:', error);
        this.toastr.error('Token inválido o sesión expirada');
        this.routerPath.navigate(['/auth/login']);
      }
    );
  } else {
    console.error('Token no encontrado en sessionStorage');
    this.toastr.warning('Sesión no iniciada');
    this.routerPath.navigate(['/auth/login']);
  }
}


}
