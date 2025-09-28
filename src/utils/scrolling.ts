  const disableScrolling = () => {
    const $body = document.body
    $body.classList.add('ds')
}

  const enableScrolling = () => {
    const $body = document.body
    $body.classList.remove('ds')
}

export {enableScrolling, disableScrolling}