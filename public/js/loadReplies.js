async function getAllReplies(parentId) {
  let stories = await fetch("/getReplies?parentId=" + parentId);
  const res = await stories.json();
  return res.result;
}

function renderReplies(parentElement, replies, hasPic) {
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
