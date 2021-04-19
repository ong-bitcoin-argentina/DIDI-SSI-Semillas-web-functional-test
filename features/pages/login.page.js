import { testController } from '../support/world'
import { select } from '../support/utils'
import { ClientFunction } from 'testcafe';

const dotenv = require('dotenv');

export class Login {
  constructor () {
    dotenv.config();
    this.url = process.env.URL_HOST + `login`
    this.urlHome = process.env.URL_HOST + `credentials`
  }

  emailImput  () {
    return select('#username')
  }

  passwordImput () {
    return select('#password')
  }

  semillasTitle () {
    return select('#root > div > div > div > div > div > div.LoginFormContainer > h1').exists
  }
  
  semillasImg () {
    return select ('#root > div > div > div > div > div > div.loginLogo > img').exists
  }

  loginTitle () {
    return select ('#root > div > div > div > div > div > div.LoginFormContainer > p').innerText
  }

  loginButton () {
    return select('#root > div > div > div > div > div > div.LoginFormContainer > form > div:nth-child(3) > div > div > div > div > div > button');
  }


  logoutButton() {
    return select('#root > div > div > div > div > div > div.header > div.Sidebar > ul > li.ant-menu-item.logoutBottom > button')
  }

  //HOME SELECTORS
  credentialsTitle () {
    return select ('#root > div > div > div > div > div > div.Content > div > div.TitlePage > div > h1').innerText
  }

  semillasHomeImg () {
    return select ('#root > div > div > div > div > div > div.header > div.TopNav > img').exists
  }

  async navigate () {
    await testController.navigateTo(this.url)
  }

  async navigateHome () {
    dotenv.config();
    this.urlHome = process.env.URL_HOST + `credentials`;
    console.log(this.urlHome);
    const getLocation = ClientFunction(() => document.location.href).with({ boundTestRun: testController });
    await testController.expect(getLocation()).contains(this.urlHome);
  }
  async navigateHomeAndExit () {
    dotenv.config();
    this.urlHome = process.env.URL_HOST + `credentials`;
    console.log(this.urlHome);
    const getLocation = ClientFunction(() => document.location.href).with({ boundTestRun: testController });
    await testController
    .expect(getLocation()).contains(this.urlHome)
    .click(this.logoutButton())
    .expect(getLocation()).contains(this.url);
  }

  async login (email) {
    await testController
      .click(this.emailImput())
      .typeText(this.emailImput(), email, { paste: true })
      .click(this.passwordImput())
      .typeText(this.passwordImput(), process.env.PASSWORD, { paste: true })
      .click(this.loginButton())
  }

  async loginValidate () {
    const loginTitle = this.loginTitle();
    const semillasTitle = this.semillasTitle();
    const semillasImg = this.semillasImg();

    await testController
      .expect(semillasTitle).ok('El titulo de Semillas se visualiza', { allowUnawaitedPromise: false })
      .expect(semillasImg).ok('El logo de Semillas se visualiza', { allowUnawaitedPromise: false })
      .expect(loginTitle).eql("Para ingresar completá los siguientes campos")
  }
  async homeValidate () {
    const credentialsTitle = this.credentialsTitle();
    const semillasHomeImg = this.semillasHomeImg();

    await testController
      .expect(semillasHomeImg).ok('El logo de Semillas se visualiza', { allowUnawaitedPromise: false })
      .expect(credentialsTitle).eql("Credenciales")
  }
}
