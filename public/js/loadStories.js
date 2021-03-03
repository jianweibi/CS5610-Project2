async function getAllData() {
  let stories = await fetch("/getStories");
  const res = await stories.json();
  return res;
}

function addSingleButton(element, hasPic, message) {
  var div = document.createElement("div");
  if (hasPic == false) {
    div.className = "col-md-2";
  } else {
    div.className = "col-md-4";
  }

  var button = document.createElement("div");
  button.className = "btn btn-icon " + message;
  var image = document.createElement("img");
  image.setAttribute("src", "../assets/img/" + message + ".png");

  button.appendChild(image);
  div.appendChild(button);
  element.appendChild(div);
}

function addButtons(element, hasPic) {
  var rowElement = document.createElement("div");
  rowElement.className = "row";

  addSingleButton(rowElement, hasPic, "like");
  addSingleButton(rowElement, hasPic, "dislike");
  addSingleButton(rowElement, hasPic, "comment");
  element.appendChild(rowElement);
}

getAllData().then((res) => {
  var element = document.getElementsByClassName(
    "separator separator-primary"
  )[0];
  res.result.forEach((story) => {
    var hasPic = false;

    var topElement = document.createElement("div");
    topElement.className = "section-story-overview";
    var secondElement = document.createElement("div");
    secondElement.className = "row";
    var thirdElement = document.createElement("div");
    if (story.imageName != null) {
      thirdElement.className = "col-md-6";
      hasPic = true;
    } else {
      thirdElement.className = "col-md-12";
    }
    var forthElement = document.createElement("h3");
    forthElement.textContent = "[" + story._id + "]";
    var author = document.createElement("h5");
    author.textContent = "by " + story.username;
    var content = document.createElement("p");
    content.textContent = story.content;

    thirdElement.appendChild(forthElement);
    thirdElement.appendChild(author);
    thirdElement.appendChild(content);

    addButtons(thirdElement, hasPic);

    secondElement.appendChild(thirdElement);
    if (hasPic) {
      var parentDiv = document.createElement("div");
      parentDiv.className = "col-md-6";
      var imageDiv = document.createElement("div");
      imageDiv.className = "image-container";
      imageDiv.setAttribute(
        "style",
        "background-image: url('" + story.imageName + "')"
      );
      parentDiv.appendChild(imageDiv);
      secondElement.appendChild(parentDiv);
    }
    topElement.appendChild(secondElement);
    element.appendChild(topElement);
  });
});
