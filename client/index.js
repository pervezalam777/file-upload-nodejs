
function SavePhoto(e) 
{
    let user = { name:'pervez', age:34 };
    let xhr = new XMLHttpRequest();
    let formData = new FormData();
    let file = e.target.files[0];      
    // validate file data before uploading...

    formData.append("user", JSON.stringify(user));   
    formData.append("file", file);
    
    xhr.onreadystatechange = state => { console.log(xhr.status); } // err handling
    xhr.open("POST", 'http://localhost:8000/fileupload');    
    xhr.send(formData);
}

document.getElementById("image-file").addEventListener("change", SavePhoto)
