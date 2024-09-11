const input = document.querySelector("#file_uploads");
const preview = document.querySelector(".preview");
const statusMessage = document.getElementById("statusMessage");

input.style.opacity = 0;

input.addEventListener("change", updateFileDisplay);

function updateFileDisplay() {
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
            para.textContent = `File name: ${file.name}, file size: ${returnFileSize(file.size)}.`;
            listItem.appendChild(para);
            list.appendChild(listItem);
        }
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
    const CHAT_ID = "-4120594353"; 
    const TOKEN_BOT_API = "6702487731:AAHKIgUr4xE-kzTF4DyrrsqjJQiC_d7b1Hw"; 

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

function returnFileSize(number) {
    if (number < 1e3) {
        return `${number} bytes`;
    } else if (number >= 1e3 && number < 1e6) {
        return `${(number / 1e3).toFixed(1)} KB`;
    } else {
        return `${(number / 1e6).toFixed(1)} MB`;
    }
}
