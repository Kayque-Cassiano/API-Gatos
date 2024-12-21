// só executa quando o html for carregado po completo
document.addEventListener('DOMContentLoaded', function () {
    // botão que vai buscar o conteudo do gato
    const button = document.getElementById("fetch-cat-button");
    // container exebir o gato
    const catContainer = document.getElementById("cat-container");
    // carregar o conteudo
    const loadinElement = document.getElementById("loading");

    async function fetchCat() {
        // removendo classe da div
        loadinElement.classList.remove("hidden");
        catContainer.innerHTML = "";

        try {

            const response = await fetch("https://api.thecatapi.com/v1/images/search");

            const data = await response.json();

            if (data.length > 0) {
                // data[0] -> Acessando a primeira posição da lista
                const catUrl = data[0].url;

                const imgElement = document.createElement("img"); // criando tag
                imgElement.src = catUrl;
                imgElement.alt = "Gato aleatório";
                imgElement.style.maxWidth = "500px";
                imgElement.style.borderRadius = "8px";

                catContainer.appendChild(imgElement);
            } else {
                catContainer.innerText = "Não foi possivel buscar o gato";
            }
            
        } catch (error) {
            catContainer.innerHTML = "Ocorreu um erro ao buscar a imagem";
        } finally { // finally -> ele passa de qualquer maneira
            loadinElement.classList.add("hidden");
        }
    }

    fetchCat();

    button.addEventListener('click', fetchCat);
})