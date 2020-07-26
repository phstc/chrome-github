function addAssignees() {
  var users = {}

  ;[...document.getElementsByClassName('avatar-user')].forEach((elem) => {
    var user = elem.getAttribute('alt')
    var img = elem.getAttribute('src')

    if (users[user] === undefined) users[user] = img
  })

  var html = document.getElementsByClassName('project-header-search')[0]
    .innerHTML

  var newHTML = Object.keys(users)
    .map((user) => {
      var img = users[user]
      var url = `${
        window.location.href.split('?')[0]
      }?card_filter_query=assignee%3A${user.replace('@', '')}`

      return `<a class="mr-2" href="${url}"><img src="${img}" width="30" height="30" alt="${user}" class=" avatar-user"></a>`
    })
    .join('')

  document.getElementsByClassName('project-header-search')[0].innerHTML =
    newHTML + html
}

window.addEventListener('load', function () {
  window.setTimeout(addAssignees, 1000)
})
