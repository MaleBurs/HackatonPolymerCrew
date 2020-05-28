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
 import { setPassiveTouchGestures, setRootPath } from '@polymer/polymer/lib/utils/settings.js';
 import '@polymer/app-layout/app-drawer/app-drawer.js';
 import '@polymer/app-layout/app-drawer-layout/app-drawer-layout.js';
 import '@polymer/app-layout/app-header/app-header.js';
 import '@polymer/app-layout/app-header-layout/app-header-layout.js';
 import '@polymer/app-layout/app-scroll-effects/app-scroll-effects.js';
 import '@polymer/app-layout/app-toolbar/app-toolbar.js';
 import '@polymer/app-route/app-location.js';
 import '@polymer/app-route/app-route.js';
 import '@polymer/iron-pages/iron-pages.js';
 import '@polymer/iron-selector/iron-selector.js';
 import '@polymer/paper-icon-button/paper-icon-button.js';
 import '@polymer/paper-button/paper-button.js';
 import '@polymer/paper-input/paper-input.js';
 import '@polymer/iron-ajax/iron-ajax.js';
 import './my-icons.js';
 import './shared-styles.js';
 import '@polymer/app-storage/app-localstorage/app-localstorage-document.js';
 // Gesture events like tap and track generated from touch will not be
 // preventable, allowing for better scrolling performance.
 setPassiveTouchGestures(true);

 // Set Polymer's root path to the same value we passed to our service worker
 // in `index.html`.
 setRootPath(MyAppGlobals.rootPath);

 class MyApp extends PolymerElement {
   static get template() {
     return html`
       <style include="shared-styles">
        :host {
          --app-primary-color: #4285f4;
          --app-secondary-color: black;

          display: block;
        }

        app-drawer-layout:not([narrow]) [drawer-toggle] {
          display: none;
        }
         app-drawer-layout{
           background-color:#fbf5fa;
        }
        app-header {
          color: #f47a20;
          background-color: white;

          border-bottom-style:solid;
          border-bottom-color: #b26aac;
          border-width: 1px;

          text-transform: uppercase;
          letter-spacing: 1.7px;

        }

        app-header paper-icon-button {
          --paper-icon-button-ink-color: white;
        }

        .drawer-list {
          margin: 0 20px;
        }

        .drawer-list a {
          display: block;
          padding: 0 16px;
          text-decoration: none;
          color: var(--app-secondary-color);
          line-height: 40px;
        }

        .drawer-list a.iron-selected {
          color: black;
          font-weight: bold;
        }

        a.login{
          margin-top:10px;
        }
      </style>

      <app-localstorage-document
        key="isLoggedIn"
        data="{{isLoggedIn}}">
      </app-localstorage-document>

       <app-location route="{{route}}" url-space-regex="^[[rootPath]]">
       </app-location>

       <app-route route="{{route}}" pattern="[[rootPath]]:page" data="{{routeData}}" tail="{{subroute}}">
       </app-route>


       <app-drawer-layout fullbleed="" narrow="{{narrow}}">
         <!-- Drawer content -->
         <template is=dom-if if='{{isLoggedIn}}'>
         <app-drawer id="drawer" slot="drawer" swipe-open="[[narrow]]">
           <app-toolbar class="menu">Menu</app-toolbar>
           <iron-selector selected="[[page]]" attr-for-selected="name" class="drawer-list" role="navigation">
             <a class="textMenu" name="view1" href="[[rootPath]]view1">3Deseos</a>
             <a class="textMenu" name="regalar" href="[[rootPath]]regalar">Regalar</a>
             <a class="textMenu" name="miPerfil" href="[[rootPath]]miPerfil">Mi Perfil</a>
           </iron-selector>
           <img class="fondoDeTres" src="./images/background.png">
         </app-drawer>
         </template>

         <template is=dom-if if='{{!isLoggedIn}}'>
         <app-drawer id="drawer" slot="drawer" swipe-open="[[narrow]]">
           <app-toolbar class="menu">Menu</app-toolbar>
           <iron-selector selected="[[page]]" attr-for-selected="name" class="drawer-list" role="navigation">
             <a class="textMenu" name="view1" href="[[rootPath]]view1">3Deseos</a>
             <a class="textMenu" name="login" href="[[rootPath]]login">Ingresar</a>
           </iron-selector>
           <img class="fondoDeTres" src="./images/background.png">
         </app-drawer>
         </template>

         <!-- Main content -->
         <app-header-layout has-scrolling-region="">

           <app-header class="headerBar" slot="header" condenses="" reveals="" effects="waterfall">
             <app-toolbar>
               <paper-icon-button icon="my-icons:menu" drawer-toggle=""></paper-icon-button>
               <img src="./images/Logo3Deseos.jpg" height="40px;" alt="3Deseos">
               <div class="borderDivided">
                 <div id="purple"></div>
                 <div id="orange2"></div>
                 <div id="purple2"></div>
                 <div id="orange"></div>
               </div>
               <paper-button class='logout' hidden$="{{!isLoggedIn}}" on-tap='logout'>Cerrar Sesión</paper-button>
             </app-toolbar>
           </app-header>

           <iron-pages selected="[[page]]" attr-for-selected="name" role="main">
             <my-view1 name="view1"></my-view1>
             <my-login name="login"></my-login>
             <my-regalar name="regalar"></my-regalar>
             <mi-perfil name="miPerfil"></mi-perfil>
             <my-view404 name="view404"></my-view404>
           </iron-pages>
         </app-header-layout>
       </app-drawer-layout>
     `;
   }

   static get properties() {
     return {
       page: {
         type: String,
         reflectToAttribute: true,
         observer: '_pageChanged'
       },
       routeData: Object,
       subroute: Object,
       isLoggedIn: {
         type: Boolean,
         value: false,
         notify: true
       }
     };
   }

   static get observers() {
     return [
       '_routePageChanged(routeData.page)',
     ];
   }

   _routePageChanged(page) {
      // Show the corresponding page according to the route.
      //
      // If no page was found in the route data, page will be an empty string.
      // Show 'view1' in that case. And if the page doesn't exist, show 'view404'.
     if (!page) {
       this.page = 'view1';
     } else if (['view1', 'login', 'regalar','miPerfil'].indexOf(page) !== -1) {
       this.page = page;
     } else {
       this.page = 'view404';
     }

     // Close a non-persistent drawer when the page & route are changed.
     if (!this.$.drawer.persistent) {
       this.$.drawer.close();
     }
   }

   _pageChanged(page) {
     // Import the page component on demand.
     //
     // Note: `polymer build` doesn't like string concatenation in the import
     // statement, so break it up.
     switch (page) {
       case 'view1':
         import('./my-view1.js');
         break;
       case 'login':
         import('./login.js');
         break;
       case 'regalar':
         import('./regalar.js');
         break;
       case 'miPerfil':
         import('./miPerfil.js');
         break;
       case 'view404':
         import('./my-view404.js');
         break;
     }
   }

   _loginStatusChanged(status){
     console.log("Login status changed to "+status+" Seen in OBSERVER")
   }


   logout(){
     this.isLoggedIn=false;
   }

 }

 window.customElements.define('my-app', MyApp);
