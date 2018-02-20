/* A simple controller for a breadcrumbs-style location indicator.
 */

/* eslint-env es6, browser */
/* eslint no-restricted-syntax: "off" */

class CrumbsController {
  constructor(settings) {
    this.maxlength = settings.maxlength;
    this.separator = settings.separator;
    this.container = settings.container;
    // The working area where the new state is assembled.
    this.staging = [];
    this.lists = [];
  }

  /* Add a multiple choice item to the given levels list.
   *
   * If this item has the same family as the previous one, the list is
   * extended.  If it has a different family, the previous list is dropped and
   * a new list is started.
   *
   * @param {int} level: The hierarchy level.
   * @param {Any} family: Family indicator (e.g. string).  Has to be ===-able.
   * @param {str} prefix: Prefix the list of value with this string when adding
   *             it to the rootline.
   * @param {str} text: The list item's description.
   */
  addToList(level, family, prefix, text) {
    if (this.lists[level] && this.lists[level].family === family) {
      this.lists[level].push(text);
    } else {
      this.lists[level] = [text];
      this.lists[level].family = family;
    }
    this.set(level, `${prefix}${this.lists[level].join(', ')}`);
  }

  /* Clear all items from staging and publish the void.
   */
  clear() {
    this.staging = [];
    this.publish();
  }

  /* Get the new state from staging area and publish it.
   */
  publish() {
    document.querySelector(this.container).innerHTML = this._buildHtml();
  }

  /* Remove a multiple choice item from the current list.
   *
   * If this item has the same family as the previous one, the item is removed.
   * Otherwise, the list is reset altogether.
   *
   * @param {int} level: The hierarchy level.
   * @param {Any} family: List family indicator (e.g. string).  Has to be
   *             ===-able.
   * @param {str} prefix: Prefix the list of values with this string when
   *             adding it to the rootline.
   * @param {str} text: The list item's description.
   */
  removeFromList(level, family, prefix, text) {
    if (this.lists[level] && this.lists[level].family === family) {
      const index = this.lists[level].findIndex(name => name === text);
      if (index >= 0) {
        this.lists[level].splice(index, 1);
      } else {
        console.warn("Tried to remove non-existent list item.");
      }
    } else {
      this.lists[level] = [];
      this.lists[level].family = family;
    }
    this.set(level, `${prefix}${this.lists[level].join(', ')}`);
  }

  /* Update the staging area.
   *
   * This will update the node with the given level in the staging area and
   * drop all the child levels.
   */
  set(level, text) {
    this.staging[level] = text;
    this.staging = this.staging.slice(0, level + 1);
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
