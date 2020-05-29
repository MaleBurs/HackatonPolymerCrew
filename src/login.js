/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import './shared-styles.js';

class MyLogin extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;
          padding: 10px;
        }

        h1{
          letter-spacing: 1.3px;
          color:#b26aac;
          font-size: 20px;
        }

      </style>

      <app-localstorage-document
        key="isLoggedIn"
        data="{{isLoggedIn}}">
      </app-localstorage-document>


      <paper-dialog id=confirmationDialog>
        Te enviamos un mail de confirmación a {{NewUsername}}
        <paper-button raised class="buttonLogin" on-tap='_closeConfirmDialog'><img class="imagenRegalo" src="./images/present.png"/>ok</paper-button>
      </paper-dialog>


      <paper-dialog id=errorDialog z-index="15;">
        Los datos ingresados no son correctos.
        <paper-button raised class="buttonLogin" on-tap='_closeErrorDialog'><img class="imagenRegalo" src="./images/present.png"/>ok</paper-button>
      </paper-dialog>


      <paper-dialog class="regisCard" id=registerDialog>
        <h1>La felicidad está hecha para ser compartida, registrese</h1>
        <paper-input class='data' style='data' name='username' type='email' focused='true' label='Ingrese su email' value='{{NewUsername::input}}'>
        </paper-input>
        <paper-input class='data' style='data' type='password' label='Ingrese su contraseña' value='{{NewPassword::input}}'>
        </paper-input>
        <paper-input class='data' style='data' type='password' label='Ingrese su contraseña nuevamente' value='{{NewPasswordConfirm::input}}'>
        </paper-input>
        <br>
        <paper-button raised class="buttonLogin" on-tap='_register'><img class="imagenRegalo" src="./images/celebration.png"/>Registrarse</paper-button>
        <div class="txtRegis">¿Ya eres miembro?<paper-button class="buttonLink" on-tap='_closeRegisterDialog'>Iniciar Sesión</paper-button></div>
      </paper-dialog>

      <div class="card">
        <h1>Ingrese para sacar sorisas</h1>
        <paper-input class='data' style='data' name='username' type='email' focused='true' label='Ingrese su email' value='{{username::input}}'>
        </paper-input>
        <br>
        <paper-input class='data' style='data' type='password' label='Ingrese su contraseña' value='{{password::input}}'>
        </paper-input>
        <br><br>
        <paper-button raised class="buttonLogin" on-tap='submit'><img class="imagenRegalo" src="./images/present.png"/>Ingresar</paper-button>
        <div class="txtRegis">¿Todavía no tienes cuenta? <paper-button class="buttonLink" on-tap='_openRegisterDialog'>Registrarse</paper-button></div>

      </div>
    `;
  }

  static get properties() {
    return {
      username:String,
      password:String,
      NewUsername:String,
      NewPassword:String,
      NewPasswordConfirm:String
    };
  }

  submit(){
      var xhr = new XMLHttpRequest();
      var url = "http://theserver.mynetgear.com:3000/api/login";
      var request = {
        username : this.username,
        password : this.password
      }
      var that=this;
      xhr.open("POST", url, true);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.onreadystatechange = function () {
          if (xhr.readyState === 4 && xhr.status === 200) {
              var reply = JSON.parse(xhr.responseText);
              that.set('isLoggedIn', reply);
              if (reply==false) that._openErrorDialog();
          }
      };
      var data = JSON.stringify({request});
      xhr.send(data);
  }

/*isEmail(email) {
  var regularExp = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  console.log(regularExp.test(email))
  return regularExp.test(email);
}*/


  _register(){
    if(this.$.NewPassword==this.$.NewPasswordConfirm&&this.$.NewUsername!=null&&this.$.NewPassword!=null){
      // TODO: Crear nuevo usuario en DB
    this.$.registerDialog.close();
    this.$.confirmationDialog.open();
  }
    else
      this.$.errorDialog.open();
  }

  _openErrorDialog(){
    this.$.errorDialog.open();
  }

  _closeConfirmDialog(){
    this.$.confirmationDialog.close();
  }

  _closeErrorDialog(){
    this.$.errorDialog.close();
  }
   _openRegisterDialog(){
    this.$.registerDialog.open();
  }

  _closeRegisterDialog(){
    this.$.registerDialog.close();
  }

}

window.customElements.define('my-login', MyLogin);
