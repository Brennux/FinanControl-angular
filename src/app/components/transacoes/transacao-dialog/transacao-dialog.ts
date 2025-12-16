import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

interface Transacao {
  id: number;
  data: Date;
  tipo: 'receita' | 'despesa' | 'transferencia';
  descricao: string;
  categoria?: string;
  valor: number;
  conta: string;
  status: 'pendente' | 'confirmada' | 'recorrente';
}

@Component({
  selector: 'app-transacao-dialog',
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatIconModule,
    FormsModule
  ],
  templateUrl: './transacao-dialog.html',
})
export class TransacaoDialog {
  transacao: Transacao;

  constructor(public dialogRef: MatDialogRef<TransacaoDialog>, @Inject(MAT_DIALOG_DATA) public data: Transacao | null) {
    this.transacao = data ? { ...data} : {
      id: 0,
      data: new Date(),
      tipo: 'despesa',
      descricao: '',
      valor: 0,
      conta: '',
      status: 'pendente'
    };
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.dialogRef.close(this.transacao);
  }

}
