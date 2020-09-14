import { html, css, LitElement, customElement, property } from "lit-element";

import { basicFruits } from './fruits-list';

/* Components */
import "./jk-list-item";
import "./jk-scroll-to-top"

@customElement("jk-list")
export class JkList extends LitElement {
  static get styles() {
    return [
      css`
          #filters {
            justify-content: space-between;
            display: flex;
            max-width: 75%;
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

          .purpleButton:focus {
            background: #904ae6;
            color: #fff;
          }

          .blueButton:focus {
            background: #35b8ee;
            color: #fff;
          }

          .greenButton:focus {
            background: #3fb984;
            color: #fff;
          }
      `,
    ];
  }

  @property({ type: Array }) fruits: any = [];

  @property({ type: Array }) filteredFruits: any = [];

  firstUpdated() {
    this._renderElements();
  }

  _renderElements() {
    this.fruits = [];

    for (let i = 0; i < 100; i++) {
      for (let i = 0; i < basicFruits.length; i++) {
        let itemFruit = basicFruits[i];
        this.fruits.push(itemFruit);
      }
    }
  }

  _filterFruits(e: any) {
    let filterValues = e.target.value;
    this.fruits.sort((a: any, b: any) => {

      if (filterValues === 'filterAZ' && a.name < b.name) {
        return -1;
      }

      else if (filterValues === 'filterZA' && a.name > b.name) {
        return -1;
      }

      else if (filterValues === 'random') {
        return 0.5 - Math.random();
      }

      else if (filterValues === 'mango' && a.name === 'Mango') {
        return -1;
      }

      else if (filterValues === 'reset') {
        this._renderElements();
      }

      else {
        return 0;
      }
    })

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
          <button class="purpleButton" @click="${(e: any) => this._filterFruits(e)}" value="filterAZ">A-Z filter</button>
          <button class="purpleButton" @click="${(e: any) => this._filterFruits(e)}" value="filterZA">Z-A filter</button>
          <button class="blueButton" @click="${(e: any) => this._filterFruits(e)}" value="random">Random fruits</button>
          <button class="greenButton" @click="${(e: any) => this._filterFruits(e)}" value="mango">Show mango in first column</button>
          <button class="redButton" @click="${(e: any) => this._filterFruits(e)}" value="reset">Reset</button>
      </div>
      <div id="list">
        <ul class="list">
          ${this.fruits.map((item: any, index: number) => _renderFruit(item, index))}
        </ul>
      </div>
      <jk-scroll-to-top></jk-scroll-to-top>
    `;
  }
}
