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

      <div class="card">
        <h1>Ingresa y saca una sonrisa</h1>

        <paper-input class="custom" style='data' name='username' type="email" focused='true' label='Ingrese su email' value='{{username::input}}'>
        </paper-input>
        <br>
        <paper-input class="custom" style='data' type='password' label='Ingrese su contraseña' value='{{password::input}}'>
        </paper-input>
        <br><br>
        <paper-button raised class="button" on-tap='submit'><img class="imagenRegalo" src="./images/present.png"/>Ingresar</paper-button>

      </div>
    `;
  }

  static get properties() {
    return {
      isLoggedIn: {
        type: Boolean,
        value: false
      }
    };
  }

  submit(){
      console.log("requestSent");
      var xhr = new XMLHttpRequest();
      var url = "http://localhost:3000/api/login";
      var request = {
        username : this.username,
        password : this.password
      }
      var that=this;
      xhr.open("POST", url, true);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.onreadystatechange = function () {
          if (xhr.readyState === 4 && xhr.status === 200) {
              var groups = JSON.parse(xhr.responseText);
              console.log("Recibi informacion!")
              //TODO recibir info
              /*
              that.set('username', username);
              that.set('password', password);
              */
          }
      };
      var data = JSON.stringify({request});
      xhr.send(data);
  }

  getResponse(){
    console.log("Got Response");
  }
}

window.customElements.define('my-login', MyLogin);
