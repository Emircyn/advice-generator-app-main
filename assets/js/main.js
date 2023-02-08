let commentsApi;
const adviceTitle = document.querySelector('.advice-title');
const adviceText = document.querySelector('.advice-text');
const advice = document.querySelector('.advice');
const icon = document.querySelector('.icon');

let isLoader = false;
const fetchComments = async (funcComments) => {
  isLoader = true;
  loaderFunc(isLoader);
  await fetch('https://api.adviceslip.com/advice')
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
    adviceText.removeAttribute('id');
    adviceText.classList.remove('fade-in');
    adviceTitle.classList.remove('fade-in');
    icon.classList.add('animate-flicker');
    adviceText.classList.add('fade-out');
    adviceTitle.classList.add('fade-out');
    createSkeleton(adviceText);
    createSkeleton(adviceTitle);
    icon.style.pointerEvents = 'none';
  } else {
    adviceText.setAttribute('id', 'text');
    adviceText.classList.remove('fade-out');
    adviceTitle.classList.remove('fade-out');
    adviceText.classList.add('fade-in');
    adviceTitle.classList.add('fade-in');
  }
};
const createSkeleton = (e) => {
  e.innerHTML = '';
  e.style.width = `100%`;

  if (e.classList.contains('advice-title')) {
    const skeletonElement = document.createElement('span');
    skeletonElement.classList.add('skeleton-box');
    skeletonElement.classList.add('animate-flicker');
    skeletonElement.style.width = `${50}%`;
    e.appendChild(skeletonElement);
  } else {
    for (let i = 1; i < 4; i++) {
      const skeletonElement = document.createElement('span');
      skeletonElement.classList.add('skeleton-box');
      skeletonElement.classList.add('animate-flicker');
      skeletonElement.style.width = `${100 - i * 10}%`;
      e.appendChild(skeletonElement);
    }
  }
};

const textChange = async () => {
  const comments = await fetchComments(commentsApi);
  adviceTitle.innerHTML = `advice #${comments.slip.id}`;
  adviceText.innerHTML = `"${comments.slip.advice}"`;
  isLoader = false;
  setTimeout(() => {
    icon.removeAttribute('style');
    icon.classList.remove('animate-flicker');
  }, 5000);
  console.log(comments);
};

icon.addEventListener('click', () => {
  textChange();
});

adviceText.addEventListener('click', async () => {
  if (adviceText.id) {
    try {
      await navigator.clipboard.writeText(adviceText.textContent);

      alert('Content copied to clipboard');
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  }
});
