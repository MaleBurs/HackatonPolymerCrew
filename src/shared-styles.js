/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

import '@polymer/polymer/polymer-element.js';

const $_documentContainer = document.createElement('template');
$_documentContainer.innerHTML = `<dom-module id="shared-styles">
  <template>
    <style>
      .circle {
        display: inline-block;
        width: 64px;
        height: 64px;
        text-align: center;
        color: #555;
        border-radius: 50%;
        background: #ddd;
        font-size: 30px;
        line-height: 64px;
      }
    :host {
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

      .borderDivided{
        margin-top: 62px;
      }
      #purple {
          background-color: #b26aac;
          display: inline-table;
          height: 3px;
          width: 26%;
          left: 0px;
          background-repeat: repeat-x;
          position: absolute;
      }
       
      #orange {
          background-color: #f47a20;
          display: inline-table;
          width: 26%;
          right: 0px;
          height: 3px;
          background-repeat: repeat-x;
          position: absolute;
      }
      #purple2 {
          background-color: #b26aac;
          display: inline-table;
          height: 3px;
          width: 26%;
          right: 25%;
          background-repeat: repeat-x;
          position: absolute;
      }
       
      #orange2 {
          background-color: #f47a20;
          display: inline-table;
          width: 25%;
          left: 25%;
          height: 3px;
          background-repeat: repeat-x;
          position: absolute;
      }
      app-toolbar.menu{
        background-color:#f47a20;
      }
      .fondoDeTres{
        left:55px;
        bottom: 120px;
        position: absolute;
        width:200px;
      }
       paper-button.buttonLogin{
        border-radius:4px;
        background-color: #f47a20;
        color: black;
        cursor: pointer;

        font-feature-settings: "liga" 0;
        letter-spacing: 1.6px;
        font-weight: 380;
        font-size: 15px;
        text-transform: capitalize;

        height: 45px;
        width: 113px;
        float: right;
        position: relative;
        padding:5px;
        top: -10px;
      }

      div.card{
        margin: 24px;
        padding: 60px;
        color: #757575;
        border-radius: 5px;
        background-color: #fff;

        height:280px;
        width: 63%;
        display: block;

        top:30px;
        position:relative;
        margin-left: auto;
        margin-right: auto;

        box-shadow: -4px 7px 14px 8px rgba(249,241,247,0.89);
      }

      .imagenRegalo{
        height:20px;
        margin-right:6px;
      }

      paper-input.data {
        --paper-input-container-underline-focus: { display: none; };
        --paper-input-container-color:#838383;
        --paper-input-container-focus-color:#f47a20;
        --paper-input-container-input-color: black;
        --paper-input-container-invalid-color:#b26aac;
      }

    </style>
  </template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);
