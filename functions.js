n = 0; // número de variaveis, vai ser definido e usado por quase todas as funcoes
step = false;
//             DEFININDO QUANTIDADE DE VARIAVEIS E CRIANDO ARRAY'S            //

function define_variaveis(){
  n = document.getElementById('variaveis').value;
  minitermos = [];
  dont_cares = [];
  array_prime_implicants = [];

  document.getElementById('saida').innerHTML = ""; 
  document.getElementById('saida_dont').innerHTML = "";
  limpar_tela();
}

function limpar_tela(){
  
  document.getElementById('tabela').innerHTML = ""; 
  //CSS 
  document.getElementById('tabela').style.display = 'none';
  document.getElementById('expressao').style.display = 'none';
  document.getElementById('expressao_final').style.display = 'none';
  document.getElementById('step').style.display = 'none';

  step = false;
}


function step_by_step(){
  step = true;
  document.getElementById('step').style.display = 'block';
  simplificacao();
}
////////////////////////////////////////////////////
//            ADICIONANDO UM MINITERMO           //

function add_minitermo(){
  if ((window.event ? event.keyCode : event.which) == 13) {
    erro = document.getElementById('error');
    min = document.getElementById('minitermo').value;

    if ((n > 0) && (min != "") && (minitermos.includes(min) == false) && (dont_cares.includes(min) == false) && (min < 2**n)){

      minitermos.push(min);
      
      saida = document.getElementById('saida');
      var botao = '<button class="btn btn-second m-2" type="button" data-toggle="collapse" id="'+min+'" onClick="excluir_minitermo(this.id)">';
      botao += min;
      botao += '<i class="bi bi-x ml-3 mt-0" width="0.5" height="0.5"></i></button>';

      saida.innerHTML += botao;
      
      erro.innerHTML = "";
    }else if (n == 0){
      erro.innerHTML = "Não é possível adicionar um minitermo sem antes definir a quantidade de variaveis ";  
    }else if (minitermos.includes(min) == true){
      erro.innerHTML = "Esse termo já existe";
    }else if (dont_cares.includes(min) == true){
      erro.innerHTML = "Não é possível um don't ser minitermo ao mesmo tempo! ";
    }else if (min >= 2**n){
      erro.innerHTML = "Esse número extende a faixa de representação, digite um número menor";
    }

    limpar_tela();
    //simplificacao();
  
  }
  

  
}

////////////////////////////////////////////////////
//             EXCLUINDO UM MINITERMO            //

function excluir_minitermo(id){

  min = id;

  if ((min != "") && (minitermos.includes(min) == true)){

    minitermos.splice(minitermos.indexOf(min), 1);

    document.getElementById(min).remove();

    limpar_tela();
   
  }
  //simplificacao();
}

///////////////////////////////////////////////////
//            ADICIONANDO UM DONT CARE           //

function add_dont_care(){

  if ((window.event ? event.keyCode : event.which) == 13) {
    erro = document.getElementById('error');
    dont = document.getElementById('dontcare').value;

    if ((n > 0) && (dont != "") && (dont_cares.includes(dont) == false) && (minitermos.includes(dont) == false) && (dont < 2**n)){

      dont_cares.push(dont);

      saida = document.getElementById('saida_dont');
      var botao = '<button class="btn btn-second m-2" type="button" data-toggle="collapse" id="'+dont+'" onClick="excluir_dont_care(this.id)">';
      botao += dont;
      botao += '<i class="bi bi-x ml-3 mt-0" width="0.5" height="0.5"></i></button>';
      saida.innerHTML += botao;
      erro.innerHTML = "";

    }else if (n == 0){
      erro.innerHTML = "Não é possível adicionar um don't care sem antes definir a quantidade de variaveis ";  
    }else if (dont_cares.includes(dont) == true){
      erro.innerHTML = "Esse termo já existe";
    }else if (minitermos.includes(dont) == true){
      erro.innerHTML = "Não é possível um minitermo ser don't care ao mesmo tempo! ";
    }else if (dont >= 2**n){
      erro.innerHTML = "Esse número extende a faixa de representação, digite um número menor";
    }
    
    limpar_tela();
    //simplificacao();  
  }
  
}

