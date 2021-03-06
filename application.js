/* Using CrumbsController to show a rootline navigation above the map search.
*/

/* eslint-env es6, browser */
/* eslint no-restricted-syntax: "off" */
/* global CrumbsController */

/* Markup Manual
 * =============
 *
 * DOM elements that will interact with the rootline navigation ("breadcrumbs")
 * will usually be form controls.  But with proper markup, basically any
 * element with any event can trigger a rootline change.
 *
 * Sometimes, lists of labels need to be aggregated before being shown in the
 * rootline.  This "list mode" (see below) currently only supports checkbox and
 * radio inputs.
 *
 *
 * Mandatory HTML Data Attributes
 * ------------------------------
 * data-crumbs-level (integer):
 *     integer, 0 or more.  The hierarchy level this component acts on.
 *
 * data-crumbs-text (string):
 *     The text that should appear in the breadcrums at this level.  This is
 *     automatically shortened under some circumstances.
 *
 * Optional Data
 * -------------
 * data-crumbs-event (string representing event):
 *     Which event should trigger this element being incorporated into the
 *     rootline nav?  This defaults to something sensible based on the type of
 *     element.
 *
 * data-crumbs-publish (boolean) -> 'false':
 *     Publish the rootline right after as this element's contribution was
 *     added.
 *
 * For Lists of Elements
 * ---------------------
 * data-crumbs-list (any type comparable by "===") -> undefined:
 *     This element has siblings that can be incorporated at the same level
 *     with this one.  This value is the family name.
 *
 * data-crumbs-list-prefix (string) -> '':
 *     The prefix to use before the listing, like:
 *     "<Selected foos>: foo1, foo2"
 */

(function protectGlobalScope() {
  const OPTIONS = {
    maxLength: [40, 40, 50],
    separator: '',
    container: 'nav.breadcrumbs>.path',
    itemWrap: ['<span class="item">', '</span>'],
  };

  document.addEventListener('DOMContentLoaded', () => {
    console.log("loaded");
    const crumbs = new CrumbsController(OPTIONS);
    for (const trigger of document.querySelectorAll('[data-crumbs-level]')) {
      let event;
      switch (trigger.tagName) {
        case 'INPUT':
          event = 'change';
          break;
        default:
          event = 'click';
      }
      trigger.addEventListener(event, () => {
        const text = trigger.dataset.crumbsText;
        const level = trigger.dataset.crumbsLevel;
        if (trigger.dataset.crumbsList) {
          if (trigger.checked) {
            crumbs.addToList(
              level,
              trigger.dataset.crumbsList,
              trigger.dataset.crumbsListPrefix,
              text,
            );
          } else {
            crumbs.removeFromList(
              level,
              trigger.dataset.crumbsList,
              trigger.dataset.crumbsListPrefix,
              text,
            );
          }
        } else {
          crumbs.set(trigger.dataset.crumbsLevel, trigger.dataset.crumbsText);
        }
        if (trigger.dataset.crumbsPublish) {
          crumbs.publish();
        }
      });
    }
    for (button of document.querySelectorAll('.mapsearchResetBtn')) {
      button.addEventListener('click', () => crumbs.clear());
      // We need the arrow function to guard against event handler "this"
      // injection.
    }
  });
}());
