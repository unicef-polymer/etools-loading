import './etools-loading.js';
import { dedupingMixin } from '@polymer/polymer/lib/utils/mixin.js';

/**
 * @polymer
 * @mixinFunction
 */
const internalLoadingMixin = baseClass => class extends baseClass {


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
    let newLoadingElement = document.createElement('etools-loading');
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
        this.getContainer().removeChild(loadingElement)
    }
  }

  addMessageToQue(messages, source) {
    let _messages = messages.slice();
    _messages.push(source);
    return _messages;
  }

  removeMessageFromQue(messages, source) {
    let _messages = messages.slice();
    if (_messages) {
      _messages = _messages.filter(function (msg) {
        return msg.loadingSource !== source.loadingSource
      })
    }
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

    let loadingSource = event.detail.loadingSource
        ? event.detail.loadingSource
        : this._getValueOrDefault(this._getLocalName(event), 'na');

    if (event.detail.active) {
      let message = this._getValueOrDefault(event.detail.message, 'Loading...');

      this.globalLoadingElement.messages = this.addMessageToQue(this.globalLoadingElement.messages, {
        loadingSource: loadingSource,
        message: message
      });

      this.globalLoadingElement.loadingText = this._last(this.globalLoadingElement.messages).message;
      this.globalLoadingElement.active = true;

    } else {
      this.globalLoadingElement.messages = this.removeMessageFromQue(this.globalLoadingElement.messages, {
        loadingSource: loadingSource
      });
      if (!this.globalLoadingElement.messages || !this.globalLoadingElement.messages.length) {
        this.globalLoadingElement.active = false;
      } else {
        this.globalLoadingElement.loadingText = this._last(this.globalLoadingElement.messages).message;
      }
    }
  }
  _last(array) {
    const length = !array ? 0 : array.length;
    return length ? array[length - 1] : undefined;
  }

  _getLocalName(event) {
    if (event.path && event.path['0']) {
      return event.path['0'].localName;
    }
    return null;
  }

  _getValueOrDefault(val, defaultVal) {
    return (val ? val : defaultVal);
  }

  clearLoadingQueue(event) {
    event.stopImmediatePropagation();
    this.globalLoadingElement.messages = [];
    this.globalLoadingElement.active = false;
  }

  getContainer(){
    if(this.etoolsLoadingContainer){
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
