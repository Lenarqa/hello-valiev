export function setUsersItemHeight(text: string, info: string, status: string) {
  const heights = document.getElementsByClassName(`${text}`);

  const infoObjs = document.getElementsByClassName(
    `${info}`
  ) as HTMLCollectionOf<HTMLElement>;
  const statusWrapperObjs = document.getElementsByClassName(
    `${status}`
  ) as HTMLCollectionOf<HTMLElement>;

  for (let i = 0; i < heights.length; i++) {
    infoObjs[i].style.height = `${heights[i].clientHeight}px`;
    statusWrapperObjs[i].style.height = `${heights[i].clientHeight}px`;
  }
}
