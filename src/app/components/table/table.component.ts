import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Torre } from 'src/app/models/torres';
import { TorresService } from 'src/app/services/torre.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  torres: Torre[] = [];
  isLoadingbd: boolean = true;

  filtroForm: FormGroup;
  torresFiltradas: Torre[] = [];
  residencia: string = '';
  torre: string = '';
  nombre: string = '';
  estadoMensaje: string = '';


  constructor(
    private torresService: TorresService,
    private formBuilder: FormBuilder,
  ) { 
    this.filtroForm = this.formBuilder.group({
      residencia: [''], // Agrega más campos según tus necesidades
      torre: [''],
      nombre: [''],
      estadoMensaje: ['']
    });
  }

  ngOnInit(): void {
    this.obtenerTorres();
  }

  obtenerTorres(): void {
    this.torresService.obtenerTorres().subscribe(
      (torres) => {
        this.torres = torres;
        this.isLoadingbd = false;
      },
      (error) => {
        console.log('Error al obtener las torres:', error);
      }
    );
  }

  filtrarTorres(): void {
    this.residencia = this.residencia.toLowerCase();
    this.torre = this.torre.toLowerCase();
    this.nombre = this.nombre.toLowerCase();
    this.estadoMensaje = this.estadoMensaje.toLowerCase();

      // Si no hay fecha ingresada o no es válida, aplicar los filtros sin considerar la fecha
      this.torresFiltradas = this.torres.filter((torre) => {
        const residenciaMatch = !this.residencia || torre.residencia.toLowerCase().includes(this.residencia);
        const torreMatch = !this.torre || torre.nombre.toLowerCase().includes(this.torre);
        const nombreMatch = !this.nombre || torre.nombrePersona.toLowerCase().includes(this.nombre);
        const estadoMensajeMatch = !this.estadoMensaje || torre.estadoMensaje.toLowerCase().includes(this.estadoMensaje);
      
        return residenciaMatch && torreMatch && nombreMatch && estadoMensajeMatch;
      });
    
  
    console.log('Torres filtradas:', this.torresFiltradas);
  }

  limpiarFiltros(): void {
    // Restablece los valores de los filtros a su estado inicial
    this.residencia = '';
    this.torre = '';
    this.nombre = '';
    this.estadoMensaje = '';
  
    // Vacía el array de torres filtradas para mostrar todas las torres
    this.torresFiltradas = [];
  } 

}
