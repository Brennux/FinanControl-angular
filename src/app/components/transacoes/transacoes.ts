import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatCheckboxModule } from '@angular/material/checkbox';

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
  selector: 'app-transacoes',
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMenuModule,
    MatCheckboxModule
  ],
  templateUrl: './transacoes.html',
})
export class Transacoes {
  mesAtual = new Date();
  filtroSelecionado = 'todos';
  contaSelecionada = 'todas';

  transacoes: Transacao[] = [
    {
      id: 1,
      data: new Date(2025, 11, 4),
      tipo: 'transferencia',
      descricao: 'Saldo Inicial',
      valor: 0,
      categoria: 'supermercado',
      conta: 'Nubank',
      status: 'confirmada'
    }
  ];

  get saldoAnterior(): number {
    return 0;
  }

  get totalReceitas(): number {
    return this.transacoes
      .filter(t => t.tipo === 'receita')
      .reduce((sum, t) => sum + t.valor, 0);
  }

  get totalDespesas(): number {
    return this.transacoes
      .filter(t => t.tipo === 'despesa')
      .reduce((sum, t) => sum + t.valor, 0);
  }

  get saldoAtual(): number {
    return this.saldoAnterior + this.totalReceitas - this.totalDespesas;
  }

  get transacoesFiltradas(): Transacao[] {
    let filtradas = [...this.transacoes];

    if (this.filtroSelecionado !== 'todos') {
      filtradas = filtradas.filter(t => {
        if (this.filtroSelecionado === 'receitas') return t.tipo === 'receita';
        if (this.filtroSelecionado === 'despesas') return t.tipo === 'despesa';
        if (this.filtroSelecionado === 'transferencias') return t.tipo === 'transferencia';
        if (this.filtroSelecionado === 'recorrentes') return t.status === 'recorrente';
        return true;
      });
    }

    return filtradas;
  }

  mesAnterior() {
    this.mesAtual = new Date(this.mesAtual.getFullYear(), this.mesAtual.getMonth() - 1);
  }

  proximoMes() {
    this.mesAtual = new Date(this.mesAtual.getFullYear(), this.mesAtual.getMonth() + 1);
  }

  formatarMes(): string {
    return this.mesAtual.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
  }

  formatarData(data: Date): string {
    return data.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  }

  formatarValor(valor: number): string {
    return valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  getTipoIcon(tipo: string): string {
    if (tipo === 'receita') return 'arrow_downward';
    if (tipo === 'despesa') return 'arrow_upward';
    return 'sync_alt';
  }

  getTipoColor(tipo: string): string {
    if (tipo === 'receita') return 'text-green-600 dark:text-green-400';
    if (tipo === 'despesa') return 'text-red-600 dark:text-red-400';
    return 'text-blue-600 dark:text-blue-400';
  }

  adicionarTransacao() {
    console.log('Adicionar nova transação');
  }

  editarTransacao(transacao: Transacao) {
    console.log('Editar transação', transacao);
  }

  excluirTransacao(transacao: Transacao) {
    console.log('Excluir transação', transacao);
  }
}
