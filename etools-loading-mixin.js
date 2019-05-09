import './etools-loading.js';
import _ from 'lodash-es';
import { dedupingMixin } from '@polymer/polymer/lib/utils/mixin.js';

/**
 * @polymer
 * @mixinFunction
 */
const internalLoadingMixin = baseClass => class extends baseClass {
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
    newLoadingElement.absolute = true;
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
    let _messages = _.slice(messages);
    _messages.push(source);
    return _messages;
  }

  removeMessageFromQue(messages, source) {
    let _messages = _.slice(messages);
    _.remove(_messages, {loadingSource: source.loadingSource});
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
        : _.get(event, 'path.0.localName', 'na');

    if (event.detail.active) {
      let message = _.get(event, 'detail.message', 'Loading...');
      this.globalLoadingElement.messages = this.addMessageToQue(this.globalLoadingElement.messages, {
        loadingSource: loadingSource,
        message: message
      });
      this.globalLoadingElement.loadingText = _.last(this.globalLoadingElement.messages).message;
      this.globalLoadingElement.active = true;
    } else {
      this.globalLoadingElement.messages = this.removeMessageFromQue(this.globalLoadingElement.messages, {
        loadingSource: loadingSource
      });
      if (_.isEmpty(this.globalLoadingElement.messages)) {
        this.globalLoadingElement.active = false;
      } else {
        this.globalLoadingElement.loadingText = _.last(this.globalLoadingElement.messages).message;
      }
    }
  }

  clearLoadingQueue(event) {
    event.stopImmediatePropagation();
    this.globalLoadingElement.messages = [];
    this.globalLoadingElement.active = false;
  }

  getContainer(){
    if(this.loadingContainer){
      return this.loadingContainer;
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
