/* Example usage of CrumbsController.
 */

/* eslint-env es6, browser */
/* eslint no-restricted-syntax: "off" */

const OPTIONS = {
  maxlength: [30, 30, 30],
  separator: `<span class="separator">&nbsp;&gt; </span>`,
  container: '#crumbs_container',
  itemWrap: ['<span class="item">', '</span>'],
};

const crumbs = new CrumbsController(OPTIONS);
