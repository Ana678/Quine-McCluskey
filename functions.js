n = 0; // número de variaveis, vai ser definido e usado por quase todas as funcoes
step = false;
count_cliques = 0;

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
  document.getElementById('tabela_verdade').innerHTML = ""; 
  document.getElementById('tabela_step').innerHTML = "";
  document.getElementById('tabela_implicants').innerHTML = "";
  
  //CSS 
  document.getElementById('tabela').style.display = 'none';
  document.getElementById('tabela_verdade').style.display = 'none';
  document.getElementById('tabela_implicants').style.display = 'none';
  document.getElementById('tabela_step').style.display = 'none';

  document.getElementById('expressao').style.display = 'none';
  document.getElementById('expressao_final').style.display = 'none';
  document.getElementById('step').style.display = 'none';

  step = false;
  count_cliques = 0;
}


////////////////////////////////////////////////////
//            Funcao De Execucao Direta           //

function no_step(){
  limpar_tela();
  simplificacao();

}

////////////////////////////////////////////////////
//      Funcoes relacionadas ao STEP-BY-STEP      //

function step_by_step(){
  limpar_tela();
  
  if((minitermos.length != 0 && dont_cares.length != 0) || minitermos.length != 0){
    document.getElementById('step').style.display = 'block';
  }

  step = true;
  tabelas_step = [];

  simplificacao();

}

function liberar_step(){
  count_cliques += 1;
  document.getElementById('tabela_step').innerHTML = ""; 
  tabela = document.getElementById("tabela_step");
  var myTable = '';
  x = 0;

  html_completo = false;

  if (count_cliques > 0){
    
    for (i = 0; i < tabelas_step.length; i++){ 
      myTable += '<br><br><br><table class="table">';
      tabela_atual = tabelas_step[i];
      
  
      for (j = 0; j < tabela_atual.length; j++){
        if(x < count_cliques){   
          
          if(tabela_atual[j].substring(0,7) == '<thead>'){
            myTable += tabela_atual[j];
            myTable += '<tbody>';
          
          }else if(tabela_atual[j].substring(0,25) == '<tr><th scope="col">GRUPO'){
            myTable += tabela_atual[j];

          }else{
            myTable += tabela_atual[j];
 
            x++;
          }
           
          if (i == (tabelas_step.length -1) && j == (tabela_atual.length -1) ){
            html_completo = true;
          }

        }
      }
      myTable += '</tbody></table>';
    }
  
  tabela.innerHTML += myTable;
  document.getElementById('tabela_step').style.display = 'block';
  document.getElementById('tabela_step').style.textAlign = 'center';

  if(html_completo == true){
    document.getElementById('step').style.display = 'none';
    prime_implicants();
  }
}

}

////////////////////////////////////////////////////
//            ADICIONANDO UM MINITERMO           //

