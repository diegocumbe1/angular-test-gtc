import { Component, OnInit } from '@angular/core';
import { DocenteService } from '../docente.service';
import { Docente } from '../docente';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormsModule,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { TipoDocumento } from '../tipo-documento';
import { TipoDocumentoService } from '../tipo-documento.service';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MAT_DATE_FORMATS } from '@angular/material/core';

interface Any {
  value: string;
  viewValue: string;
}

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [{ provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }],
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    MatTableModule,
    ReactiveFormsModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatSnackBarModule,
  ],
})
export class HomeComponent implements OnInit {
  //Variables Angular Material
  dateControl = new FormControl();
  startDate = new Date(1990, 0, 1);
  name = new FormControl('', [Validators.required]);
  cellphone = new FormControl('', [Validators.required]);
  phone = new FormControl('', [Validators.required]);
  surname = new FormControl('', [Validators.required]);
  document = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);
  foods: Any[] = [
    { value: 'Pregrado', viewValue: 'Pregrado' },
    { value: 'Postgrado', viewValue: 'Postgrado' },
    { value: 'Especialización', viewValue: 'Especialización' },
    { value: 'Maestría', viewValue: 'Maestría' },
    { value: 'Doctorado', viewValue: 'Doctorado' },
  ];
  grades: Any[] = [
    { value: '1', viewValue: 'Primero' },
    { value: '2', viewValue: 'Segundo' },
    { value: '3', viewValue: 'Tercero' },
    { value: '4', viewValue: 'Cuarto' },
    { value: '5', viewValue: 'Quinto' },
    { value: '6', viewValue: 'Sexto' },
    { value: '7', viewValue: 'Séptimo' },
    { value: '8', viewValue: 'Octavo' },
    { value: '9', viewValue: 'Noveno' },
    { value: '10', viewValue: 'Décimo' },
    { value: '11', viewValue: 'Once' },
  ];

  //Variables globales
  id_gradoresponsable: number;
  grado_escolaridad: string;
  docentes: Docente[];
  fecha_nacimiento: string;
  tipoDocumentoList: TipoDocumento[];
  documentType: number;
  view: string;
  dataView: string;
  displayedColumns: string[] = [
    'id',
    'numerodocumento',
    'nombres',
    'apellidos',
    'nacimiento',
    'email',
    'grado_escolaridad',
    'accion',
  ];
  id: number | undefined;
  selectedDate: Date;

  constructor(
    private _snackBar: MatSnackBar,
    private http: HttpClient,
    private docenteService: DocenteService,
    private documentoService: TipoDocumentoService
  ) {
    this.selectedDate = new Date();
    this.id_gradoresponsable = -1;
    // this.id = -1;
    this.dataView = 'list';
    this.grado_escolaridad = '';
    this.view = 'd';
    this.docentes = [];
    this.fecha_nacimiento = '';
    this.tipoDocumentoList = [];
    this.documentType = -1;
    this.getDocentes().then((res) => {
      this.docentes = res;
      this.id = this.docentes[this.docentes.length - 1].id! + 1;
    });
    this.getTipoDocumento().then((res) => {
      const data = res as Array<any>;
      data.forEach((document) => {
        const newDocument: TipoDocumento = {
          id: document.id,
          descripcion: document.descripcion,
        };
        this.tipoDocumentoList.push(newDocument);
      });
    });
  }

  public addDocent(): void {
    const apiUrl = 'http://localhost:8080/api/docentes';
    const fecha = new Date(this.fecha_nacimiento);

    const data: Docente = {
      id: this.id,
      id_tipodocumento: this.documentType,
      numerodocumento: Number(this.document.value)!,
      nombres: this.name.value!,
      apellidos: this.surname.value!,
      fecha_nacimiento: fecha.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      }),
      asig_dictadas: 0,
      grado_escolaridad: this.grado_escolaridad,
      id_gradoresponsable: this.id_gradoresponsable,
      email: this.email.value!,
      fijo: this.phone.value!,
      celular: this.cellphone.value!,
    };
    if (this.id != undefined) {
      this.id++;
    }
    console.log(data);

    this.docenteService.postDocente(data).subscribe((res) => {
      this.showNotification(res);
    });
  }

  onDateSelected(): void {
    this.fecha_nacimiento = this.dateControl.value;
  }

  showNotification(response: any): void {
    this.dataView = 'list';
    this.getDocentes().then((res) => {
      this.docentes = res;
      this.id = this.docentes[this.docentes.length - 1].id! + 1;
      this._snackBar.open(
        '¡Docente ' + response.nombres + ' añadido exitosamente!',
        'Cerrar'
      );
    });
  }

  showNotificationDelete(response: any): void {
    this.dataView = 'list';
    this.getDocentes().then((res) => {
      this.docentes = res;
      this.id = this.docentes[this.docentes.length - 1].id! + 1;
      this._snackBar.open(
        '¡Docente ' + response.nombres + ' eliminado!',
        'Cerrar'
      );
    });
  }

  showNotificationEdit(response: any): void {
    this.dataView = 'list';
    this.getDocentes().then((res) => {
      this.docentes = res;
      this.id = this.docentes[this.docentes.length - 1].id! + 1;
      this._snackBar.open(
        '¡Docente ' + response.nombres + ' Editado Correctamente!',
        'Cerrar'
      );
    });
  }

  changeEscolarity(event: any): void {
    this.grado_escolaridad = event.value;
  }

  changeGrade(event: any): void {
    this.id_gradoresponsable = Number(event.value);
  }

  onOptionSelected(event: any): void {
    this.documentType = event.value;
  }

  public setView(view: string): void {
    this.view = view;
  }

  ngOnInit(): void {
    this.getDocentes();
  }

  public setDataView(dataView: string): void {
    this.dataView = dataView;
  }
  // editDocent(docent: any) {
  //   // Aquí puedes implementar la lógica para editar el docente
  //   console.log('Editar docente:', docent);
  // }
  public editDocent(docent: any): void {
    const apiUrl = 'http://localhost:8080/api/docentes';
    const idInt = parseInt(docent.id);

    // Realiza una solicitud PUT para actualizar el docente
    this.docenteService.updateDocente(idInt, docent).subscribe((res) => {
      this.showNotificationEdit(docent);
    });
  }

  // deleteDocent(docent: any) {
  //   // Aquí puedes implementar la lógica para eliminar el docente
  //   console.log('Eliminar docente:', docent);
  // }
  public deleteDocent(docent: any): void {
    const apiUrl = 'http://localhost:8080/api/docentes';
    // const fecha = new Date(this.fecha_nacimiento);

    console.log(docent);
    const idInt = parseInt(docent.id);

    this.docenteService.deleteDocente(idInt).subscribe((res) => {
      this.showNotificationDelete(docent);
    });
  }

  getDocentes(): Promise<Docente[]> {
    return new Promise<Docente[]>((res, rej) => {
      this.docenteService.getDocentes().subscribe((docentes) => res(docentes));
    });
  }

  getTipoDocumento(): Promise<TipoDocumento[]> {
    return new Promise<TipoDocumento[]>((res, rej) => {
      this.documentoService
        .getTipoDocumento()
        .subscribe((documentos) => res(documentos));
    });
  }

  getErrorEmailMessage() {
    if (this.email.hasError('required')) {
      return 'El Email no puede estar vacío';
    }

    return this.email.hasError('email') ? 'Email inválido' : '';
  }

  getErrorNameMessage() {
    if (this.name.hasError('required')) {
      return 'Debes agregar un nombre';
    }
    return '';
  }

  getErrorSurnameMessage() {
    if (this.name.hasError('required')) {
      return 'Debes agregar un apellido';
    }
    return '';
  }

  getErrorCellphoneMessage() {
    if (this.cellphone.hasError('required')) {
      return 'Debes agregar un Celular';
    }
    return '';
  }

  getErrorPhoneMessage() {
    if (this.phone.hasError('required')) {
      return 'Debes agregar un Teléfono';
    }
    return '';
  }

  getErrorDocumentMessage() {
    if (this.document.hasError('required')) {
      return 'Debes agregar un Documento';
    }
    return '';
  }
}
