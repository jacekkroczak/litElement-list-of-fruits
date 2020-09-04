import { html, css, LitElement, customElement, property } from "lit-element";

import { array } from './my-list';

import "./jk-list-item";

@customElement("jk-list")
export class JkList extends LitElement {
  static get styles() {
    return [
      css`
          #filters {
            justify-content: space-between;
            display: flex;
            max-width: 65%;
            padding: 20px 0;
          }
          ul {
            column-count: 5;
            list-style: none;
            padding-left: 0;
          }

          button {
            border: 2px solid;
            padding: 0 30px;
            height: 45px;
            background: transparent;
            font-size: 14px;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            cursor: pointer;
            transition: 0.5s;
          }

          button:focus {
            outline: none;
          }

          .purpleButton {
            border-color: #904ae6;
            color: #904ae6;
          }

          .blueButton {
            border-color: #35b8ee;
            color: #35b8ee;
          }

          .greenButton {
            border-color: #3fb984;
            color: #3fb984;
          }

          .redButton {
            border-color: #c3002f;
            color: #c3002f;
          }

          .purpleButton:hover {
            background: #904ae6;
            color: #fff;
            border-color: #904ae6;
          }

          .blueButton:hover {
            background: #35b8ee;
            color: #fff;
            border-color: #35b8ee;
          }

          .greenButton:hover {
            background: #3fb984;
            color: #fff;
            border-color: #3fb984;
          }

          .redButton:hover {
            background: #c3002f;
            color: #fff;
            border-color: #c3002f;
          }

      `,
    ];
  }

  @property({ type: Array}) fruits: any = [];

  @property({ type: Array}) filteredFruits: any = [];

  constructor() {
    super();
  }

  firstUpdated() {
    this.fruits = []

    for (let i = 0; i < 100; i++) {
      for (let i = 0; i < array.length; i++) {
      let itemFruit = array[i];
      this.fruits.push(itemFruit);
      }
    }
    
  }

  _filterByAZ() {
    this.fruits.sort((a: any, b: any) => {
      if(a.name < b.name) { return -1; }
      return 0;
    })
    this.requestUpdate();
  }

  _filterByZA() {
    this.fruits.sort((a: any, b: any) => {
      if(a.name > b.name) { return -1; }
      return 0;
    })
    this.requestUpdate();
  }

  _filterFirstMango() {
    this.fruits.sort((item: any) => {
      if(item.name === 'Mango') { return -1; }
      return 0;
    })
      this.requestUpdate();
  }

  _reset() {
    this.firstUpdated();
    this.requestUpdate();
  }


  render() {
    const _renderFruit = (item: any, index: number) => html`
      <jk-list-item
        .fruit="${item}"
        .index="${index}"
      ></jk-list-item>
    `;

    return html`
      <div id="filters">
          <button class="purpleButton" @click="${this._filterByAZ}">A-Z filter</button>
          <button class="greenButton" @click="${this._filterByZA}">Z-A filter</button>
          <button class="blueButton" @click="${this._filterFirstMango}">Show "Mango" in first column </button>
          <button class="redButton" @click="${this._reset}">Reset</button>
      </div>
      <div id="list">
        <ul class="list">
          ${this.fruits.map((item: any, index: number) => _renderFruit(item, index))}
        </ul>
      </div>
    `;
  }
}
