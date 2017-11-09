import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminGuard } from './guards/admin.guard.service';
import { AuthenticatedGuard } from './guards/authenticated.guard.service';
import { NotAuthenticatedGuard } from './guards/not.authenticated.guard.service';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { AccountComponent } from './components/account/account.component';
import { CreateProductComponent } from './components/admin-panel/create-product/create-product.component';
import { EditProductsComponent } from './components/admin-panel/edit-products/edit-products.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { EditProductComponent } from './components/admin-panel/edit-product/edit-product.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent, canActivate: [NotAuthenticatedGuard] },
    { path: 'register', component: RegisterComponent, canActivate: [NotAuthenticatedGuard] },
    { path: 'account', component: AccountComponent, canActivate: [AuthenticatedGuard] },
    {
        path: 'admin', component: AdminPanelComponent, canActivate: [AdminGuard], children: [
            { path: 'product/create', component: CreateProductComponent },
            { path: 'product/edit', component: EditProductsComponent },
            { path: 'product/edit/:id', component: EditProductComponent }
        ]
    },
    { path: 'page-not-found', component: PageNotFoundComponent },
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
