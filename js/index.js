let sectionUl = document.querySelector('section ul')
let classNone = document.querySelectorAll('.none')
let nav = document.querySelector('nav')
const divCarrinhovazio = document.getElementById('carrinho_vazio')
let asideulCarrinho = classNone[0]
const butaoPesquita = document.getElementById('pesquisa')

let carrinho = []

publicaProdutos(data,sectionUl)

function publicaProdutos (produtos,local){
    local.innerHTML=''
    for (let i=0;i<produtos.length;i++){
        let produto = produtos[i]
        let card = ''
        if (local==sectionUl){
            card = cardProdutossection(produto)
        }
        else{
            card = cardProdutosaside(produto)
        }
        local.appendChild(card)
    }
}

function tagProduto(arrtag){
    let tagDivtag = document.createElement('div')
    tagDivtag.classList.add('tag')
    for (let i=0;i<arrtag.length;i++){
        let tag = arrtag[i]
        let tagSpantag = document.createElement('span')
        tagSpantag.innerText = tag
        tagDivtag.appendChild(tagSpantag)
    }
    return tagDivtag
}

function cardProdutossection (produto){
    let id = produto.id
    let img = produto.img
    let nome = produto.nameItem
    let descricao = produto.description
    let valor = produto.value
    let botao = produto.addCart

    let tagLi = document.createElement('li')
    let tagFigure = document.createElement('figure')
    let tagImg = document.createElement('img')
    tagImg.src = img
    tagImg.alt = nome
    let tagDivtexto = document.createElement('div')
    tagDivtexto.classList.add('texto')
    let tagH1 = document.createElement('h1')
    tagH1.innerText = nome
    let tagP = document.createElement('p')
    tagP.innerText = descricao
    let tagSpan = document.createElement('span')
    tagSpan.innerText = `R$ ${valor}`.replace('.',',')
    let tagBotao = document.createElement('button')
    tagBotao.innerText = botao
    tagBotao.id = id

    tagFigure.appendChild(tagImg)
    tagLi.appendChild(tagFigure)
    tagDivtexto.appendChild(tagProduto(produto.tag))
    tagDivtexto.appendChild(tagH1)
    tagDivtexto.appendChild(tagP)
    tagDivtexto.appendChild(tagSpan)
    tagDivtexto.appendChild(tagBotao)
    tagLi.appendChild(tagDivtexto)

    return tagLi
}

function cardProdutosaside (produto){
    let id = produto.id
    let img = produto.img
    let nome = produto.nameItem
    let valor = produto.value
    let botao = 'Remover produto'

    let tagLi = document.createElement('li')
    let tagFigure = document.createElement('figure')
    let tagImg = document.createElement('img')
    tagImg.src = img
    tagImg.alt = nome
    let tagDivtexto = document.createElement('div')
    tagDivtexto.classList.add('texto')
    let tagH1 = document.createElement('h2')
    tagH1.innerText = nome
    let tagSpan = document.createElement('span')
    tagSpan.innerText = `R$ ${valor}`.replace('.',',')
    let tagBotao = document.createElement('button')
    tagBotao.innerText = botao
    tagBotao.id = id

    tagFigure.appendChild(tagImg)
    tagLi.appendChild(tagFigure)
    tagDivtexto.appendChild(tagH1)
    tagDivtexto.appendChild(tagSpan)
    tagDivtexto.appendChild(tagBotao)
    tagLi.appendChild(tagDivtexto)

    return tagLi
}

function adicionarCarrinho(arrayid){
    for (let i=0;i<data.length;i++){
        for (let j=0;j<arrayid.length;j++){
            if (arrayid[j]==data[i].id){
                carrinho.push(data[i])
                let ulCarrinho = preparaCarrinho()
                publicaProdutos(carrinho,ulCarrinho)
                infoCarrinho(carrinho)
            }
        }
    }
}
   
function removeCarrinho(arrayid){
    for (let i=0;i<data.length;i++){
        for (let j=0;j<arrayid.length;j++){
            if (arrayid[j]==data[i].id){
                carrinho.splice(carrinho.indexOf(data[i]),1)
                let ulCarrinho = preparaCarrinho()
                if (carrinho.length==0){
                    ulCarrinho.parentElement.appendChild(divCarrinhovazio)
                    classNone[0].classList.add('none')
                    classNone[1].classList.add('none')
                }
                else{
                publicaProdutos(carrinho,ulCarrinho)
                infoCarrinho(carrinho)
                }
            }
        }
    }
}

function preparaCarrinho(){
    divCarrinhovazio.remove()
    classNone[0].classList.remove('none')
    classNone[1].classList.remove('none')
    return classNone[0]
}

function infoCarrinho(produtos){
    let soma = 0
    for (let i=0;i<produtos.length;i++){
        soma = soma + produtos[i].value
    }
    let informacoes = document.querySelectorAll('.fim_dir')
    informacoes[0].innerText = produtos.length
    informacoes[1].innerText = `R$ ${soma}`.replace('.',',')
}

sectionUl.addEventListener('click',function(objeto){
    if(objeto.target.nodeName == 'BUTTON'){
        let idsCarrinho = []
        idsCarrinho.push(objeto.target.id)
        adicionarCarrinho(idsCarrinho)
    }
})

asideulCarrinho.addEventListener('click',function(objeto){
    if(objeto.target.nodeName == 'BUTTON'){
        let idsCarrinho = []
        idsCarrinho.push(objeto.target.id)
        removeCarrinho(idsCarrinho)
    }
})

nav.addEventListener('click',function(objeto){
    let ativo = document.querySelector('.ativo')
    if (ativo!=undefined){
        ativo.classList.remove('ativo')
    }
    objeto.target.classList.add('ativo')
    let produtos = []
    if(objeto.target.nodeName == 'LI'){
        if(objeto.target.innerText == 'Todos'){
            publicaProdutos(data,sectionUl)
        }
        else{
            for(let i=0;i<data.length;i++){
                let tag = data[i].tag
                for (let j=0;j<tag.length;j++){
                    if(tag[j] == objeto.target.innerText){
                        produtos.push(data[i])
                    }
                }
            }
            publicaProdutos(produtos,sectionUl)
        }
    }
})

butaoPesquita.addEventListener('click',function(objeto){
    let busca = []
    let valorBusca = objeto.target.parentElement.children[0].value.toUpperCase()
    for (let i=0;i<data.length;i++){
        let nome = data[i].nameItem
        if (valorBusca == nome.toUpperCase()){
            busca.push(data[i])
        }
    }
    publicaProdutos(busca,sectionUl)
})