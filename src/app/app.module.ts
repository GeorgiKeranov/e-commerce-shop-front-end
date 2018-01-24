import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
// import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AgmCoreModule } from '@agm/core';

import { AppRoutingModule } from './app.routing.module';
import { LocalStorageModule } from 'angular-2-local-storage';
import { FlashMessagesModule } from 'angular2-flash-messages';

import { AdminGuard } from './guards/admin.guard.service';
import { AuthenticatedGuard } from './guards/authenticated.guard.service';
import { NotAuthenticatedGuard } from './guards/not.authenticated.guard.service';

import { AuthenticationService } from './services/authentication.service';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SearchComponent } from './components/search/search.component';
import { AccountComponent } from './components/account/account.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { CreateProductComponent } from './components/admin-panel/create-product/create-product.component';
import { EditProductsComponent } from './components/admin-panel/edit-products/edit-products.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { EditProductComponent } from './components/admin-panel/edit-product/edit-product.component';
import { CreateCategoryComponent } from './components/admin-panel/create-category/create-category.component';
import { EditCategoryComponent } from './components/admin-panel/edit-category/edit-category.component';
import { EditCategoriesComponent } from './components/admin-panel/edit-categories/edit-categories.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { SentOrdersComponent } from './components/admin-panel/sent-orders/sent-orders.component';
import { CompleteOrderComponent } from './components/admin-panel/complete-order/complete-order.component';
import { CompletedOrdersComponent } from './components/admin-panel/completed-orders/completed-orders.component';
import { UncompleteOrderComponent } from './components/admin-panel/uncomplete-order/uncomplete-order.component';
import { PagesComponent } from './components/pages/pages.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CatalogComponent } from './components/catalog/catalog.component';
import { CategoryProductsComponent } from './components/category-products/category-products.component';
import { ContactsComponent } from './components/contacts/contacts.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    SearchComponent,
    AccountComponent,
    AdminPanelComponent,
    CreateProductComponent,
    EditProductsComponent,
    PageNotFoundComponent,
    EditProductComponent,
    CreateCategoryComponent,
    EditCategoryComponent,
    EditCategoriesComponent,
    ShoppingCartComponent,
    SentOrdersComponent,
    CompleteOrderComponent,
    CompletedOrdersComponent,
    UncompleteOrderComponent,
    PagesComponent,
    ProductDetailsComponent,
    CatalogComponent,
    CategoryProductsComponent,
    ContactsComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    // FormsModule,
    HttpModule,
    AppRoutingModule,
    LocalStorageModule,
    FlashMessagesModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDEwOjyMwkxH7G151r7333157cD1e3NW5g'
    })
  ],
  providers: [
    AuthenticationService,
    AdminGuard,
    AuthenticatedGuard,
    NotAuthenticatedGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
