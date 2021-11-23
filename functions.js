n = 0; // número de variaveis, vai ser definido e usado por quase todas as funcoes

//             DEFININDO QUANTIDADE DE VARIAVEIS E CRIANDO ARRAY'S            //

function define_variaveis(){
  n = document.getElementById('variaveis').value;
  
  minitermos = [];
  dont_cares = [];
  array_prime_implicants = [];

  document.getElementById('saida').innerHTML = ""; 
  document.getElementById('saida_dont').innerHTML = "";
  document.getElementById('tabela').innerHTML = "";  

  //CSS
  document.getElementById('expressao').style.display = 'none';
  document.getElementById('expressao_final').style.display = 'none';

}

////////////////////////////////////////////////////
//            ADICIONANDO UM MINITERMO           //

function add_minitermo(){
  if ((window.event ? event.keyCode : event.which) == 13) {
    document.getElementById('tabela').innerHTML = "";  
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
  }
  
  document.getElementById('tabela').style.display = 'none';
  document.getElementById('expressao').style.display = 'none';
  document.getElementById('expressao_final').style.display = 'none';
  simplificacao();
}

////////////////////////////////////////////////////
//             EXCLUINDO UM MINITERMO            //

function excluir_minitermo(id){

  min = id;

  if ((min != "") && (minitermos.includes(min) == true)){

    minitermos.splice(minitermos.indexOf(min), 1);

    document.getElementById(min).remove();
    document.getElementById('tabela').innerHTML = "";

    //CSS
    document.getElementById('expressao').style.display = 'none';
    document.getElementById('expressao_final').style.display = 'none';
    simplificacao();

  }
}

///////////////////////////////////////////////////
//            ADICIONANDO UM DONT CARE           //

function add_dont_care(){

  if ((window.event ? event.keyCode : event.which) == 13) {
    document.getElementById('tabela').innerHTML = "";  
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
  }
  
  document.getElementById('tabela').style.display = 'none';
  document.getElementById('expressao').style.display = 'none';
  document.getElementById('expressao_final').style.display = 'none';
  simplificacao();
}

////////////////////////////////////////////////////

//             EXCLUINDO UM DONT CARE            //

function excluir_dont_care(id){

  dont = id;

  if ((dont != "") && (dont_cares.includes(dont) == true)){

    dont_cares.splice(dont_cares.indexOf(dont), 1);

    document.getElementById(dont).remove();

    //CSS
    
    document.getElementById('tabela').style.display = 'none';
    document.getElementById('expressao').style.display = 'none';
    document.getElementById('expressao_final').style.display = 'none';
    simplificacao();

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
/////       GERAR CALCULO ALGEBRA     ////

function gerar_calculo_algebra(caminho){

  array_caminho = caminho.split(',');
  var algebra = '';
  
  for (i = 0; i < array_caminho.length; i++){
    num_bin = Number(array_caminho[i]).toString(2).padStart(n, 0);

    algebra += ' ' + bin_literal(num_bin,n) + ' +';
  }
  return algebra;
}

//////////////////////////////////////////////
/////      SELECIONAR PRIME IMPLICANTS    ////

function prime_implicants(){

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
      termo = termos_unicos[i].toString();
      repeticao = 0;

      for (j = 0; j < array_prime_implicants.length; j++){
        if (j%2 == 0){
          if(array_prime_implicants[j].includes(termo) == true){
            repeticao += 1;
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
            if ((inseridos.includes(array_prime_implicants[r]) == false) && (array_prime_implicants[r].includes(termos_unicos[i].toString()) == true)){
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

function construir_tabela(){

  array_prime_implicants = [];

  if ((minitermos.length != 0 && dont_cares.length != 0) || minitermos.length != 0){
    tabela = document.getElementById("tabela");
    tabela.innerHTML = '';
    var myTable = '';
    myTable += '<table class="table"> <thead> <tr> <th scope="col"> Tabela organizada pela quantidade de 1s </th> </tr>';
    myTable +='<tr>';
    
    for (var i = 0; i <= n; i++){

      grupo_atual = combinacoes[i];

      if ((grupo_atual).length != 0){
        
        myTable += '<th scope="col">' + 'GRUPO ' + i + '</th>'; 
      
        myTable += '</tr> </thead> <tbody>';
        

        for (var j = 1; j < (grupo_atual).length; j++){

          if (j%2 != 0){ 
              if (array_prime_implicants.includes(grupo_atual[j-1]) == false){
                array_prime_implicants.push(grupo_atual[j-1],i);
        
              }

              v = bin_literal(grupo_atual[j],n);
              myTable += '<tr>';
              myTable += '<td><b>' + grupo_atual[j-1] + '</b>&emsp;&emsp;&emsp;&emsp;' + grupo_atual[j] + '&emsp;&emsp;&emsp;&emsp;' + v;
              myTable +=  '&emsp;&emsp;&emsp;&emsp; <i id="icon_table" class="bi bi-pencil-square">';
              myTable += '<span id="mensagem_icon">'+ gerar_calculo_algebra(grupo_atual[j-1]) +' </span></i>';
              myTable += '</td>';
              myTable += '</tr>';

          }
        }  
            
      }
    }

    myTable += '</tbody> </table> <br>';
    tabela.innerHTML += myTable;
    
    document.getElementById('tabela').style.display = 'block';
    document.getElementById('tabela').style.textAlign = 'center';
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

  for (var i = 0; i <= n; i++){
      combinacoes[i] = [];
  }
  
  for (i=0; i < juncao.length; i++){

    num_bin = Number(juncao[i]).toString(2).padStart(n, 0);
    contagem = (num_bin.split('1').length) -1;
    combinacoes[contagem].push(juncao[i].toString(),num_bin);

  }

}

/////////////////////////////////////////////


function simplificacao(){
  possibilidade_merge = true;
  add_to_combinacoes();
  criar_expressao();
  while (possibilidade_merge == true){

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
                  caminho = grupo_atual[(j)-1] + "," + grupo_posterior[(k)-1];
                  caminho = num_ordenados(caminho);

                  verifica_merge = (combinacoes[grupo]).includes(caminho);

                  if ((verifica_merge == false) && (str_unica(caminho) == false)){
                    
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
    if (mudanca_array == 0){  

      for (var i = 0; i <= n; i++){
    
        for (var j = 0; j <= n; j++){
          if (((combinacoes[i]).length != 0) && ((combinacoes[j]).length != 0)){
    
            grupo_atual = combinacoes[i];
            grupo_posterior = combinacoes[j];
            
            k = ((grupo_atual).length) -2;
    
            while (k >= 0){
              
              linha_atual = (grupo_atual[k]).split(',');
    
              l = ((grupo_posterior).length) -2;

              while (l >= 0){

                linha_posterior = (grupo_posterior[l]).split(',');
                
                igual = 0;
                for (var t = 0; t < linha_atual.length; t++){
                  for (var p = 0; p < linha_posterior.length; p++){
                    if (linha_atual[t] == linha_posterior[p]){
                      igual += 1;
                      
                    }
                  }
                }
                if ((igual == (linha_posterior).length) && ((linha_posterior).length < (linha_atual).length)){
                  grupo_posterior.splice(l, 2);
                  if (i == j){
                    k -= 2;
                  }
    
                }else if ((igual == (linha_atual).length) && ((linha_atual).length < (linha_posterior).length)){
                  grupo_atual.splice(k, 2);
                  if (i == j){
                    k -= 2;
                  }
                }
                l -= 2;
              }
              k -= 2;
            }
            
          }
        }
      possibilidade_merge = false;
      }
    }
  }
  construir_tabela();
  prime_implicants();
}