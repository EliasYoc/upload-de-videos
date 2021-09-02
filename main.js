const d = document;
const $inputFile = d.getElementById("input-file");
const $preview = d.getElementById("preview");

d.addEventListener("change", (e) => {
  if (e.target === $inputFile) {
    console.log(e);
    Array.from(e.target.files).forEach((file) => {
      console.log("arriba d funct upload", file);
      uploadFile(file);
      console.log("abajo d funct upload");
    });
  }
});
const MB = 1_048_576;

const uploadFile = (file) => {
  const $article = d.createElement("article");
  $preview.insertAdjacentElement("afterbegin", $article);
  $article.className = "card-upload";
  const $video = d.createElement("video");
  $video.className = "card__video";
  $video.controls = true;
  $video.src = URL.createObjectURL(file); //para previsualizar video mientras carga pero consume
  $article.insertAdjacentElement("beforebegin", $video);
  const size = file.size;

  const name = file.name.substring(0, 20);
  const reader = new FileReader();
  reader.readAsDataURL(file);
  console.log("dentro upload", reader);
  reader.addEventListener("progress", (e) => {
    const percentageNum = parseInt((e.loaded * 100) / e.total);
    const bytesUploading = (e.loaded * size) / e.total;
    const mbUploading = bytesUploading / MB;
    $article.innerHTML = `
    <span class="card__loading">${
      e.loaded === e.total ? "loaded" : "Loading"
    } ${mbUploading.toFixed(2)}Mb</span>
    <p class="card__title">${name}... </p>
    <progress value="${percentageNum}" max="100"></progress>
`;

    // console.log(reader.readyState);
    // console.log("dentro reader progress", e); //se ejecuta al final
  });
  reader.addEventListener("loadend", (e) => {
    URL.revokeObjectURL(file);
  });
};
