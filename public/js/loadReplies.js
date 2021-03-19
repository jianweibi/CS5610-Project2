/* eslint-disable no-unused-vars */
/**
 * Load replies of a given story ID.
 * @param {string} storyId The parent story ID.
 */
function loadReplies(storyId) {
  /* eslint-enable no-unused-vars */
  if (
    'collapse' !==
    document.getElementById('collapse-reply-' + storyId).className
  ) {
    return;
  }
  const parentElement = document.getElementById('section-reply-' + storyId);
  const oldElements = document.getElementsByClassName(
    'section-reply-detail-' + storyId
  );
  while (oldElements.length > 0) {
    oldElements[0].parentNode.removeChild(oldElements[0]);
  }
  const loaderElement = document.createElement('div');
  loaderElement.className = 'text-center';
  loaderElement.innerHTML = `<div class="lds-ripple"><div></div><div></div></div>`;
  parentElement.appendChild(loaderElement);
  $.get('story/replys', {storyId: storyId}, function (data) {
    data.forEach(reply => {
      const datetime = new Date(reply.datetime);
      const rowElement = document.createElement('div');
      rowElement.className = 'container section-reply-detail-' + storyId;
      rowElement.innerHTML = `
      <blockquote class="blockquote">
        <p class="mb-0">${reply.content}</p>
        <footer class="blockquote-footer">@${reply.username} <cite title="Source Title">${datetime}</cite></footer>
      </blockquote>`;
      parentElement.appendChild(rowElement);
    });
    parentElement.removeChild(loaderElement);
  });
}

