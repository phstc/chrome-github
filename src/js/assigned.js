// https://github.com/issues?q=assignee%3Aphstc+is%3Aopen
const DIV_CONTAINER_ID = 'issues-assignees'

const getCurrentAssignee = () => {
  let currentAssignee = document.getElementsByName('q')[1]
  currentAssignee = currentAssignee && currentAssignee.value
  currentAssignee = currentAssignee && currentAssignee.split('assignee:')[1]
  currentAssignee = currentAssignee && currentAssignee.split(' ')[0]
  currentAssignee = currentAssignee && currentAssignee.trim()
  return currentAssignee
}

const highlightIssues = () => {
  // Do not highlight empty state
  if (document.getElementsByClassName('blankslate-icon').length === 1) {
    return
  }

  const closed = Array.from(
    document.getElementsByClassName('octicon-issue-closed')
  )

  closed.forEach(elem => {
    elem.parentElement.parentElement.parentElement.style['background-color'] =
      '#fff7fa'
  })

  const opened = Array.from(
    document.getElementsByClassName('octicon-issue-opened')
  )

  opened.forEach(elem => {
    elem.parentElement.parentElement.parentElement.style['background-color'] =
      '#f7fff8'
  })
}

const generateAssignees = () => {
  highlightIssues()

  users = [
    ['phstc', 105652],
    ['ablythe', 6164745],
    ['andrewaguiar', 141706],
    ['buccolo', 276707],
    ['devilcoders', 29921],
    ['eating247', 17789648],
    ['huoxito', 245662],
    ['JDutil', 25104],
    ['reinaldob', 101831],
    ['WesKetch', 2319279]
  ]

  const assignees = () => {
    return users
      .map(userArr => {
        const threeDaysAgo = new Date()
        threeDaysAgo.setDate(threeDaysAgo.getDate() - 5)
        const year = threeDaysAgo.getFullYear()
        const month = `0${threeDaysAgo.getMonth() + 1}`.slice(-2)
        const day = `0${threeDaysAgo.getDate()}`.slice(-2)
        const [user, userId] = userArr
        const url = `/issues?q=assignee%3A${user}+user%3Awoodmont+is%3Aissue+updated%3A>${year}-${month}-${day}+sort%3Aupdated-desc`
        const style =
          user === getCurrentAssignee()
            ? 'border-color: #0366d6;border-style: solid;'
            : ''
        return `
        <a style="line-height: 0; ${style}" class="avatar" aria-label="${user} assigned issues" href="${url}">
          <img class="from-avatar" src="https://avatars3.githubusercontent.com/u/${userId}?s=60&amp;v=4" width="30" height="30" alt="@${user}">
        </a>
    `
      })
      .join('')
  }

  const html = `
<div class="subnav issues-assignees" data-pjax="">
  <div class="subnav-links float-left" role="navigation">
  ${assignees()}
  </div>
</div>
`

  const target = document.getElementsByClassName('subnav')[0]
  target && target.insertAdjacentHTML('beforebegin', html)
}

const loadAssignees = () => {
  if (document.getElementsByClassName(DIV_CONTAINER_ID).length === 0) {
    generateAssignees()
  }
}

loadAssignees()

document.addEventListener('pjax:complete', loadAssignees)
