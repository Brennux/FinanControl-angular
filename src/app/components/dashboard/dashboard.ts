import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

interface Transacao {
  id: number;
  data: Date;
  tipo: 'receita' | 'despesa' | 'transferencia';
  descricao: string;
  valor: number;
}

interface DiaCalendario {
  data: Date;
  dia: number;
  mesAtual: boolean;
  receitas: number;
  despesas: number;
  saldo: number;
  transacoes: Transacao[];
}

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, MatIconModule, MatButtonModule, MatTooltipModule],
  templateUrl: './dashboard.html',
})
export class Dashboard {
  mesAtual = new Date();
  diasSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  // Dados de exemplo
  transacoes: Transacao[] = [
    { id: 1, data: new Date(2025, 11, 5), tipo: 'receita', descricao: 'Salário', valor: 5000 },
    { id: 2, data: new Date(2025, 11, 5), tipo: 'despesa', descricao: 'Aluguel', valor: 1500 },
    { id: 3, data: new Date(2025, 11, 8), tipo: 'despesa', descricao: 'Supermercado', valor: 300 },
    { id: 4, data: new Date(2025, 11, 10), tipo: 'receita', descricao: 'Freelance', valor: 800 },
    { id: 5, data: new Date(2025, 11, 12), tipo: 'despesa', descricao: 'Conta de luz', valor: 150 },
    { id: 6, data: new Date(2025, 11, 15), tipo: 'despesa', descricao: 'Restaurante', valor: 120 },
    { id: 7, data: new Date(2025, 11, 16), tipo: 'receita', descricao: 'Investimentos', valor: 200 },
    { id: 8, data: new Date(2025, 11, 18), tipo: 'despesa', descricao: 'Uber', valor: 45 },
    { id: 9, data: new Date(2025, 11, 20), tipo: 'despesa', descricao: 'Academia', valor: 99 },
    { id: 10, data: new Date(2025, 11, 22), tipo: 'receita', descricao: 'Reembolso', valor: 150 },
  ];

  get nomeDoMes(): string {
    return this.mesAtual.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
  }

  get diasDoCalendario(): DiaCalendario[] {
    const ano = this.mesAtual.getFullYear();
    const mes = this.mesAtual.getMonth();

    const primeiroDia = new Date(ano, mes, 1);
    const ultimoDia = new Date(ano, mes + 1, 0);
    const diasNoMes = ultimoDia.getDate();
    const diaDaSemana = primeiroDia.getDay();

    const dias: DiaCalendario[] = [];

    // Dias do mês anterior
    const ultimoDiaMesAnterior = new Date(ano, mes, 0).getDate();
    for (let i = diaDaSemana - 1; i >= 0; i--) {
      const data = new Date(ano, mes - 1, ultimoDiaMesAnterior - i);
      dias.push(this.criarDia(data, false));
    }

    // Dias do mês atual
    for (let i = 1; i <= diasNoMes; i++) {
      const data = new Date(ano, mes, i);
      dias.push(this.criarDia(data, true));
    }

    // Dias do próximo mês para completar a grade
    const diasRestantes = 42 - dias.length; // 6 semanas x 7 dias
    for (let i = 1; i <= diasRestantes; i++) {
      const data = new Date(ano, mes + 1, i);
      dias.push(this.criarDia(data, false));
    }

    return dias;
  }

  private criarDia(data: Date, mesAtual: boolean): DiaCalendario {
    const transacoesNoDia = this.transacoes.filter(t =>
      t.data.toDateString() === data.toDateString()
    );

    const receitas = transacoesNoDia
      .filter(t => t.tipo === 'receita')
      .reduce((sum, t) => sum + t.valor, 0);

    const despesas = transacoesNoDia
      .filter(t => t.tipo === 'despesa')
      .reduce((sum, t) => sum + t.valor, 0);

    return {
      data,
      dia: data.getDate(),
      mesAtual,
      receitas,
      despesas,
      saldo: receitas - despesas,
      transacoes: transacoesNoDia
    };
  }

  mesAnterior(): void {
    this.mesAtual = new Date(this.mesAtual.getFullYear(), this.mesAtual.getMonth() - 1);
  }

  proximoMes(): void {
    this.mesAtual = new Date(this.mesAtual.getFullYear(), this.mesAtual.getMonth() + 1);
  }

  mesAtualHoje(): void {
    this.mesAtual = new Date();
  }

  ehHoje(data: Date): boolean {
    const hoje = new Date();
    return data.toDateString() === hoje.toDateString();
  }

  get totalReceitasMes(): number {
    return this.transacoes
      .filter(t => t.tipo === 'receita')
      .reduce((sum, t) => sum + t.valor, 0);
  }

  get totalDespesasMes(): number {
    return this.transacoes
      .filter(t => t.tipo === 'despesa')
      .reduce((sum, t) => sum + t.valor, 0);
  }

  get saldoMes(): number {
    return this.totalReceitasMes - this.totalDespesasMes;
  }
}
