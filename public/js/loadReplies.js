function loadReplies(storyId) {
  $.get( "story/replys", { storyId: storyId }, function( data ) {
    var elements = document.getElementsByClassName("section-reply-detail");
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
    var parentElement = document.getElementById("section-reply-"+storyId);
    data.forEach((reply) => {
      var datetime = new Date(reply.datetime);
      var rowElement = document.createElement("div");
      rowElement.className = "container section-reply-detail";
      rowElement.innerHTML = `
      <blockquote class="blockquote">
        <p class="mb-0">${reply.content}</p>
        <footer class="blockquote-footer">@${reply.username} <cite title="Source Title">${datetime}</cite></footer>
      </blockquote>`;
      parentElement.appendChild(rowElement);
    });
  });
}

async function getAllReplies(parentId) {
  let stories = await fetch("/getReplies?parentId=" + parentId);
  const res = await stories.json();
  return res.result;
}

function renderReplies(parentElement, replies, hasPic) {
  replies.sort((a, b) => (a.datetime > b.datetime ? -1 : 1));
  replies.forEach((reply) => {
    var rowElement = document.createElement("div");
    rowElement.className = "row";
    var width;
    if (hasPic == false) {
      width = "col-md-12";
    } else {
      width = "col-md-6";
    }
    rowElement.innerHTML = `<div class="${width}">
                <h5>${reply.username} said:</h5>
                <p>
                  ${reply.replyContent}
                </p>
              </div>`;
    parentElement.appendChild(rowElement);
  });
}
