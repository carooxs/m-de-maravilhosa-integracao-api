const mulheres = document.querySelector('.maravilhosas__box');

fetch('http://localhost:5001/maravilhosas')
    .then((response) => {
        return response.json();
    })
    .then((woman) => {
        console.log(woman)
        woman.content.forEach((mulher) => {
            console.log(mulher)

            let cardbox = document.createElement('div');
            cardbox.setAttribute('class', 'maravilhosas__perfil');
            mulheres.appendChild(cardbox);

            let conteudo = document.createElement('a');
            conteudo.setAttribute('href', '#');
            cardbox.appendChild(conteudo);


            let imagem = document.createElement('img');
            imagem.setAttribute('class', 'img-responsive');
            imagem.setAttribute('alt', 'Foto da personalidade');

            if (mulher.metadata == undefined || mulher.metadata.image == undefined || mulher.metadata.image.url == undefined) {
                imagem.setAttribute('src', './img/img-mulher.png');

            } else {
                imagem.setAttribute('src', mulher.metadata.image.url);
            }
            cardbox.appendChild(imagem);

            let nome_mulher = document.createElement('p');
            nome_mulher.innerHTML = mulher.title;
            cardbox.appendChild(nome_mulher);

            const botaoRemover = document.createElement('button');
            botaoRemover.setAttribute('id', mulher.id);
            botaoRemover.textContent = 'Remover';
            cardbox.appendChild(botaoRemover);

            botaoRemover.addEventListener("click", (evento) => {

                const thisCard = botaoRemover.parentElement;
                const cardPai = thisCard.parentElement;

                fetch(`http://localhost:5001/maravilhosas/${mulher.id}`, {
                        method: 'DELETE',
                        headers: {
                            "Accept": "application/json",
                            "Content-Type": "application/json"

                        },
                        body: JSON.stringify({
                            "id": botaoRemover.getAttribute("id"),
                        })
                    })
                    .then(() => {
                        cardPai.removeChild(thisCard)
                    })
                    .catch((erro) => {
                        console.log(erro)
                    })

            })
        })
    })
    .catch((erro) => {
        console.log(erro)
    })

const button = document.getElementById("botao");
button.addEventListener("click", (evento) => {
    evento.preventDefault();

    const insereNome = document.querySelector(".nome_pessoa").value;
    const EnderecoImagem = document.querySelector(".endereco_imagem").value;

    fetch('http://localhost:5001/maravilhosas', {

        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "title": insereNome,
            'metadata': {
                'image': {
                    'url': EnderecoImagem,
                }
            }
        })
    })
})