import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { MAIL_WEBMAIL_INBOX, PRODUCT } from './site.ts';
import {
  appEntryForPath,
  isTrialHref,
  profileInitials,
  safeAvatarUrl,
  sessionUserFromPayload,
} from './signedInEntry.ts';

describe('appEntryForPath', () => {
  it('opens One from home, pricing, and the One page', () => {
    assert.equal(appEntryForPath('/').label, 'Open One');
    assert.equal(appEntryForPath('/one/').href, 'https://one.atw.net/');
    assert.equal(appEntryForPath('/pricing/').label, 'Open One');
    assert.equal(appEntryForPath('/blog/a-post/').href, 'https://one.atw.net/');
  });

  it('uses the same product hosts as the rest of the site', () => {
    assert.equal(appEntryForPath('/one/').href, `${PRODUCT.one}/`);
    assert.equal(appEntryForPath('/orbit/').href, `${PRODUCT.worksuite}/`);
    assert.equal(appEntryForPath('/hub/').href, `${PRODUCT.hub}/`);
    assert.equal(appEntryForPath('/workforce/').href, `${PRODUCT.workforce}/`);
    assert.equal(appEntryForPath('/ai/').href, `${PRODUCT.ai}/`);
    assert.equal(appEntryForPath('/systems/directory/').href, `${PRODUCT.directory}/`);
    assert.equal(appEntryForPath('/mail/').href, MAIL_WEBMAIL_INBOX);
  });

  it('opens the product the page is about', () => {
    assert.deepEqual(appEntryForPath('/orbit/'), {
      label: 'Open Orbit',
      href: 'https://orbit.atw.net/',
    });
    assert.equal(appEntryForPath('/hub/').label, 'Open Hub');
    assert.equal(appEntryForPath('/workforce/').href, 'https://workforce.atw.net/');
    assert.equal(appEntryForPath('/agents/').label, 'Open Workforce');
    assert.equal(appEntryForPath('/ai/').href, 'https://ai.atw.net/');
    assert.equal(appEntryForPath('/systems/directory/').label, 'Open Directory');
    assert.equal(appEntryForPath('/mail/').href, 'https://mail.atw.net/inbox');
  });
});

describe('trial hrefs', () => {
  it('matches same-origin trial links only', () => {
    assert.equal(isTrialHref('/trial/'), true);
    assert.equal(isTrialHref('/trial'), true);
    assert.equal(isTrialHref('https://atw.net/trial/?x=1'), true);
    assert.equal(isTrialHref('/one/'), false);
    assert.equal(isTrialHref('https://one.atw.net/trial/'), false);
  });
});

describe('profile', () => {
  it('builds initials the way ATW One does', () => {
    assert.equal(profileInitials('Kyle Gray', 'k@atw.net'), 'KG');
    assert.equal(profileInitials(null, 'ada@atw.net'), 'A');
    assert.equal(profileInitials('  ', null), 'U');
  });

  it('accepts absolute image URLs only', () => {
    assert.equal(safeAvatarUrl('https://cdn.atw.net/a.png'), 'https://cdn.atw.net/a.png');
    assert.equal(safeAvatarUrl('javascript:alert(1)'), null);
    assert.equal(safeAvatarUrl('/relative.png'), null);
  });
});

describe('session payload', () => {
  it('treats an empty NextAuth session as logged out', () => {
    assert.equal(sessionUserFromPayload({}), null);
    assert.equal(sessionUserFromPayload(null), null);
  });

  it('reads email, name, and image from a signed-in session', () => {
    assert.deepEqual(
      sessionUserFromPayload({
        user: { email: 'ada@atw.net', name: 'Ada Lovelace', image: 'https://cdn.atw.net/a.png' },
      }),
      { email: 'ada@atw.net', name: 'Ada Lovelace', image: 'https://cdn.atw.net/a.png' },
    );
  });
});
