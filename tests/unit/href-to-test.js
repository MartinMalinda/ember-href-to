import { module, test } from 'qunit';
import HrefTo from 'ember-href-to/href-to';

module('Unit | HrefTo');

const viewRegistry = {};

function createHrefToForEvent(event) {
  let mockApplicationInstance = {
    lookup() {
      return viewRegistry;
    }
  };

  return new HrefTo(mockApplicationInstance, event);
}

function leftClickEvent() {
  return { which: 1, ctrlKey: false, metaKey: false };
}

function getClickEventOnEl(string) {
  let el = $(string);
  let event = leftClickEvent();
  event.currentTarget = el;

  return event;
}

test('#isUnmodifiedLeftClick should be true for left clicks', function(assert) {
  let event = { which: 1, ctrlKey: false, metaKey: false };
  let hrefTo = createHrefToForEvent(event);

  assert.ok(hrefTo.isUnmodifiedLeftClick());
});

test('#isUnmodifiedLeftClick should be false for right clicks', function(assert) {
  let event = { which: 2, ctrlKey: false, metaKey: false };
  let hrefTo = createHrefToForEvent(event);

  assert.notOk(hrefTo.isUnmodifiedLeftClick());
});

test('#isNotIgnored should be false if [data-href-to-ignore] is present', function(assert) {
  let event = getClickEventOnEl("<a href='' data-href-to-ignore>");
  let hrefTo = createHrefToForEvent(event);

  assert.notOk(hrefTo.isNotIgnored());
});

test('#isNotIgnored should be true if [data-href-to-ignore] is not present', function(assert) {
  let event = getClickEventOnEl("<a href=''>");
  let hrefTo = createHrefToForEvent(event);

  assert.ok(hrefTo.isNotIgnored());
});

test('#hasNoActionHelper should be false if [data-ember-action] is present', function(assert) {
  let event = getClickEventOnEl("<a href='' data-ember-action>");
  let hrefTo = createHrefToForEvent(event);

  assert.notOk(hrefTo.hasNoActionHelper());
});

test('#hasNoActionHelper should be true if [data-ember-action] is not present', function(assert) {
  let event = getClickEventOnEl("<a href=''>");
  let hrefTo = createHrefToForEvent(event);

  assert.ok(hrefTo.hasNoActionHelper());
});

test('#hasNoDownload should be false if [download] is present', function(assert) {
  let event = getClickEventOnEl("<a href='' download>");
  let hrefTo = createHrefToForEvent(event);

  assert.notOk(hrefTo.hasNoDownload());
});

test('#hasNoDownload should be true if [download] is not present', function(assert) {
  let event = getClickEventOnEl("<a href=''>");
  let hrefTo = createHrefToForEvent(event);

  assert.ok(hrefTo.hasNoDownload());
});