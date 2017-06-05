import { MocNhien.ClientPage } from './app.po';

describe('moc-nhien.client App', () => {
  let page: MocNhien.ClientPage;

  beforeEach(() => {
    page = new MocNhien.ClientPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
