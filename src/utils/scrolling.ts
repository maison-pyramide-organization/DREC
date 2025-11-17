const disableScrolling = () => {
  const $body = document.body;
  $body.classList.add("d-s");
};

const enableScrolling = () => {
  const $body = document.body;
  $body.classList.remove("d-s");
};

export { enableScrolling, disableScrolling };
