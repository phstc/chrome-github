// https://github.com/issues?q=assignee%3Aphstc+is%3Aopen
const DIV_CONTAINER_ID = 'issues-assignees'

const generateAssignees = () => {
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
        const [user, userId] = userArr
        return `
        <a style="padding-left: 5px" class="avatar" aria-label="${user} assigned issues" href="/issues?q=assignee%3A${user}+is%3Aopen+user%3Awoodmont">
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
