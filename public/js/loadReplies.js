function loadReplies(storyId) {
  if ("collapse" !== document.getElementById("collapse-reply-"+storyId).className) {
    return;
  }
  var parentElement = document.getElementById("section-reply-"+storyId);
  var oldElements = document.getElementsByClassName("section-reply-detail-"+storyId);
  while(oldElements.length > 0){
    oldElements[0].parentNode.removeChild(oldElements[0]);
  }
  var loaderElement = document.createElement("div");
  loaderElement.className="text-center";
  loaderElement.innerHTML = `<div class="lds-ripple"><div></div><div></div></div>`;
  parentElement.appendChild(loaderElement);
  $.get( "story/replys", { storyId: storyId }, function( data ) {
    data.forEach((reply) => {
      var datetime = new Date(reply.datetime);
      var rowElement = document.createElement("div");
      rowElement.className = "container section-reply-detail-" + storyId;
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
