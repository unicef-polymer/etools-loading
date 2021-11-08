import './etools-loading.js';
import remove from 'lodash-es/remove';
import {default as lodashGet} from 'lodash-es/get';
import last from 'lodash-es/last';
import isEmpty from 'lodash-es/isEmpty';
import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/**
 * @polymer
 * @mixinFunction
 */
const internalLoadingMixin = (baseClass) =>
  class extends baseClass {
    static get properties() {
      return {
        /**
         *  If is set, this element will be used as loading container instead of default body
         */
        etoolsLoadingContainer: {
          type: Object
        }
      };
    }

    connectedCallback() {
      super.connectedCallback();
      this.addEventListener('global-loading', this.handleLoading);
      this.addEventListener('clear-loading-messages', this.clearLoadingQueue);

      // create loading element, used for global loading
      this.globalLoadingElement = this.createLoading();
      this.globalLoadingElement.messages = [];
    }

    /**
     * This method will create an etools-loading absolute element
     * (loading element is appended to the body and it will cover entire screen)
     * @param loadingMessage
     * @returns {Element}
     */
    createLoading(loadingMessage) {
      const newLoadingElement = document.createElement('etools-loading');
      if (typeof loadingMessage === 'string' && loadingMessage !== '') {
        newLoadingElement.loadingText = loadingMessage;
      }
      newLoadingElement.setAttribute('absolute', '');
      this.getContainer().appendChild(newLoadingElement);

      return newLoadingElement;
    }

    /**
     * Use this method to remove a loading element in the detached state of the element where loading is used
     * @param loadingElement
     */
    removeLoading(loadingElement) {
      if (loadingElement) {
        this.getContainer().removeChild(loadingElement);
      }
    }

    addMessageToQue(messages, source) {
      const _messages = messages.slice();
      _messages.push(source);
      return _messages;
    }

    removeMessageFromQue(messages, source) {
      const _messages = messages.slice();
      remove(_messages, {loadingSource: source.loadingSource});
      return _messages;
    }

    /**
     * Show loading when data is requested from server, or save is in progress...
     */
    handleLoading(event) {
      event.stopImmediatePropagation();
      if (!this.globalLoadingElement) {
        return;
      }

      const loadingSource = event.detail.loadingSource
        ? event.detail.loadingSource
        : lodashGet(event, 'path.0.localName', 'na');

      if (event.detail.active) {
        const message = lodashGet(event, 'detail.message', 'Loading...');
        this.globalLoadingElement.messages = this.addMessageToQue(this.globalLoadingElement.messages, {
          loadingSource: loadingSource,
          message: message
        });
        this.globalLoadingElement.loadingText = last(this.globalLoadingElement.messages).message;
        this.globalLoadingElement.active = true;
      } else {
        this.globalLoadingElement.messages = this.removeMessageFromQue(this.globalLoadingElement.messages, {
          loadingSource: loadingSource
        });
        if (isEmpty(this.globalLoadingElement.messages)) {
          this.globalLoadingElement.active = false;
        } else {
          this.globalLoadingElement.loadingText = last(this.globalLoadingElement.messages).message;
        }
      }
    }

    clearLoadingQueue(event) {
      event.stopImmediatePropagation();
      this.globalLoadingElement.messages = [];
      this.globalLoadingElement.active = false;
    }

    getContainer() {
      if (this.etoolsLoadingContainer) {
        return this.etoolsLoadingContainer;
      } else {
        return document.querySelector('body');
      }
    }
  };

/**
 * @polymer
 * @mixinFunction
 */
const LoadingMixin = dedupingMixin(internalLoadingMixin);
export default LoadingMixin;