////////////////////////////////////////////////////

//             EXCLUINDO UM DONT CARE            //

function excluir_dont_care(id){

  dont = id;

  if ((dont != "") && (dont_cares.includes(dont) == true)){

    dont_cares.splice(dont_cares.indexOf(dont), 1);

    document.getElementById(dont).remove();

    //CSS
    limpar_tela();
    //simplificacao();

  }

}

////////////////////////////////////////////////////

// TRANSFORMACAO BINARIO EM LITERAL STRING

function bin_literal(numero,n){
  
  letras = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
  lista_numero = (numero).split('');
  num_convertido = [];

  for (var i = 0; i < n; i++){
    barrado = "'";
    if (lista_numero[i] != "-"){
      if (lista_numero[i] == '1'){
        barrado = '';
      }
      num_convertido.push(barrado+letras[i]);
    }
      
  }
  return (num_convertido).join("");
}


////////////////////////////////////////////

// CONFERIR SE STRING SE REPETE     

function str_unica(texto){

  lista_texto = (texto).split(',');
  array_verifica = [];
  repetido = 0;
  achei = false;
  for (var i = 0; i < (lista_texto).length; i++){

    verifica_in_array = array_verifica.includes(lista_texto[i]);
    
    if (verifica_in_array == false){
      array_verifica.push(lista_texto[i]);
    }else{
      repetido += 1;
      if (repetido > 0){
        achei = true;
      }
    }

  }
  return achei;
}
//////////////////////////

// FUNÇÃO EXTRAIDA DE UM SITE ONLINE https://www.alura.com.br/artigos/ordenacao-de-numeros-no-javascript-nao-funciona

// usada para resolver esse problema: [1,2,11,3,5,0]  ->  [11,0,1,2,3,5]
// Esta sendo chamada na funcao num_ordenados()

function comparaNumeros(a,b) { if (a == b) return 0; if (a < b) return -1; if (a > b) return 1; } 


//////////////////////////

// ORDENAR NUMEROS    

function num_ordenados(sequencia){

  ordenados = sequencia.split(',').map(Number);
  ordenados.sort(comparaNumeros);

  return ordenados.map(String).join(",");
}

///////////////////////////////////////////

// CONFERIR SE DOIS ARRAYS SÃO IGUAIS  

function arrays_iguais(a,b){
  iguais = false;
  qtd_iguais = 0;
  for(i=0; i<a.length;i++){
    for(j=0;j<b.length;j++){
      if(a[i] == b[j]){
        qtd_iguais += 1;
      }
    }
  }
  if ((qtd_iguais == a.length) || (qtd_iguais == b.length)){
    iguais = true;
  }
  return iguais;
}

///////////////////////////////////////////

/////       GERAR CALCULO ALGEBRA     ////

function gerar_calculo_algebra(caminho){

  var algebra = '';
  grupos = caminho.length/2;
  array_merge = [];
  /*while (grupos > 0){
    if (array_merge.length === 0){*/
      for (i = 0; i < caminho.length; i++){
        num_bin = Number(caminho[i]).toString(2).padStart(n, 0);

        algebra += ' ' + bin_literal(num_bin,n) + ' +';
        if (caminho.length == 1){
          algebra = algebra.slice(0, -1);  
        }
        else if (i%2 != 0){
          algebra = algebra.slice(0, -1);
          merge = [];
          num_bin_1 = Number(caminho[i-1]).toString(2).padStart(n, 0);

          for(l = 0; l < n; l++){
            if (num_bin_1[l] == num_bin[l]){
              merge.push(num_bin[l]);
            }else{
              merge.push('-');
            }
          }
          array_merge.push(merge);
          algebra += '<br>' + bin_literal(merge.join(''),n) + '<br>';
        }
      }

    /*}else{
      if(array_merge.length%2 == 0){
        for (i = 0; i < array_merge.length; i++){

          algebra += ' ' + bin_literal(array_merge[i],n) + ' +';

          if (i%2 != 0){
            algebra = algebra.slice(0, -1);
            merge = []; 

            for(l = 0; l < n; l++){
              if (array_merge[i][l] == array_merge[i-1][l]){
                merge.push(array_merge[i]);
              }else{
                merge.push('-');
              }
            }
            array_merge.push(merge);
            algebra += '<br>' + bin_literal(merge.join(''),n) + '<br>';
          }
        }
      }
    }
    grupos-=1;
  }
  document.getElementById('algebra_modal').innerHTML = algebra;*/
  return algebra;
}

