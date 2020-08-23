import { html, css, customElement, property, LitElement } from "lit-element";

import { array } from './my-list';

@customElement("jk-list-item")
export default class JkListItem extends LitElement {

@property({ type: Array}) fruits: any = [];


  static get styles() {
    return css`
      li {
          line-height: 50px;    
          align-items: center;
          width: min-content;
      }

      img {
        width: 220px;
      }
    `;
  }

  firstUpdated() {
    const myArray = []
      for (let i = 0; i < 1000; i++) {
        const index = Math.floor(Math.random() * array.length);
        const itemFruit = array[index];
        myArray.push(itemFruit);
        this.fruits = myArray;
      }
  }

  protected render() {
    const _renderFruit = (item: any, index: number) => html`
      <li>${index + 1}, ${item.name}</li>
      <img src="assets/${item.name}.jpg" />
      `;

    return html`
    ${this.fruits != null && this.fruits.length > 0 ? this.fruits.map((item: any, index: number) => _renderFruit(item, index)) : ''}
    
    `;
  }
}

// <img src="http://localhost:8080/assets/Banana.jpg" />
//     <img src="assets/Banana.jpg" />
