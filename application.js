/* Example usage of CrumbsController.
 */

/* eslint-env es6, browser */
/* eslint no-restricted-syntax: "off" */

/* Markup Ideas
 * ============
 * All DOM elements that should interact with the breadcrumbs must be marked
 * with at least the following HTML data attributes:
 *
 * data-crumbs-level (integer):
 *     integer, 0 or more.  The hierarchy level this component acts on.
 *
 * data-crumbs-text (string):
 *     The text that should appear in the breadcrums at this level.  This is
 *     automatically shortened under some circumstances.
 *
 * Optional Data
 * -------------
 *
 * data-crumbs-event (string representing event) -> 'click':
 *     Which event should trigger this element being incorporated into the
 *     rootline nav?
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
const OPTIONS = {
  maxlength: [30, 30, 30],
  separator: `<span class="separator">&nbsp;&gt; </span>`,
  container: '#crumbs_container',
  itemWrap: ['<span class="item">', '</span>'],
};

const crumbs = new CrumbsController(OPTIONS);
