import { html, css, customElement, LitElement, query } from "lit-element";

@customElement("jk-scroll-to-top")
export default class jkScrollToTop extends LitElement {

    constructor() {
        super();
        window.onscroll = () => {
            this._scrollFuntion();
        }
    }

    @query('#scrollToTop') scrollToTop: any;

    _scrollFuntion() {
        if (document.documentElement.scrollTop > 70) {
            this.scrollToTop.style.display = 'block';
        } else {
            this.scrollToTop.style.display = 'none';
        }
    }

    _scrollTop() {
        document.documentElement.scrollTop = 0;
    }

    static get styles() {
        return css`
            #scrollToTop {
                display: none;
                background: #e00e79;
                color: #fff;
                right: 20px;
                bottom: 20px;
                position: fixed;
                text-align: center;
                padding: 15px;
                text-transform: uppercase;
                font-weight: bold;
                box-shadow: 0px 0px 7px 2px rgb(0 0 0 / 44%);
                letter-spacing: 1px;
                cursor: pointer;
            }
    `;
    }

    protected render() {
        return html`
            <div @click="${this._scrollTop}" id="scrollToTop">Top</div>  
    `;
    }
}
