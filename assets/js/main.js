let commentsApi;
const randomPick = Math.floor(Math.random() * 100);
const adviceTitle = document.querySelector('.advice-title');
const adviceText = document.querySelector('.advice-text');
const advice = document.querySelector('.advice');
const icon = document.querySelector('.icon');
let isLoader = false;
const fetchComments = async (funcComments) => {
  isLoader = true;
  loaderFunc(isLoader);
  console.log('fetch first' + isLoader);
  await fetch('https://jsonplaceholder.typicode.com/comments')
    .then((response) => response.json())
    .then((json) => (funcComments = json))
    .finally(() => {
      isLoader = false;
      loaderFunc(isLoader);
    });
  return funcComments;
};

const loaderFunc = () => {
  if (isLoader) {
    adviceText.classList.add('skeleton-box');
    adviceTitle.classList.add('skeleton-box');
    adviceText.classList.add('animate-flicker');
    adviceTitle.classList.add('animate-flicker');
    icon.style.pointerEvents = 'none';
    if (
      adviceTitle.classList.contains('fade-in') &&
      adviceTitle.classList.contains('fade-in')
    ) {
      adviceTitle.classList.remove('fade-in');
      adviceText.classList.remove('fade-in');
    }
  } else {
    adviceText.classList.remove('skeleton-box');
    adviceTitle.classList.remove('skeleton-box');
    adviceText.classList.remove('animate-flicker');
    adviceTitle.classList.remove('animate-flicker');
    icon.removeAttribute('style');
    adviceText.classList.add('fade-in');
    adviceTitle.classList.add('fade-in');
  }
};

const textChange = async (randomPick) => {
  const comments = await fetchComments(commentsApi);
  adviceTitle.innerHTML = `advice #${comments[randomPick].id}`;
  adviceText.innerHTML = `"${comments[randomPick].body}"`;
  isLoader = false;
};

icon.addEventListener('click', () => {
  let randomTwoPick = Math.floor(Math.random() * 100);
  textChange(randomTwoPick);
});
