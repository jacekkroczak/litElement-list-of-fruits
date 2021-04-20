import { html, css, LitElement, customElement, property, query } from "lit-element";

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

          #noItems {
            display: flex;
            justify-content: center;
            background: #c3002f38;
            box-shadow: 2px 2px 15px 2px #00000038;
          }

          #noItems p {
            font-size: 26px;
            word-break: break-word;
            padding: 0 15px;
          }

          #noItems strong {
            background: #904ae624;
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

          .greenInput {
            border: 2px solid #3fb984;
            padding-left: 10px;
          }

          @media screen and (max-width: 1150px) {
            #filters {
              max-width: 100%;
            }

            #filters button, #filters input {
              margin-right: 5px;
            }

            .list {
              column-count: 3;
            }
          }

          @media screen and (max-width: 768px) {
            #filters {
              display: block;
              max-width: 100%;
            }

            #filters button, #filters input {
              margin: 10px 0;
              width: 100%;
            }

            #filters input {
              height: 45px;
              width: -webkit-fill-available;
            }

            .list {
              column-count: 2;
            }
          }

          @media screen and (max-width: 480px) {
            .list {
              column-count: 1;
            }
          }
      `,
    ];
  }

  @property({ type: Array }) fruits: any = [];

  @property({ type: Array }) filterFruits: any = [];

  @query('#search') search: any

  firstUpdated() {
    this._renderElements();
  }

  private _renderElements() {
    this.fruits = [];

    for (let i = 0; i < 100; i++) {
      for (let i = 0; i < basicFruits.length; i++) {
        let itemFruit = basicFruits[i];
        this.fruits.push(itemFruit);
      }
    }
    this.filterFruits = this.fruits;
  }

  private _filterFruits(e: any) {
    let filterValues = e.target.value;
    this.filterFruits.sort((a: any, b: any) => {

      if (filterValues === 'filterAZ' && a.name < b.name) {
        return -1;
      }

      else if (filterValues === 'filterZA' && a.name > b.name) {
        return -1;
      }

      else if (filterValues === 'random') {
        return 0.5 - Math.random();
      }

      else {
        return 0;
      }
    })
    this.requestUpdate();
  }

  private _resetFruits() {
    this.search.value = '';
    this._renderElements();
  }

  private _searchFruits(e: any) {
    e.preventDefault();
    const item = e.target.value.toLowerCase();
    this.filterFruits = this.fruits.filter((filterFruit: any) => {
      return filterFruit.name.toLowerCase().includes(item)
    });
  }

  render() {
    const renderFruit = (item: any, index: number) => html`
      <jk-list-item
        .fruit="${item}"
        .index="${index}"
      ></jk-list-item>
    `;

    const renderNoItemsLabel = () => html`
      <div id="noItems">
        <p>No records found for the phrases: <strong>${this.search != null ? this.search.value : ''}</strong></p>
      </div>
    `;

    const renderFilters = () => html`
      <button class="purpleButton" @click="${(e: any) => this._filterFruits(e)}" value="filterAZ">A-Z filter</button>
      <button class="purpleButton" @click="${(e: any) => this._filterFruits(e)}" value="filterZA">Z-A filter</button>
      <button class="blueButton" @click="${(e: any) => this._filterFruits(e)}" value="random">Random fruits</button>
      <input id="search" class="greenInput" @keyup="${(e: any) => this._searchFruits(e)}" placeholder="Type here...">
      <button class="redButton" @click="${this._resetFruits}" value="reset">Reset</button>
    `;

    const renderList = () => html`
      <ul class="list">
      ${this.filterFruits.length > 0 ? this.filterFruits.map((item: any, index: number) => renderFruit(item, index)) : ''}
      </ul>
    `;

    const renderScroll = () => html`
      <jk-scroll-to-top></jk-scroll-to-top>
    `;

    return html`
      <div id="filters">
        ${renderFilters()}  
      </div>
      <div id="list">
        ${renderList()}
        ${this.filterFruits.length === 0 ? renderNoItemsLabel() : ''}
      </div>
        ${renderScroll()}
    `;
  }
}