//////////////////////////////////////////////
/////      SELECIONAR PRIME IMPLICANTS    ////

function prime_implicants(){
  //alert('to entrando nos prime gata');
  if((minitermos.length != 0 && dont_cares.length != 0) || minitermos.length != 0){
    letras = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    expressao_html = document.getElementById("expressao_final");
    var expressao_algebrica = 'F(';

    for(j = 0; j < n; j++){
      expressao_algebrica += letras[j] + ',';
    }
    expressao_algebrica = expressao_algebrica.slice(0, -1);
    expressao_algebrica += ') = ';
   
    inseridos = [];

    termos_unicos = [];
    termos_unicos = termos_unicos.concat(minitermos);
    var i = termos_unicos.length -1;

    while (i >= 0){
      termo = termos_unicos[i];
      repeticao = 0;

      for (j = 0; j < array_prime_implicants.length; j++){
        if (j%2 == 0){
          array_pi = array_prime_implicants[j];

          for(k=0 ;k <array_pi.length; k++){
            if (array_pi[k] == termo){
              repeticao += 1;
            }
          } 
        }
      } 
      if (repeticao > 1){
        termos_unicos.splice(i,1);
      }
      i--;  
    }

    if (termos_unicos.length > 0){
      for (var i = 0; i < termos_unicos.length; i++){
        for (r = 0; r < array_prime_implicants.length; r++){
          if (r%2 == 0){

            elemento = array_prime_implicants[r]; 
            if ((inseridos.includes(array_prime_implicants[r]) == false) && (elemento.indexOf(termos_unicos[i].toString()) >= 0)){
              grupo = array_prime_implicants[r+1];
              indice = combinacoes[grupo].indexOf(array_prime_implicants[r]) + 1;
              v = bin_literal((combinacoes[grupo][indice]),n);
              expressao_algebrica += ' ' + v + ' +';
              inseridos.push(array_prime_implicants[r]);

            }
          }
        }
      }
    }
    expressao_algebrica2 = expressao_algebrica.slice(0, -1);
    expressao_html.innerHTML = expressao_algebrica2;
    document.getElementById('expressao_final').style.display = 'block';
  }
}

//////////////////////////////////////////////
// CONSTRUIR TABELA HTML 

function linha_tabela(a,b,c){
  var texto = '';

  texto += '<tr>';
  texto += '<td><b>' + a + '</b>&emsp;&emsp;&emsp;&emsp;' + b + '&emsp;&emsp;&emsp;&emsp;' +  bin_literal(b,n);
  texto +=  '&emsp;&emsp;&emsp;&emsp;<a href="#"> <i id="icon_table" class="bi bi-pencil-square" data-toggle="modal" data-target="#ExemploModalCentralizado">';
  texto += '<span id="mensagem_icon">'+ gerar_calculo_algebra(c) +' </span></i></a>';
  texto += '</td>';
  texto += '</tr>';

  return texto;
}

