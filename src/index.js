import "./styles.css";

//追加ボタン押下時に呼び出す関数
const onClickAdd = () => {
  //textboxに入力された値を取り出す→textboxの値を初期化する
  const inputText = document.getElementById("add-text").value;
  document.getElementById("add-text").value = "";

  //未完了のTODOに要素を追加する
  addImcompleteList(inputText);
};

//未完了のtodoから要素を削除する
const deleteFromImcompleteList = (target) => {
  document.getElementById("imcomplete-list").removeChild(target);
};

//未完了のTODOに要素を追加する
const addImcompleteList = (text) => {
  //pタグを生成する
  const p = document.createElement("p");
  p.innerText = text;

  //完了ボタンを作成する
  const compButton = document.createElement("button");
  compButton.innerText = "完了";
  compButton.addEventListener("click", () => {
    //===未完了のTODOから削除する===//
    deleteFromImcompleteList(compButton.parentNode.parentNode);

    //===完了済みTODOに追加する===//
    //完了ボタンに紐づくpタグを取得する
    const compParent = compButton.parentNode;
    const p = compParent.firstElementChild;

    //元に戻すボタンを作成する
    const undoButton = document.createElement("button");
    undoButton.innerText = "元に戻す";
    undoButton.addEventListener("click", () => {
      //完了済みのTODOから削除する
      const deleteTarget = undoButton.parentNode.parentNode;
      document.getElementById("complete-list").removeChild(deleteTarget);

      //未完了のTODOに追加する
      const text = undoButton.parentNode.firstElementChild.innerText;
      addImcompleteList(text);
    });

    //divタグを作成する
    const div = document.createElement("div");
    div.className = "list-row";
    div.appendChild(p);
    div.appendChild(undoButton);

    //liタグを作成する
    const li = document.createElement("li");
    li.appendChild(div);

    //ulタグに追加する
    document.getElementById("complete-list").appendChild(li);
  });

  //削除ボタンを作成する
  const delButton = document.createElement("button");
  delButton.innerText = "削除";
  delButton.addEventListener("click", () => {
    //deleteButtonの親ノードを取得する
    deleteFromImcompleteList(delButton.parentNode.parentNode);
  });

  //divタグを生成する
  const div = document.createElement("div");
  div.className = "list-row";
  div.appendChild(p);
  div.appendChild(compButton);
  div.appendChild(delButton);

  //liタグを生成する
  const li = document.createElement("li");
  li.appendChild(div); //liの子要素にdivを配置する

  //ulの子要素にdivを配置する
  document.getElementById("imcomplete-list").appendChild(li);
};

document
  .getElementById("add-button")
  .addEventListener("click", () => onClickAdd());
