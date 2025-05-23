$(document).ready(function () {
  $('#goRight').on('click', function () {
    $('#slideBox').animate({ marginLeft: '0' });
    $('.topLayer').animate({ marginLeft: '100%' });
  });

  $('#goLeft').on('click', function () {
    if (window.innerWidth > 769) {
      $('#slideBox').animate({ marginLeft: '50%' });
    } else {
      $('#slideBox').animate({ marginLeft: '20%' });
    }
    $('.topLayer').animate({ marginLeft: '0' });
  });
});

// Setup paper.js
paper.install(window);
paper.setup(document.getElementById("canvas"));

let canvasWidth, canvasHeight, canvasMiddleX, canvasMiddleY;
let shapeGroup = new Group();
let positionArray = [];

function getCanvasBounds() {
  canvasWidth = view.size.width;
  canvasHeight = view.size.height;
  canvasMiddleX = canvasWidth / 2;
  canvasMiddleY = canvasHeight / 2;

  positionArray = [
    { x: canvasMiddleX - 50 + canvasMiddleX / 2, y: 150 },
    { x: 200, y: canvasMiddleY },
    { x: canvasWidth - 130, y: canvasHeight - 75 },
    { x: 0, y: canvasMiddleY + 100 },
    { x: canvasMiddleX / 2 + 100, y: 100 },
    { x: canvasMiddleX + 80, y: canvasHeight - 50 },
    { x: canvasWidth + 60, y: canvasMiddleY - 50 },
    { x: canvasMiddleX + 100, y: canvasMiddleY + 100 },
  ];
}

function initializeShapes() {
  getCanvasBounds();

  for (let i = 0; i < shapePathData.length; i++) {
    const headerShape = new Path({
      strokeColor: 'rgba(255, 255, 255, 0.5)',
      strokeWidth: 2,
      parent: shapeGroup,
    });

    headerShape.pathData = shapePathData[i];
    headerShape.scale(2);
    headerShape.position = positionArray[i];
  }
}

initializeShapes();

view.onFrame = function (event) {
  if (event.count % 4 === 0) {
    for (let i = 0; i < shapeGroup.children.length; i++) {
      shapeGroup.children[i].rotate(i % 2 === 0 ? -0.1 : 0.1);
    }
  }
};

view.onResize = function () {
  getCanvasBounds();
  for (let i = 0; i < shapeGroup.children.length; i++) {
    shapeGroup.children[i].position = positionArray[i];
  }

  if (canvasWidth < 700) {
    shapeGroup.children[3].opacity = 0;
    shapeGroup.children[2].opacity = 0;
    shapeGroup.children[5].opacity = 0;
  } else {
    shapeGroup.children[3].opacity = 1;
    shapeGroup.children[2].opacity = 1;
    shapeGroup.children[5].opacity = 1;
  }
};
