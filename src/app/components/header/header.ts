import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDividerModule } from '@angular/material/divider';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatBadgeModule,
    MatDividerModule
  ],
  templateUrl: './header.html',
})
export class Header {
  isDarkMode = false;
  notifications = [
    { title: 'Nova mensagem', description: 'Você tem uma nova mensagem', time: '5 min atrás' },
    { title: 'Atualização do sistema', description: 'Sistema atualizado com sucesso', time: '1 hora atrás' },
    { title: 'Novo comentário', description: 'Alguém comentou na sua publicação', time: '2 horas atrás' }
  ];

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    document.documentElement.classList.toggle('dark');
  }

  toggleSidebar() {
    // Implementar lógica do sidebar
    console.log('Toggle sidebar');
  }
}
