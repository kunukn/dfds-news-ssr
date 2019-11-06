let addCSS = (url, id) => {
  let head = document.getElementsByTagName('head')[0]
  let link = document.createElement('link')
  link.id = id
  link.rel = 'stylesheet'
  link.type = 'text/css'
  link.href = url
  link.media = 'all'
  head.appendChild(link)
}

export default addCSS
