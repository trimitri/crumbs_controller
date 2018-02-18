/* A simple controller for a breadcrumbs-style location indicator.
 */

/* eslint-env es6, browser */
/* eslint no-restricted-syntax: "off" */

const OPTIONS = {
  maxlength: [30, 30, 30],
  separator: `<span class="separator">&nbsp;&gt; </span>`,
  container: 'nav.breadcrumbs',
  itemWrap: ['<span class="item">', '</span>'],
};

class CrumbsController {
  constructor(settings) {
    this.maxlength = settings.maxlength;
    this.separator = settings.separator;
    this.container = document.querySelector(settings.container);
    // The working area where the new state is assembled.
    this.staging = [];
  }

  /* Get the new state from staging area and publish it.
   */
  publish() {
    this.container.innerHTML = this._buildHtml();
  }

  /* Update the staging area.
   *
   * This will update the node with the given level in the staging area and
   * drop all the child levels.
   */
  set(level, text) {
    this.staging[level] = text;
  }

  /* Generate publishable HTML from staging area.
   */
  _buildHtml() {
    return this.staging.join(this.separator);
  }

  /* Shorten a string to it's levels maximum allowable length.
   *
   * This methods tries to retain as much meaningfulness as possible by
   * shortening the middle of the string.
   */
  static _ellipsicate(level, text) {
    // TODO: Implement _ellipsicate(): copy from python?
    return text;
  }
}

const crumbs = new CrumbsController(OPTIONS);
