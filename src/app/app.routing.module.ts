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
import { CreateCategoryComponent } from './components/admin-panel/create-category/create-category.component';
import { EditCategoryComponent } from './components/admin-panel/edit-category/edit-category.component';
import { EditCategoriesComponent } from './components/admin-panel/edit-categories/edit-categories.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { SentOrdersComponent } from './components/admin-panel/sent-orders/sent-orders.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent, canActivate: [NotAuthenticatedGuard] },
    { path: 'register', component: RegisterComponent, canActivate: [NotAuthenticatedGuard] },
    { path: 'account', component: AccountComponent, canActivate: [AuthenticatedGuard] },
    {
        path: 'admin', component: AdminPanelComponent, canActivate: [AdminGuard], children: [
            { path: 'products/create', component: CreateProductComponent },
            { path: 'products/edit', component: EditProductsComponent },
            { path: 'products/edit/:id', component: EditProductComponent },
            { path: 'categories/create', component: CreateCategoryComponent },
            { path: 'categories/edit', component: EditCategoriesComponent },
            { path: 'categories/edit/:id', component: EditCategoryComponent },
            { path: 'orders/sent', component: SentOrdersComponent }
        ]
    },
    { path: 'shopping-cart', component: ShoppingCartComponent },
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
