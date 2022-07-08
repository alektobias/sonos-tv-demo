/*
 * Copyright (c) 2020 LG Electronics Inc.
 * SPDX-License-Identifier: CC0-1.0
 */
var assetId = {
  Anderson: "1302975868182205415",
  F1: "1302975868182204852",
  Gameday: "1302975868182204850",
  Reuters: "1302975868182205413",
};
var videoUrl = {
  Anderson: "https://whim-snippet.s3.amazonaws.com/Anderson+Cooper+2022_TV.mp4",
  Reuters: "https://whim-snippet.s3.amazonaws.com/Reuters2022.mp4",
  F1: "https://whim-snippet.s3.amazonaws.com/f12022_TV.mp4",
  Gameday: "https://whim-snippet.s3.amazonaws.com/g.mp4",
};
var lastClickedId = null;
var itemArray = document.getElementsByClassName("item");
var inputs = document.getElementsByTagName("input");

function closeModal() {
  var modal_id = localStorage.getItem("openModal");
  var modal = document.getElementById(modal_id);
  if (!modal_id.match("settings")) {
    var modalContent = document.getElementById("modal-content");
    modalContent.innerText = "";
  }
  modal.style.display = "none";
}

function createVideo(url) {
  var modalContent = document.getElementById("modal-content");
  var videoComponent = document.createElement("video");
  var videoSource = document.createElement("source");
  videoComponent.onended = closeModal;
  videoComponent.id = "video-component";
  videoSource.id = "video-source";
  videoSource.type = "video/mp4";
  videoSource.src = url;

  videoComponent.appendChild(videoSource);
  modalContent.appendChild(videoComponent);
  videoComponent.play();
}

function openModal(modal_id, video_id) {
  localStorage.setItem("openModal", modal_id);
  var modal = document.getElementById(modal_id);
  modal.style.display = "-webkit-flex";

  // "./src/videos/" + video_id + "_TV.mov"
  if (video_id) createVideo(videoUrl[video_id]);
}
async function signIn(email, password) {
  try {
    const data = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      console.log(res);
      if (res.status !== 200) throw new Error("something went wrong");
      const token = res.headers.get("x-auth-token");
      localStorage.setItem("TOKEN", token);
      //   for (var pair of res.headers.entries()) {
      //     console.log(pair[0]+ ': '+ pair[1]);
      //  }
      return res;
    });

    const jsonData = await data.json();
    localStorage.setItem("USER", JSON.stringify(jsonData));

    var authMessage = document.getElementById("auth-message");
    authMessage.innerText = "User Authenticated";
    authMessage.style.color = "olivedrab";
    setTimeout(() => closeModal("auth"), 350);
  } catch (err) {
    console.log(err);
    return (document.getElementById("auth-message").innerText =
      "Something went wrong!");
  }
}

async function showCommand(assetIds) {
  const token = localStorage.getItem("TOKEN");
  const deviceId = localStorage.getItem("canvas-id");
  fetch("/api/show/asset", {
    method: "POST",
    body: JSON.stringify([
      {
        deviceId,
        assetIds,
      },
    ]),
    headers: {
      "Content-Type": "application/json",
      "X-Auth-Token": token,
    },
  });
}

function _onClickEvent(e) {
  if (lastClickedId) {
    var element = document.getElementById(lastClickedId);
    element.classList.remove("clicked");
  }
  document.getElementById(e.target.id).classList.add("clicked");

  lastClickedId = e.target.id;
  const token = localStorage.getItem("TOKEN");

  if (!token) return openModal("auth");

  const canvasId = localStorage.getItem("canvas-id");

  if (!canvasId) return openModal("canvas");
  if(!!lastClickedId.match("settings")) return openModal(lastClickedId.split("-")[1])
  var selectedAsset = assetId[lastClickedId];
  if (!!selectedAsset) {
    showCommand([selectedAsset]);
  }
  openModal("modal", lastClickedId);

  // sendToCanvas(lastClickedId);
}

function _onMouseOverEvent(e) {
  for (var i = 0; i < itemArray.length; i++) {
    itemArray[i].blur();
  }
  document.getElementById(e.target.id).focus();
}
function addEventListeners() {
  for (var i = 0; i < itemArray.length; i++) {
    itemArray[i].addEventListener("mouseover", _onMouseOverEvent);
    itemArray[i].addEventListener("click", function (e) {
      var elementId = e.target.id;
      switch (elementId) {
        case "settings-auth":
          openModal("auth");
          break;
        case "settings-canvas":
          openModal("canvas");
          break;
        default:
          _onClickEvent(e);
          break;
      }
    });
    itemArray[i].addEventListener("keydown", function (e) {
      if (e.keyCode === 13) {
        _onClickEvent(e);
      }
    });
  }

  document.getElementById("auth-form").addEventListener("submit", function (e) {
    e.preventDefault();
    var email = localStorage.getItem("email");
    var password = localStorage.getItem("password");
    signIn(email, password);
  });

  window.addEventListener("keydown", function (inEvent) {
    if (window.event) {
      keycode = inEvent.keyCode;
    } else if (e.which) {
      keycode = inEvent.which;
    }
    switch (keycode) {
      case 461:
        closeModal();
        break;
      default:
        break;
    }
  });
  for (var i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener("change", function (e) {
      localStorage.setItem(e.target.id, e.target.value);
    });
  }
}

(function init() {
  window.addEventListener("load", function () {
    SpatialNavigation.init();
    SpatialNavigation.add({
      selector: ".focusable",
    });
    SpatialNavigation.makeFocusable();
    addEventListeners();
  });
})();
