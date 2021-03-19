import { testController } from '../support/world'
import { select } from '../support/utils'
import { ClientFunction } from 'testcafe';

const password = 'Atix2020';
const dotenv = require('dotenv');

export class Login {
  constructor () {
    dotenv.config();
    this.url = process.env.URL_HOST + `login`
    this.urlHome = process.env.URL_HOST + `home`
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

  userSettingsButton() {
    return select ('.MuiButtonBase-root-86')
  }

  logoutButton() {
    return select('li.MuiButtonBase-root-86')
  }

  async navigate () {
    await testController.navigateTo(this.url)
  }

  async navigateHome () {
    dotenv.config();
    this.urlHome = process.env.URL_HOST + `apps/home`;
    console.log(this.urlHome);
    const getLocation = ClientFunction(() => document.location.href).with({ boundTestRun: testController });
    await testController.expect(getLocation()).contains(this.urlHome);
  }
  async navigateHomeAndExit () {
    dotenv.config();
    this.urlHome = process.env.URL_HOST + `apps/home`;
    console.log(this.urlHome);
    const getLocation = ClientFunction(() => document.location.href).with({ boundTestRun: testController });
    await testController
    .expect(getLocation()).contains(this.urlHome)
    .click(this.userSettingsButton())
    .click(this.logoutButton())
    .expect(getLocation()).contains(this.url);
  }

  async login (email) {
    await testController
      .click(this.emailImput())
      .typeText(this.emailImput(), email, { paste: true })
      .click(this.passwordImput())
      .typeText(this.passwordImput(), password, { paste: true })
      .click(this.loginButton())
  }

  async loginValidate (email) {
    const loginTitle = this.loginTitle();
    const semillasTitle = this.semillasTitle();
    const semillasImg = this.semillasImg();

    await testController
      .expect(semillasTitle).ok('El titulo de Semillas se visualiza', { allowUnawaitedPromise: false })
      .expect(semillasImg).ok('El logo de Semillas se visualiza', { allowUnawaitedPromise: false })
      .expect(loginTitle).eql("Para ingresar completá los siguientes campos")
      .expect(singUpTitle).eql("¿No tienes una cuenta?")
  }
}