function construir_tabela(){
  array_prime_implicants = [];

  if ((minitermos.length != 0 && dont_cares.length != 0) || minitermos.length != 0){
    tabela = document.getElementById("tabela");
    //tabela.innerHTML = '';
    var myTable = '';
    myTable += '<br><br><br><table class="table"> <thead> <tr> <th style="padding: 20px;font-size:15px" scope="col">STEP '+num_tabelas+'</th></tr>';
    num_tabelas++;

    myTable +='<tr>';
    
    for (var i = 0; i <= n; i++){

      grupo_atual = combinacoes[i];

      if ((grupo_atual).length != 0){
        
        myTable += '<th scope="col">' + 'GRUPO ' + i + '</th>'; 
      
        myTable += '</tr> </thead> <tbody>';
        

        for (var j = 1; j < (grupo_atual).length; j++){

          if (j%2 != 0){
              if (array_prime_implicants.indexOf(grupo_atual[j-1]) < 0){
                array_prime_implicants.push(grupo_atual[j-1],i);
        
              }
              caminho = grupo_atual[j-1].join(",");
              myTable += linha_tabela(caminho,grupo_atual[j],grupo_atual[j-1]);

          }
        }  
            
      }
    }

    myTable += '</tbody> </table>';
    if (step == false){
      tabela.innerHTML += myTable;
    
      document.getElementById('tabela').style.display = 'block';
      document.getElementById('tabela').style.textAlign = 'center';
    }else{
      alert('sei oq fazer n');
    }

  }
}

//////////////////////////////////////////////
/////       CRIAR EXPRESSAO ALGEBRICA     ////

function criar_expressao(){

  if ((minitermos.length != 0 && dont_cares.length != 0) || minitermos.length != 0){

    letras = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    expressao_html = document.getElementById("expressao");
    var expressao_algebrica = 'F(';

    for(j = 0; j < n; j++){
      expressao_algebrica += letras[j] + ',';
    }
    expressao_algebrica = expressao_algebrica.slice(0, -1);
    expressao_algebrica += ') = ';

    if (minitermos.length > 0){
      minitermos_ordenados = minitermos.map(Number);
      minitermos_ordenados.sort(comparaNumeros);
      expressao_algebrica += '&#8721 m(';
      
      for(var i = 0; i < minitermos_ordenados.length; i++){
        expressao_algebrica += minitermos_ordenados[i] + ',';
      }
      expressao_algebrica = expressao_algebrica.slice(0, -1);
      expressao_algebrica += ')';
    }

    if (dont_cares.length > 0){

      dont_cares_ordenados = dont_cares.map(Number);
      dont_cares_ordenados.sort(comparaNumeros);
      expressao_algebrica += ' + &#8721 d(';

      for(var i = 0; i < dont_cares_ordenados.length; i++){
        expressao_algebrica += dont_cares_ordenados[i] + ',';
      }
      expressao_algebrica = expressao_algebrica.slice(0, -1);
      expressao_algebrica += ')';
    }

    expressao_html.innerHTML = expressao_algebrica;

    //CSS
    document.getElementById('expressao').style.display = 'block';

  }
}
//////////////////////////////////////////////

////////   ADD -> ARRAY COMBINACOES    //////


function add_to_combinacoes(){
  juncao = minitermos.concat(dont_cares);
  juncao.sort(comparaNumeros);

  combinacoes = [];
  num_tabelas = 0;

  for (var i = 0; i <= n; i++){
      combinacoes[i] = [];
  }
  
  for (i=0; i < juncao.length; i++){

    num_bin = Number(juncao[i]).toString(2).padStart(n, 0);
    grupo = (num_bin.split('1').length) -1;
    caminho = [];
    caminho.push(juncao[i]);
    combinacoes[grupo].push(caminho,num_bin);

  }

}

/////////////////////////////////////////////
////////   EXCLUIR TERMOS INFERIORES   //////

