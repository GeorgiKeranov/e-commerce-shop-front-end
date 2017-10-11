import { ECommerceShopPage } from './app.po';

describe('e-commerce-shop App', () => {
  let page: ECommerceShopPage;

  beforeEach(() => {
    page = new ECommerceShopPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
