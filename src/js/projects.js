const addAssignees = () => {
  const users = {}

  ;[...document.getElementsByClassName('avatar-user')].forEach((elem) => {
    const user = elem.getAttribute('alt')
    const img = elem.getAttribute('src')

    if (users[user] === undefined) users[user] = img
  })

  const html = document.getElementsByClassName('project-header-search')[0]
    .innerHTML

  let newHTML = Object.keys(users)
    .map((user) => {
      var img = users[user]
      var url = `${
        window.location.href.split('?')[0]
      }?card_filter_query=assignee%3A${user.replace('@', '')}`

      return `<a class="mr-2" href="${url}"><img src="${img}" width="30" height="30" alt="${user}" class=" avatar-user"></a>`
    })
    .join('')

  newHTML = `<div class="pl-sm-4">${newHTML}</div>${html}`

  document.getElementsByClassName(
    'project-header-search'
  )[0].innerHTML = newHTML
}

window.addEventListener('load', () => window.setTimeout(addAssignees, 1000))
