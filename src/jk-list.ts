import { html, css, LitElement, customElement } from "lit-element";

import "./jk-list-item";

@customElement("jk-list")
export class JkList extends LitElement {
  static get styles() {
    return [
      css`
        :host {
          display: flex;
          }

          ul {
            column-count: 5;
            list-style: none;
          }
      `,
    ];
  }
  constructor() {
    super();
  }


  render() {
    return html`
        <ul class="list">
          <jk-list-item></jk-list-item>
        </ul>
    `;
  }
}
