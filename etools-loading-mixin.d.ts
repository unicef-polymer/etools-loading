import {LitElement} from 'lit-element/lit-element.js';
import {PolymerElement} from '@polymer/polymer/polymer-element';

interface Constructor<T> {
  new (...args: any[]): T;
}

declare function LoadingMixin<T extends Constructor<PolymerElement | LitElement>>(
  base: T
): {
  new (...args: any[]): {
    connectedCallback(): void;

    /**
     * This method will create an etools-loading absolute element
     * (loading element is appended to the body and it will cover entire screen)
     */
    createLoading(loadingMessage: any): Element | null;

    /**
     * Use this method to remove a loading element in the detached state of the element where loading is used
     */
    removeLoading(loadingElement: any): void;
    addMessageToQue(messages: any, source: any): any;
    removeMessageFromQue(messages: any, source: any): any;

    /**
     * Show loading when data is requested from server, or save is in progress...
     */
    handleLoading(event: any): void;
    clearLoadingQueue(event: any): void;

    /**
     *  If is set, this element will be used as loading container instead of default body
     */
    etoolsLoadingContainer: HTMLElement | null;
  };
} & T;

export default LoadingMixin;
