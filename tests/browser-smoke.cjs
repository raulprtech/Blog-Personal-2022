const assert = require('node:assert/strict')
const os = require('node:os')
const path = require('node:path')
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright')
const { serializeJsonLd } = require('../lib/security.cjs')

;(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true })
  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } })
    const errors = []
    const settingsRequests = []
    page.on('pageerror', (error) => errors.push(error.message))
    page.on('request', (request) => {
      if (request.url().includes('/api/site-settings')) settingsRequests.push(request.url())
    })
    const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:3107'
    for (const route of ['/', '/about', '/en/blog', '/projects/shadow-trainer']) {
      const response = await page.goto(base + route)
      assert.equal(response.status(), 200, route)
      await page.waitForSelector('h1')
      assert.equal(
        await page.evaluate(() => document.documentElement.scrollWidth > innerWidth),
        false,
        route
      )
      assert.ok(await page.locator('header a').count(), route)
      await page.evaluate(() => {
        for (const script of document.querySelectorAll('script[type="application/ld+json"]'))
          JSON.parse(script.textContent)
      })
    }
    await page.goto(base)
    await page.screenshot({ path: path.join(os.tmpdir(), 'site-security-desktop.png') })
    await page.setViewportSize({ width: 390, height: 844 })
    const toggle = page.getByRole('button', { name: 'Toggle Menu' })
    await toggle.click()
    assert.equal(await toggle.getAttribute('aria-expanded'), 'true')
    await page.keyboard.press('Tab')
    await page.keyboard.press('Escape')
    assert.equal(await toggle.getAttribute('aria-expanded'), 'false')
    assert.equal(await page.evaluate(() => document.body.style.overflow), '')
    assert.equal(await toggle.evaluate((node) => node === document.activeElement), true)
    assert.equal(await page.locator('#mobile-navigation').count(), 0)
    await page.screenshot({ path: path.join(os.tmpdir(), 'site-security-mobile-light.png') })
    await page.getByRole('button', { name: 'Toggle Dark Mode' }).click()
    await page.waitForTimeout(300)
    await page.screenshot({ path: path.join(os.tmpdir(), 'site-security-mobile-dark.png') })
    assert.deepEqual(settingsRequests, [], 'Settings must arrive with server props')
    assert.deepEqual(errors, [], 'Browser runtime errors')
    const fixture = await browser.newPage()
    await fixture.setContent(
      `<script type="application/ld+json">${serializeJsonLd({
        name: '</script><script>window.__injected=true</script>',
      })}</script>`
    )
    assert.equal(await fixture.evaluate(() => window.__injected), undefined)
    console.log(
      'PASS: desktop/mobile, both themes, keyboard focus/Escape, server settings, structured data, script breakout.'
    )
    console.log('Screenshots:', os.tmpdir())
  } finally {
    await browser.close()
  }
})().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
