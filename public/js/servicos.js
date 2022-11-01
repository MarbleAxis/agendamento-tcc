//read
function loadTable() {
  dados.open("GET", "localhost:2020/servicos");
  dados.send();
  dados = function() {
      document.getElementById("mytable").innerHTML = trHTML;
    }
};

loadTable();

function CreateBox() {
    Swal.fire({
      title: 'Cadastro de Serviços',
      html:
        '<input id="id" type="hidden">' +
        '<input id="fname" class="swal2-input" placeholder="Nome">' +
        '<input id="descricao" class="swal2-input" placeholder="Breve descrição">' +
        '<input id="local" class="swal2-input" placeholder="Local">',
      focusConfirm: false,
      preConfirm: () => {
        userCreate();
      }
    })
}
  
//create
function userCreate() {
    const fname = document.getElementById("fname").value;
    const descricao = document.getElementById("descricao").value;
    const local = document.getElementById("local").value;
        
    const dados = new XMLHttpRequest();
    dados.open("POST", "localhost:2020/api/servicos");
    dados.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    dados.send(JSON.stringify({ 
        "fname": fname, "descricao": descricao, "local": local
    }));
    dados.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
        const objects = JSON.parse(this.responseText);
        Swal.fire(objects['message']);
        loadTable();
        }
    };
}

//edit
function showUserEditBox(id) {
    console.log(id);
    const dados = new XMLHttpRequest();
    dados.open("GET", "https://www.mecallapi.com/api/users/"+id);
    dados.send();
    dados.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        const objects = JSON.parse(this.responseText);
        const user = objects['user'];
        console.log(user);
        Swal.fire({
          title: 'Edit User',
          html:
            '<input id="id" type="hidden" value='+user['id']+'>' +
            '<input id="fname" class="swal2-input" placeholder="First" value="'+user['fname']+'">' +
            '<input id="descricao" class="swal2-input" placeholder="Last" value="'+user['descricao']+'">' +
            '<input id="local" class="swal2-input" placeholder="Username" value="'+user['local']+'">',
          focusConfirm: false,
          preConfirm: () => {
            userEdit();
          }
        })
      }
    };
}

function userEdit() {
    const id = document.getElementById("id").value;
    const fname = document.getElementById("fname").value;
    const descricao = document.getElementById("descricao").value;
    const local = document.getElementById("local").value;
      
    const dados = new XMLHttpRequest();
    dados.open("PUT", "https://www.mecallapi.com/api/users/update");
    dados.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    dados.send(JSON.stringify({ 
      "id": id, "fname": fname, "descricao": descricao, "local": local
    }));
    dados.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        const objects = JSON.parse(this.responseText);
        Swal.fire(objects['message']);
        loadTable();
      }
    };
}

//delete
function userDelete(id) {
    const dados = new XMLHttpRequest();
    dados.open("DELETE", "https://www.mecallapi.com/api/users/delete");
    dados.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    dados.send(JSON.stringify({ 
      "id": id
    }));
    dados.onreadystatechange = function() {
      if (this.readyState == 4) {
        const objects = JSON.parse(this.responseText);
        Swal.fire(objects['message']);
        loadTable();
      } 
    };
}
