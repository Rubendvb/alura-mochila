const form = document.querySelector("#novoItem");
const lista = document.querySelector("#lista");
const itens = JSON.parse(localStorage.getItem("itens")) || [];

itens.forEach((element) => {
  criaElemento(element);
});

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = e.target.elements["nome"];
  const quantidade = e.target.elements["quantidade"];

  const existe = itens.find((element) => element.nome === nome.value);

  const itemAtual = {
    nome: name.value,
    quantidade: quantidade.value,
  };

  if (existe) {
    itemAtual.id = existe.id;

    atualizaItem(itemAtual);

    itens[itens.findIndex((element) => element.id === existe.id)] = itemAtual;
  } else {
    itemAtual.id = itens[itens.length - 1] ? itens[itens.length - 1].id + 1 : 0;

    criaElemento(itemAtual);

    itens.push(itemAtual);
  }

  localStorage.setItem("itens", JSON.stringify(itens));

  name.value = "";
  quantidade.value = "";
});

function criaElemento(item) {
  const novoItem = document.createElement("li");
  novoItem.classList.add("item");

  const numeroItem = document.createElement("strong");
  numeroItem.innerHTML = item.quantidade;
  numeroItem.dataset.id = item.id;
  novoItem.appendChild(numeroItem);
  novoItem.innerHTML += item.nome;

  novoItem.appendChild(botaoDeleta(item.id));

  lista.appendChild(novoItem);
}

function atualizaItem(item) {
  document.querySelector(`[data-id='${item.id}']`).innerHTML = item.quantidade;
}

function botaoDeleta(id) {
  const elementBotao = document.createElement("button");
  elementBotao.innerText = "X";

  elementBotao.addEventListener("click", function () {
    deletaElemento(this.parentNode, id);
  });

  return elementBotao;
}

function deletaElemento(tag, id) {
  tag.remove();

  itens.splice(
    itens.findIndex((element) => element.id === id),
    1
  );

  localStorage.setItem("itens", JSON.stringify(itens));
}
