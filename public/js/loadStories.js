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
  div.innerHTML = `<div class="btn btn-icon ${message}"><img src="../assets/img/${message}.png" alt="${message}" /> </div>`;

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
    thirdElement.innerHTML = `<h3>[${story._id}]</h3><h5>by ${story.username}</h5><p>${story.content}</p>`;

    addButtons(thirdElement, hasPic);

    secondElement.appendChild(thirdElement);
    if (hasPic) {
      var parentDiv = document.createElement("div");
      parentDiv.className = "col-md-6";
      parentDiv.innerHTML = `<div class="image-container" style="background-image: url('${story.imageName}')"></div>`;

      secondElement.appendChild(parentDiv);
    }
    topElement.appendChild(secondElement);
    element.appendChild(topElement);
  });
});
