import { html, css, customElement, property, LitElement } from "lit-element";

export type Fruit = {
  name: string
}

@customElement("section-sidebar")
export default class SectionSideBar extends LitElement {

  @property() fruit:Fruit = {name: "test"};
  static get styles() {
    return css`
      article {
        border-bottom: 1px solid;
        margin-bottom: 25px;
        padding-bottom: 25px;
        padding-left: 35px;
        /* navigation sticks to the top */
        position: sticky;
        top: 0;
      }

      article p {
        font-weight: 700;
        margin-bottom: 10px;
        padding: 0;
      }
      article ul {
        list-style: none;
        margin: 0;
        overflow: hidden;
        padding: 0;
      }
      article li {
        padding-left: 20px;
        padding-bottom: 15px;
      }
      article a,
      article li {
        display: flex;
        align-items: center;
      }

      @media (max-width: 1200px) {
        article {
          padding-left: 5px;
        }
      }
      .linkActive {
        color: red;
        font-weight: 700;
      }
    `;
  }

  protected render() {
    return html`
    ${this.fruit.name}
      <article>
        <p>Navigate menu</p>
        <nav>
          <ul id="contactLink">
            <li class="links">
              <a href="#" id="section1">Section 1</a>
            </li>

            <li class="links">
              <a href="#" id="section2">Section 2</a>
            </li>

            <li class="links">
              <a href="#" id="section3">Section 3</a>
            </li>

            <li class="links">
              <a href="#" id="section4">Section 4</a>
            </li>
          </ul>
        </nav>
      </article>
    `;
  }
}