function excluir_termos_inferiores(m){

  if ((combinacoes[m]).length == 2 && m != 0){    
    if (combinacoes[m-1].length > 0){
      // se o grupo atual só conter 2 itens, entao ele sera comparado com o anterior,
      // verificando se tem a ocorrencia dele e so assim podera ser excluido
      item_m = combinacoes[m][0];
      achei = false;
      
      for (j=0; j < combinacoes[m-1].length; j++){
        if (j%2 == 0){
          igual = 0;
          for(h = 0; h < item_m.length; h++){
            if (combinacoes[m-1][j].indexOf(item_m[h]) >= 0){
              igual += 1;
            } 
          }
          if (igual == item_m.length){
            achei = true;
          }
        }
      }
      if (achei == true){
        combinacoes[m].splice(0, 2);
      }
    }
  }else{  
    var x = m;

    if (m != 0){
      if (combinacoes[m-1].length > 0){
        x -= 1;
      }
    }

    while (x <= m){
      grupo_atual = combinacoes[x];

      var y = m;

      if (m != 0){
        if (combinacoes[m-1].length > 0){
          y -= 1;
        }
      }

      while(y <= m){
        grupo_posterior = combinacoes[y];
        k = (grupo_atual.length) -2;
        
        while (k >= 0){ 
          linha_atual = grupo_atual[k];
          l = (grupo_posterior.length) -2;
          while (l >= 0){ 

            linha_posterior = grupo_posterior[l];
            igual = 0;
            for (var t = 0; t < linha_posterior.length; t++){
              if (linha_atual.indexOf(linha_posterior[t]) >= 0){
                igual += 1;
              }
            }
            if (igual == linha_posterior.length && linha_posterior.length < linha_atual.length){
              grupo_posterior.splice(l, 2);
              if (x == y){
                k -= 2;
              }
            }
            l -= 2;
          }
          k -= 2;
        }
        y++;
      }  
      x++;  
    }
  }
}

/////////////////////////////////////////////

function simplificacao(){
  document.getElementById('tabela').innerHTML = "";  
  possibilidade_merge = true;
  add_to_combinacoes();
  criar_expressao();

  while (possibilidade_merge == true){
    construir_tabela();
    mudanca_array = 0;
    for (var i = 0; i < n; i++){

      if (((combinacoes[i]).length != 0) && ((combinacoes[i+1]).length != 0)){
        grupo_atual = combinacoes[i];
        grupo_posterior = combinacoes[i+1];
        for (var j = 1; j < (grupo_atual).length; j++){
          if (j%2 != 0){
            linha_atual = (grupo_atual[j]).split('');

            for (var k = 1; k < (grupo_posterior).length; k++){
        
              if (k%2 != 0){
                merge = [];
                qtd_diferentes = 0;
                linha_posterior = (grupo_posterior[k]).split('');

                for (var l = 0; l < n; l++){
                  if (linha_atual[l] == linha_posterior[l]){
                    merge.push(linha_atual[l]);

                  }else{
                    if ((linha_atual[l] != '-') && (linha_posterior[l] != '-')){
                      merge.push('-');
                    }
                    qtd_diferentes += 1;
                  }
                }
                
                if ((qtd_diferentes == 1) && (merge.length == n)){
                  merge = (merge).join('');
                  grupo = (merge.split('1').length) -1;

                  verifica_arrays_iguais = arrays_iguais(grupo_atual[(j)-1],grupo_posterior[(k)-1]);
                  if (verifica_arrays_iguais == false){

                    caminho = (grupo_atual[(j)-1]).concat(grupo_posterior[(k)-1]);
                    existe_merge = false;

                    for (l = 0; l < combinacoes[grupo].length; l++){
                      if (l%2 == 0){
                        elemento = combinacoes[grupo][l];
                        qtd_caminho_igual = 0;
                        for (p = 0; p < elemento.length; p++){
                          for (q = 0; q < caminho.length; q++){
                            if (elemento[p] == caminho[q]){
                              qtd_caminho_igual += 1;
                            }
                          }
                        }
                        if (qtd_caminho_igual == caminho.length){
                          existe_merge = true;
                        }
                      }
                    }
                    
                    if (existe_merge == false && ((caminho.length)%2) == 0){
                      combinacoes[grupo].push(caminho,merge);
                      mudanca_array += 1;
                    }
                  }
                }
              }
            }
          } 
        }
      } 
      if (combinacoes[i].length > 0){
        excluir_termos_inferiores(i);
        if(i+1 == n){
          excluir_termos_inferiores(i+1);
        }
      }       
    }
    if (mudanca_array == 0){  

      possibilidade_merge = false;
    }
  }
  prime_implicants();
}