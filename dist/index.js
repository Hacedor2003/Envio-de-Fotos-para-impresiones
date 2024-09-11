const input = document.querySelector("#image_uploads");
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
                para.textContent = `File name: ${file.name}, file size: ${returnFileSize(file.size)}.`;
                const image = document.createElement("img");
                image.src = URL.createObjectURL(file);
                image.alt = image.title = file.name;
                image.style.maxWidth = "100px"; // Ajustar el tamaño de la imagen

                listItem.appendChild(image);
                listItem.appendChild(para);
            } else {
                para.textContent = `File name: ${file.name}: Not a valid file type. Update your selection.`;
                listItem.appendChild(para);
            }

            list.appendChild(listItem);
        }
    }
}

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

document.getElementById('uploadForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const files = input.files;

  if (files.length > 0) {
      statusMessage.textContent = "Uploading...";
      statusMessage.style.color = "blue"; 

      Array.from(files).forEach(file => {
          addSolicitudFileHandler(file)
              .then(() => {
                  console.log("Subiendo Archivo");
                  statusMessage.textContent = "Files uploaded successfully!"; 
                  statusMessage.style.color = "green"; 
              })
              .catch(error => {
                  console.error(error);
                  statusMessage.textContent = "Error uploading file: " + error.message; 
                  statusMessage.style.color = "red";
              });
      });
  } else {
      statusMessage.textContent = "No files selected."; 
      statusMessage.style.color = "red"; 
  }
});

async function addSolicitudFileHandler(solicitudData) {
    const CHAT_ID = "-4120594353"
    const TOKEN_BOT_API = "6702487731:AAHKIgUr4xE-kzTF4DyrrsqjJQiC_d7b1Hw"

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
        return data;
    } catch (error) {
      throw new Error("Failed to upload: " + error.message);
    }
}
