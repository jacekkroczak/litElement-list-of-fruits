import { html, css, customElement, property, LitElement } from "lit-element";

@customElement("jk-list-item")
export default class JkListItem extends LitElement {

@property({ type: Object}) fruit: any = {};

@property({ type: Number}) index: any;


  static get styles() {
    return css`
      li {
          line-height: 50px;    
          align-items: center;
          width: min-content;
      }

      img {
        width: 220px;
        height: 170px;
      }
    `;
  }

  protected render() {
    return html`
    <li>name: ${this.fruit.name}, id: ${this.index + 1}
        <img src="/assets/${this.fruit.name}.jpg" />
      </li>    
    `;
  }
}
