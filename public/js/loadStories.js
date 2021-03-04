async function getAllData() {
  let stories = await fetch("/getStories");
  const res = await stories.json();
  return res;
}

function addSingleButton(element, story, message) {
  var div = document.createElement("div");
  if (story.hasPic == false) {
    div.className = "col-md-2";
  } else {
    div.className = "col-md-4";
  }
  if (message == "like") {
    div.innerHTML = `<div class="btn btn-icon ${message}" id="${story._id}-${message}"><img id="like" src="../assets/img/${message}.png" alt="${message}" /> </div><p>${story.like}</p>`;
  } else if (message == "dislike") {
    div.innerHTML = `<div class="btn btn-icon ${message}" id="${story._id}-${message}"><img id="dislike" src="../assets/img/${message}.png" alt="${message}" /> </div><p>${story.dislike}</p>`;
  } else {
    div.innerHTML = `<div class="btn btn-icon ${message}" id="${story._id}-${message}"><img id="comment" src="../assets/img/${message}.png" alt="${message}" /> </div>`;
  }

  if (message != "comment") {
    div.childNodes[0].addEventListener("click", function () {
      var newNumber;
      if (message == "like") {
        story.like += 1;
        newNumber = story.like;
      } else {
        story.dislike += 1;
        newNumber = story.dislike;
      }
      div.childNodes[1].textContent = newNumber;
      statusRequest(message, story._id, newNumber);
    });
  } else {
    var reply = document.createElement("div");
    reply.className = "form-reply";
    reply.innerHTML = `<form
          id="form-reply-story"
          action="reply?storyId=${story._id}"
          method="post"
          enctype="application/x-www-form-json"
        >
        <div class="form-group">
            <label for="story-content">Reply to this story</label>
            <textarea
              class="form-control"
              id="story-content"
              name="replyContent"
              placeholder="What you say?"
            ></textarea>
            <label for="story-username">Share your name</label>
            <input
              type="text"
              class="form-control"
              id="story-username"
              name="replyUsername"
              placeholder="Batman"
            />
            <button type="submit" class="btn btn-primary btn-round">
              Send
            </button>
          </div>
        </form>`;
    reply.style.display = "none";
    div.appendChild(reply);
    div.childNodes[0].addEventListener("click", function () {
      if (div.childNodes[1].style.display == "block") {
        div.childNodes[1].style.display = "none";
      } else {
        div.childNodes[1].style.display = "block";
      }
    });
  }
  element.appendChild(div);
}

function addButtons(element, story) {
  var rowElement = document.createElement("div");
  rowElement.className = "row";

  addSingleButton(rowElement, story, "like");
  addSingleButton(rowElement, story, "dislike");
  addSingleButton(rowElement, story, "comment");
  element.appendChild(rowElement);
}

getAllData().then((res) => {
  var element = document.getElementsByClassName(
    "separator separator-primary"
  )[0];
  res.result.sort((a, b) => (a.datetime > b.datetime ? -1 : 1));
  res.result.forEach(async (story) => {
    var hasPic = false;

    var topElement = document.createElement("div");
    topElement.className = "section-story-overview";
    topElement.id = story._id;
    var secondElement = document.createElement("div");
    secondElement.className = "row";
    var thirdElement = document.createElement("div");
    if (story.imageName != null) {
      thirdElement.className = "col-md-6";
      hasPic = true;
    } else {
      thirdElement.className = "col-md-12";
    }
    story.hasPic = hasPic;
    thirdElement.innerHTML = `<h3>[${story._id}]</h3><h5>by ${story.username}</h5><p>${story.content}</p>`;

    addButtons(thirdElement, story);

    secondElement.appendChild(thirdElement);
    if (hasPic) {
      var parentDiv = document.createElement("div");
      parentDiv.className = "col-md-6";
      parentDiv.innerHTML = `<div class="image-container" style="background-image: url('${story.imageName}')"></div>`;

      secondElement.appendChild(parentDiv);
    }
    topElement.appendChild(secondElement);
    element.appendChild(topElement);

    const replies = await getAllReplies(story._id);
    renderReplies(topElement, replies, hasPic);
  });
});
