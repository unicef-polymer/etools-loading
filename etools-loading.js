import {PolymerElement, html} from '@polymer/polymer/polymer-element';
import '@polymer/iron-flex-layout/iron-flex-layout-classes';
import '@polymer/paper-spinner/paper-spinner';

/**
 * `etools-loading`
 *
 * Loading spinner.

 * You can use this loading element:
 * - with an overlay: the loading spinner, message and overlay will be shown over your content area;
 * - simple, no overlay: the loading spinner and the message will be displayed inline-block.
 *
 * ### Styling
 *
 * You can use defined variables for styling.
 *
 * Custom property | Description | Default
 * ----------------|-------------|----------
 * `--etools-loading-overlay-transparency` | Overlay transparency | `0.6`
 * `--etools-loading-msg-color` | Loading message color | `#333333`
 * `--etools-loading-spinner-size` | Spinner size (width & height) | `20px`
 * `--etools-loading-bg-color` | Background color | `#ffffff`
 * `--etools-loading-border-color` | Border color | `#dedede`
 * `--etools-loading-shadow-color` | Shadow color | `#333333`
 * `--etools-loading-container` | Loading container style | `{}`
 * `--etools-loading-message` | Loading container style | `{}`
 *
 *
 * To change spinner colors use paper-spinner styling variables([paper-spinner docs](https://elements.polymer-project.org/elements/paper-spinner))
 *
 * @extends HTMLElement
 * @polymer
 * @customElement
 * @demo demo/index.html
 */
class EtoolsLoading extends PolymerElement {
    static get template() {
      return html`
        <style include="iron-flex iron-flex-alignment">
          :host {
            @apply --layout-horizontal;
            @apply --layout-center-justified;
            @apply --layout-fit;
            background-color: rgba(180, 180, 180, var(--etools-loading-overlay-transparency, 0.6));
            z-index: 50;
            text-align: center;
          }

          :host([no-overlay]) {
            background-color: transparent;
            display: inline-block !important;
            position: static;
            width: auto;
          }

          :host([no-overlay]:not([active])) {
            display: none !important;
          }

          .loading-message {
            margin-left: 15px;
            color: var(--etools-loading-msg-color, #333333);
            @apply --etools-loading-message
          }

          paper-spinner {
            width: var(--etools-loading-spinner-size, 20px);
            height: var(--etools-loading-spinner-size, 20px);
          }

          :host(:not([no-overlay])) .loading-content {
            background: var(--etools-loading-bg-color, #ffffff);
            border: 1px solid var(--etools-loading-border-color, #dedede);
            box-shadow: 0px 2px 5px -2px var(--etools-loading-shadow-color, #333333);
            padding: 10px;
            border-radius: 4px;
            @apply --etools-loading-container;
          }

          :host([absolute]) {
            position: fixed;
            z-index: 1000000;
          }

        </style>
        <div class="layout horizontal self-center">
          <div class="layout horizontal self-center loading-content">
            <paper-spinner active=""></paper-spinner>
            <span class="loading-message self-center">[[loadingText]]</span>
          </div>
        </div>
      `;
    }

    static get properties() {
      return {
        active: {
          type: Boolean,
          value: false,
          reflectToAttribute: true,
          observer: '_loadingStateChanged'
        },
        loadingText: {
          type: String,
          value: 'Loading data'
        }
      };
    }

    _loadingStateChanged(active) {
      if (active) {
        this.style.display = 'flex';
      } else {
        this.style.display = 'none';
      }
    }
  }

  customElements.define('etools-loading', EtoolsLoading);