function add_minitermo(){
  if ((window.event ? event.keyCode : event.which) == 13) {
    erro = document.getElementById('error');
    min = document.getElementById('minitermo').value;
    if (min != '0' && (isNaN(min) == false)){
      min = min.replace(/^0+/, '');
    }
    

    if ((isNaN(min) == false) && (n > 0) && (min != "") && (minitermos.includes(min) == false) && (dont_cares.includes(min) == false) && (min < 2**n)){

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
}

///////////////////////////////////////////////////
//            ADICIONANDO UM DONT CARE           //

function add_dont_care(){

  if ((window.event ? event.keyCode : event.which) == 13) {
    erro = document.getElementById('error');
    dont = document.getElementById('dontcare').value;
    
    if (dont != '0' && (isNaN(dont) == false)){
      dont = dont.replace(/^0+/, '');
    }

    if ((isNaN(dont) == false) && (n > 0) && (dont != "") && (dont_cares.includes(dont) == false) && (minitermos.includes(dont) == false) && (dont < 2**n)){

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

  }

}

////////////////////////////////////////////////////
////////   ADD -> ARRAY COMBINACOES    //////


function add_to_combinacoes(){
  juncao = minitermos.concat(dont_cares).map(Number);
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
// TRANSFORMACAO BINARIO EM LITERAL STRING

function bin_literal(numero,n){
  
  letras = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
  lista_numero = (numero).split('');
  num_convertido = [];

  for (var i = 0; i < n; i++){
    barrado = ' <span style="text-decoration:overline;">';
    fim_barrado = '</span> ';
    if (lista_numero[i] != "-"){
      if (lista_numero[i] == '1'){
        barrado = ' ';
        fim_barrado = ' ';
      }
      num_convertido.push(barrado+letras[i]+fim_barrado);
    }
      
  }
  return (num_convertido).join("");
}


////////////////////////////////////////////

// FUNÇÃO EXTRAIDA DE UM SITE ONLINE https://www.alura.com.br/artigos/ordenacao-de-numeros-no-javascript-nao-funciona

// usada para resolver esse problema: [1,2,11,3,5,0]  ->  [11,0,1,2,3,5]
// Esta sendo chamada como parametro da funcao sort()

function comparaNumeros(a,b) { if (a == b) return 0; if (a < b) return -1; if (a > b) return 1; } 

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
  
  return algebra;
}

function enviaModal(id){ // envia o calculo para dentro do modal

  id = id.split(",");
  algebra = gerar_calculo_algebra(id);
  document.getElementById('algebra_modal').innerHTML = algebra;
  
}

//////////////////////////////////////////////
/////      SELECIONAR PRIME IMPLICANTS    ////

function prime_implicants(){

  if((minitermos.length != 0 && dont_cares.length != 0) || minitermos.length != 0){
    letras = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    expressao_html = document.getElementById("expressao_final");
    var expressao_algebrica = '';
    var texto_funcao = '';
    // variaveis
    texto_funcao += 'F(';
    for(j = 0; j < n; j++){
      texto_funcao += letras[j] + ',';
    }
    texto_funcao = texto_funcao.slice(0, -1);
    texto_funcao += ') = ';
    ///
    
    if((minitermos.length + dont_cares.length) < 2**n){
      multiplas_combinacoes = [];
      possibilidade_combinacao = true;
      termos_implicants = [];

      for (j = 0; j <array_prime_implicants.length; j++){
        if (j%2 == 0){
          for (k = 0; k < array_prime_implicants[j].length; k++){
            if(termos_implicants.includes(array_prime_implicants[j][k]) == false && minitermos.includes(array_prime_implicants[j][k].toString()) == true){
              termos_implicants.push(array_prime_implicants[j][k]);
            }
          }
        }
      }

      while(possibilidade_combinacao == true){
        
        if(multiplas_combinacoes.length == 0){

          termos_existentes = [];
          termos_existentes = termos_existentes.concat(termos_implicants);
          array_atual = [];

          j = array_prime_implicants.length -2;
          while(j >= 0){
            var i = termos_existentes.length -1;
            while (i >= 0){ 
          
              termo = termos_existentes[i];
              array_pi = array_prime_implicants[j];
              add = false;

              if (array_pi.indexOf(termo) >= 0 && array_atual.indexOf(array_pi.join(",")) < 0){
                

                valida_num = valida_contem_termos(array_pi,termos_existentes);

                if(valida_num == array_pi.join(',')){
                  array_atual.push(array_pi.join(","));
                  add = true;

                }else{
                  array_atual.push(valida_num);
                  array_2 = valida_num.split(',');  
                  for(l = 0; l < array_2.length; l++){
                    g = termos_existentes.length - 1;
                    while(g >= 0){
                      if(termos_existentes[g] == array_2[l]){
                        termos_existentes.splice(g,1);
                      }
                      g--;
                    }
                  }
                  i = termos_existentes.length;
                }
              } 

              if(add == true){
                for(l = 0; l < array_pi.length; l++){
                  g = termos_existentes.length - 1;
                  while(g >= 0){
                    if(termos_existentes[g] == array_pi[l]){
                      termos_existentes.splice(g,1);
                    }
                    g--;
                  }
                }
                i = termos_existentes.length -1;
              }else{
                i--;
              }
            }  
            j-= 2;
          }

          multiplas_combinacoes.push(array_atual);
          
        }else{

          i = array_prime_implicants.length -2;

          while(i >= 0){

            array_posterior = [];
            termos_existentes = [];
            termos_existentes = termos_existentes.concat(termos_implicants);
            
            termo_i = array_prime_implicants[i];

            array_posterior.push(termo_i.join(","));
            for(l = 0; l < termo_i.length; l++){ // exclui termos usados
              g = termos_existentes.length - 1;
              while(g >= 0){
                if(termos_existentes[g] == termo_i[l]){
                  termos_existentes.splice(g,1);
                }
                g--;
              }
            }

            j = array_prime_implicants.length -2;
            while(j >=0){
              termo_j = array_prime_implicants[j];

              existe = 0;
              for(t = 0; t < termos_existentes.length; t++){ // verifica se possui termo nao usados
                if(termo_j.indexOf(termos_existentes[t]) >= 0){
                  existe++;
                }
              }
              
              if((termo_i != termo_j) && (array_posterior.indexOf(termo_j.join(",")) < 0) && (existe > 0 )){
                
                array_posterior.push(termo_j.join(","));

                for(l = 0; l < termo_j.length; l++){ // exclui termos usados
                  g = termos_existentes.length - 1;
                  while(g >= 0){
                    if(termos_existentes[g] == termo_j[l]){
                      termos_existentes.splice(g,1);
                    }
                    g--;
                  }
                }
              }
              j-= 2;
            }
            
            if(termos_existentes.length == 0){    

              // ver se tem algum termo extra e exclui
              for(p = array_posterior.length -1; p >= 0; p--){
                termo_p = array_posterior[p].split(',');
                achei_igual = 0;
                for(q = 0; q < termo_p.length; q++){
                  for(r = array_posterior.length -1; r >= 0; r--){
                    termo_r = array_posterior[r].split(',');
                    for(s = 0; s < termo_r.length; s++){
                      if(termo_p[q] == termo_r[s] && array_posterior[p] != array_posterior[r]){
                        achei_igual += 1;
                      }
                    }
                  }
                }
                if(achei_igual == termo_p.length){
                  array_posterior.splice(p,1);
                }
              }
            
              //////////////////////////////////////////

              //verifica se essa combinacao final ja existe
              combinacao_existe = false;
              for(m=0; m < multiplas_combinacoes.length; m++){ 
                cont_iguais =0;
                for(o=0; o < multiplas_combinacoes[m].length; o++){
                  for(p=0; p < array_posterior.length; p++){
                    if(multiplas_combinacoes[m][o] == array_posterior[p]){
                      cont_iguais += 1;
                    }
                  }
                }
                if(cont_iguais == array_posterior.length){
                  combinacao_existe = true;
                }
              }
              /////////////////////////////////////////

              if(combinacao_existe == false && array_posterior.length == multiplas_combinacoes[0].length){
                multiplas_combinacoes.push(array_posterior);
              }
            }

            i -= 2;
          }
          possibilidade_combinacao = false;
        }
      
      }

      if (multiplas_combinacoes.length > 0){
      
        for (var i = 0; i < multiplas_combinacoes.length; i++){
          // variaveis
          expressao_algebrica += texto_funcao;
          ///

          for (r = 0; r < multiplas_combinacoes[i].length; r++){
            grupo = 0;
            indice = 0;
            p = array_prime_implicants.length -2;
            while(p >= 0){
              if(multiplas_combinacoes[i][r] == array_prime_implicants[p]){
                grupo = array_prime_implicants[p+1]; 
                indice = combinacoes[grupo].indexOf(array_prime_implicants[p]) + 1;
              }
              p -= 2;
            }
            v = bin_literal((combinacoes[grupo][indice]),n);
            expressao_algebrica += ' ' + v + ' +';
          }
          expressao_algebrica = expressao_algebrica.slice(0, -1);
          if((i + 1) < multiplas_combinacoes.length){
            expressao_algebrica += '&nbsp;&nbsp;  ou &nbsp;&nbsp; ';
          }

        }
      }

    }else{
    expressao_algebrica = texto_funcao + "&nbsp; 1";
    }
  }

  expressao_html.innerHTML = expressao_algebrica;
  document.getElementById('expressao_final').style.display = 'block';
  tabela_implicants();

}
//////////////////////////////////////////////
// VALIDA CONTEM TERMOS EXCLUIDOS

function valida_contem_termos(array_pi,termos_existentes){

  contem_termos_excluidos = 0;
  termo_final = array_pi.join(',');

  for(y =0; y < array_pi.length; y++){
    if(termos_existentes.indexOf(array_pi[y]) < 0){
      contem_termos_excluidos += 1;
    }
  }

  if(contem_termos_excluidos >= 1){
    x = array_prime_implicants.length -2;

    while(x >= 0){
      
      if(array_prime_implicants[x].indexOf(termo) >= 0 && array_prime_implicants[x].join(",") != array_pi.join(",")){
        termos = 0;
        
        for(y =0; y < array_prime_implicants[x].length; y++){
          if(termos_existentes.indexOf(array_prime_implicants[x][y]) < 0){
            termos += 1;
          }
        }      

        if(termos < contem_termos_excluidos){
          termo_final = array_prime_implicants[x].join(",");

          x = -1;
        }else{
          x -=2;
        }
      }else{
        x -=2;
      }
    }
  }
  return termo_final;
}

//////////////////////////////////////////////
/////       CRIAR TABELA VERDADE         /////

function tabela_verdade(){

  if ((minitermos.length != 0 && dont_cares.length != 0) || minitermos.length != 0){
    tabela = document.getElementById("tabela_verdade");
  
    var myTable = '';
    thead = '<thead> <tr><th style="padding: 20px;font-size:15px" align:"center" colspan="3" scope="col">TABELA VERDADE</th></tr></thead>';

    num_bin = ((2**n)-1).toString(2).padStart(n, 0);
    literal = bin_literal(num_bin,n);

    myTable += '<br><br><br><table class="table">' + thead +'<tbody>';
    myTable += '<tr> <th scope="col" style="text-align:right">  #  </th><th scope="col">'+ literal.split('  ').join('&emsp;&emsp;&emsp;') +'</th><th style="text-align:left" scope="col">  Saída  </th></tr>';

    for (var i = 0; i < 2**n; i++){
      saida = '0';

      num_bin = (i).toString(2).padStart(n, 0);

      if(minitermos.includes(i.toString()) == true){
        saida = '<span style="color:red">1</span>';
      }else if(dont_cares.includes(i.toString()) == true){
        saida = '<span style="color:red">x</span>';
      }
      myTable += '<tr><td style="text-align:right">'+i+'</td> <td>'+num_bin.split('').join('&emsp;&emsp;&emsp;') +'</td> <td style="text-align:left;padding-left:25px">'+saida+'</td></tr>';
      
    }

    myTable += '</tbody></table>';
    tabela.innerHTML = myTable;
    document.getElementById('tabela_verdade').style.display = 'block';
    document.getElementById('tabela_verdade').style.textAlign = 'center';

  }
}


//////////////////////////////////////////////
//           CONSTRUIR TABELA STEP          //

function linha_tabela(a,b,c){
  var texto = '';

  texto += '<tr>';
  texto += '<td><b>' + a + '</b></td><td>' + b + '</td><td>' +  bin_literal(b,n);
  texto +=  '</td><td><a onclick="enviaModal(this.id)" id="'+c+'" role="button" data-toggle="modal" data-target="#ExemploModalCentralizado"> <i  id="icon_table" class="bi bi-pencil-square">';
  texto += '<span id="mensagem_icon">'+ gerar_calculo_algebra(c) +' </span></i></a>';
  texto += '</td>';
  texto += '</tr>';

  return texto;
}

function construir_tabela(){
  array_prime_implicants = [];
  array_step = [];

  if ((minitermos.length != 0 && dont_cares.length != 0) || minitermos.length != 0){
    tabela = document.getElementById("tabela");
    //tabela.innerHTML = '';
    var myTable = '';
    thead = '<thead> <tr> <th style="padding: 20px;font-size:15px" scope="col" align:"center" colspan="4">PASSO '+num_tabelas+'</th></tr></thead>';
    num_tabelas++;

    if (step == false || (step == true && num_tabelas == 1)){
      myTable += '<br><br><br><table class="table">' + thead +'<tbody>';
    }else{
      array_step.push(thead);
    }

    for (var i = 0; i <= n; i++){

      grupo_atual = combinacoes[i];

      if ((grupo_atual).length != 0){
        
        nome_grupo = '<tr><th scope="col" align:"center" colspan="4">' + 'GRUPO ' + i + '</th></tr>'
        
        if (step == false || (step == true && num_tabelas == 1)){
          myTable += nome_grupo;
        }else{
          array_step.push(nome_grupo);
        }
        
        for (var j = 1; j < (grupo_atual).length; j++){

          if (j%2 != 0){
              if (array_prime_implicants.indexOf(grupo_atual[j-1]) < 0){
                array_prime_implicants.push(grupo_atual[j-1],i);
        
              }
              
              caminho = grupo_atual[j-1].join(",");
              conteudo_linha = linha_tabela(caminho,grupo_atual[j],grupo_atual[j-1]);
              if (step == false || (step == true && num_tabelas == 1)){
                myTable += conteudo_linha;

              }else{
                array_step.push(conteudo_linha);
              }

          }
        }  
            
      }
    }

    myTable += '</tbody></table>';
    if (step == false || (step == true && num_tabelas == 1)){
      tabela.innerHTML += myTable;
      document.getElementById('tabela').style.display = 'block';
      document.getElementById('tabela').style.textAlign = 'center';
    }else{
      tabelas_step.push(array_step);
    }

  }
}

//////////////////////////////////////////////
/////      CRIAR TABELA IMPLICANTS       /////

function tabela_implicants(){
  inseridos = [];
  
  if ((minitermos.length != 0 && dont_cares.length != 0) || minitermos.length != 0){
    tabela = document.getElementById("tabela_implicants");
    min_ordenados = [];
    min_ordenados = min_ordenados.concat(minitermos).map(Number).sort(comparaNumeros); 

    var myTable = '';
    col = min_ordenados.length +1;
    thead = '<thead> <tr><th style="padding: 20px;font-size:15px;" scope="col" align:"center" colspan="'+col+'">TABELA IMPLICANTES</th></tr></thead>';

    num_bin = ((2**n)-1).toString(2).padStart(n, 0);
    literal = bin_literal(num_bin,n);

    myTable += '<br><br><br><table class="table">' + thead +'<tbody>';

    myTable += '<tr>';
    myTable += '<th scope="col"> PI </th>';
    for (var i = 0; i < min_ordenados.length; i++){
        myTable += '<th scope="col">'+min_ordenados[i]+'</th>';
        
      }
    }
    myTable += '</tr>';

    /// pega mintiermos unicos para marcar eles diferentes
    minitermos_unicos = [];

    for (var i = 0; i < combinacoes.length; i++){ 
      for (var j = 0; j < combinacoes[i].length; j+= 2){
        
        termo = combinacoes[i][j];
        for(var l = 0; l < termo.length; l++){  
          if(minitermos_unicos.indexOf(termo[l]) < 0){
            minitermos_unicos.push(termo[l]);
          }else{
            minitermos_unicos.splice(minitermos_unicos.indexOf(termo[l]),1);
            
          }

        }
      }
    }
    //////////////////////////////////////////////////////

    for (var i = 0; i < combinacoes.length; i++){
      for (var j = 0; j < combinacoes[i].length; j++){
        myTable += '<tr>';
        if(j%2 != 0){
          termo = combinacoes[i][j-1];
          myTable += '<th scope="col">'+bin_literal(combinacoes[i][j],n)+'</th>';
        
          array_posicoes = []; 
          for(var l = 0; l < termo.length; l++){ // pega posicao em que deve colocar ✔
            for (var k = 0; k < min_ordenados.length; k++){
              if(min_ordenados[k] == termo[l]){
                if(minitermos_unicos.indexOf(termo[l]) >= 0){
                  array_posicoes[k] ='<td style="background-color: #EFEFEF"> ✔ </td>';
                }else{
                  array_posicoes[k] ='<td> ✔ </td>';
                }

              }else if(array_posicoes[k] != '<td> ✔ </td>' && array_posicoes[k] != '<td style="background-color: #EFEFEF"> ✔ </td>'){
                  array_posicoes[k] = '<td>  </td>';
              }
            }
          }

          for(m=0; m < array_posicoes.length; m++){
            myTable += array_posicoes[m];
          }
        }
        myTable += '</tr>';
      }
    }

    myTable += '</tbody></table>';
    tabela.innerHTML = myTable;
    document.getElementById('tabela_implicants').style.display = 'block';
    document.getElementById('tabela_implicants').style.textAlign = 'center';
   
}

//////////////////////////////////////////////
/////        CRIAR EXPRESSAO FUNCAO       ////

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
////////   EXCLUIR TERMOS INFERIORES   //////

function excluir_termos_inferiores(m){

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
            if (x == y && k > l){
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

/////////////////////////////////////////////
//              REALIZA MERGES             //

function simplificacao(){
  document.getElementById('tabela').innerHTML = "";  
  possibilidade_merge = true;
  add_to_combinacoes();
  criar_expressao();
  tabela_verdade();

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
  if(step == false){
    prime_implicants();
  }
  
}