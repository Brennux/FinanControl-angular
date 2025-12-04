import { Routes } from '@angular/router';
export const routes: Routes = [
    {path: '', redirectTo: '/dashboard', pathMatch: 'full'},

    {path: 'dashboard',
        loadComponent: () => import('./components/dashboard/dashboard').then(m => m.Dashboard)
    },

    {path: 'transacoes',
        loadComponent: () => import('./components/transacoes/transacoes').then(m => m.Transacoes)
    },
    {path: 'cadastros',
        loadComponent: () => import('./components/cadastros/cadastros').then(m => m.Cadastros)
    }
];
