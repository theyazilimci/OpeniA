
const cat = document.getElementById('cat-img');
const dog = document.getElementById('dog-img');

  // Load the model.

  mobilenet.load().then(model => {
    // Classify the image.
    model.classify(cat).then(predictions => {
      const className = predictions[0].className .split(',');
      let prediction = predictions[0].probability.toFixed(2) * 100 + '%';
      document.getElementById('cat').innerHTML = className[0] + ': ' + prediction;
    });

    model.classify(dog).then(predictions => {
     
      const className = predictions[0].className.split(',');

      let prediction = predictions[0].probability.toFixed(2) * 100 + '%';
      document.getElementById('dog').innerHTML = className[1] + ': ' + prediction;
    });

  });







/*
function updateImageDisplay() {
  while(preview.firstChild) {
      preview.removeChild(preview.firstChild);
    }
  
  var curFiles = input.files;
  if(curFiles.length === 0) {
      var para = document.createElement('p');
      para.textContent = 'No files currently selected for upload';
      preview.appendChild(para);
  } else {
      var list = document.createElement('ol');
      preview.appendChild(list);
      for(var i = 0; i < curFiles.length; i++) {
        var listItem = document.createElement('li');
        var para = document.createElement('p');
          if(validFileType(curFiles[i])) {
            para.textContent = 'File name ' + curFiles[i].name + ', file size ' + returnFileSize(curFiles[i].size) + '.';
            var image = document.createElement('img');
            image.src = window.URL.createObjectURL(curFiles[i]);
    
            listItem.appendChild(image);
            listItem.appendChild(para);
    
        } else {
          para.textContent = 'File name ' + curFiles[i].name + ': Not a valid file type. Update your selection.';
          listItem.appendChild(para);
        }
  
        list.appendChild(listItem);
      }
    }
  }
*/

var list = {
  filename: "",
  className1: "",
  probability1: "",
  className2: "",
  probability2: "",
  className3: "",
  probability3: "",
};

function updateImageDisplay() {
  
  var curFiles = input.files;

  var image = document.getElementById('class-image');
  image.src = window.URL.createObjectURL(curFiles[0]);
  list.filename = curFiles[0].name;

  mobilenet.load().then(model => {
    // Classify the image.
    model.classify(image).then(predictions => {
      var className = predictions[0].className;
      list.className1 = className;

      var prediction = predictions[0].probability.toFixed(2) * 100 + '%';
      document.getElementById('prediction').innerHTML = className + ': ' + prediction;
      list.probability1 = prediction;

      className = predictions[1].className;
      list.className2 = className;

      prediction = predictions[1].probability.toFixed(2) * 100 + '%';
      document.getElementById('prediction2').innerHTML = className + ': ' + prediction;
      list.probability2 = prediction;

      className = predictions[2].className;
      list.className3 = className;

      prediction = predictions[2].probability.toFixed(2) * 100 + '%';
      document.getElementById('prediction3').innerHTML = className + ': ' + prediction;
      list.probability3 = prediction;
    });

  });

  document.getElementById('prediction').style.opacity = 1;
  document.getElementById('save-prediction').style.opacity = 1;
  document.getElementById("select-image").innerHTML = "Change the image";

}

document.getElementById('prediction-text').style.opacity = 0;
document.getElementById('save-prediction').style.opacity = 0;
var input = document.querySelector('input');
input.style.opacity = 0;
input.addEventListener('change', updateImageDisplay);
  


function saveStaticDataToFile() {
  console.log(list);
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([JSON.stringify(list, null, 2)], {
    type: "text/plain"
  }));
  a.setAttribute("download", "data.json");
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

