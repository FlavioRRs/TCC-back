const puppeteer = require('puppeteer');

async function getContent(url) {
  const navegador = await puppeteer.launch({headless: "new"})
  const pagina = await navegador.newPage()

  await pagina.goto(url)

  const htmlContent = await pagina.content()

  const cssContent = await pagina.evaluate(() => {
    const styleTags = Array.from(document.querySelectorAll('style'))
    return styleTags.map(tag => tag.textContent).join('\n')
  })

  const jsContent = await pagina.evaluate(() => {
    const scripts = Array.from(document.querySelectorAll('script'))
    return (scripts.map(tag => tag.textContent).join('\n'))
  })

  await navegador.close();

  return {htmlContent, cssContent, jsContent}
}

module.exports = getContent