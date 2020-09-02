import { html, css, LitElement, customElement, property } from "lit-element";

import { array } from './my-list';

import "./jk-list-item";

@customElement("jk-list")
export class JkList extends LitElement {
  static get styles() {
    return [
      css`
          ul {
            column-count: 5;
            list-style: none;
          }
      `,
    ];
  }

  @property({ type: Array}) fruits: any = [];

  constructor() {
    super();
  }

  firstUpdated() {
    this.fruits = []
      for (let i = 0; i < 1000; i++) {
        const index = Math.floor(Math.random() * array.length);
        const itemFruit = array[index];
        this.fruits.push(itemFruit);
      }

      console.log('array', this.fruits);
  }


  render() {
    const _renderFruit = (item: any, index: number) => html`
      <jk-list-item
        .fruit="${item}"
        .index="${index}"
      ></jk-list-item>
    `;

    return html`
        <ul class="list">
          ${this.fruits.map((item: any, index: number) => _renderFruit(item, index))}
        </ul>
    `;
  }
}
