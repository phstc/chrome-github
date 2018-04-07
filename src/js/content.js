const DIV_CONTAINER_ID = 'js-discussion-chrome-github'

const generateLinks = () => {
  let prs = []
  let issues = []
  let links = document.getElementsByTagName('a')

  const sanitizeHref = href => href.split('#')[0]
  const getNumber = href => href.split('/').pop()

  const currentIssueNumber = getNumber(sanitizeHref(window.location.href))

  if (currentIssueNumber === 'new') return

  for (let i = 0; i < links.length; i++) {
    let href = sanitizeHref(links[i].href)
    let number = getNumber(href)

    if (isNaN(number)) continue
    if (currentIssueNumber === number) continue

    if (href.match(/github.*\/pull\//i) && prs.indexOf(href) === -1) {
      prs.push(href)
    }
    if (href.match(/github.*\/issues\//i) && issues.indexOf(href) === -1) {
      issues.push(href)
    }
  }

  const itemHTML = href =>
    `<p><a href="${href}" class="issue-link js-issue-link">#${getNumber(
      href
    )}</a></p>`

  const containerHTML = (heading, hrefs) => {
    return `
    <div class="discussion-sidebar-item js-discussion-sidebar-item ${DIV_CONTAINER_ID}">
      <div class="discussion-sidebar-heading text-bold">${heading}</div>
      <span class="css-truncate">
        ${hrefs.map(href => itemHTML(href)).join('')}
      </span>
    </div>
  `
  }

  const appendHTML = html => {
    document
      .getElementsByClassName('discussion-sidebar-item')[2]
      .insertAdjacentHTML('beforebegin', html)
  }

  if (prs.length > 0) appendHTML(containerHTML('Pull requests', prs))
  if (issues.length > 0) appendHTML(containerHTML('Issues', issues))
}

if (document.getElementsByClassName(DIV_CONTAINER_ID).length === 0) {
  generateLinks()
}
