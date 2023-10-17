# Atividade da UC10 usando angular + consumo de API
Clone em um repositório local este projeto:
https://github.com/SamantaMelissa/Atv_LginUC10_REC

E lembre! Quando clonar um projeto exclua o arquivo .git e dê o comando ``` npm install ``` para baixar todos os pacotes a serem utilizados.

Em eguida, no projeto, instale o json-server:
npm install -D json-server json-server-auth

> Crie um arquivo db.json para armazenar os dados dos usuário
![image](https://github.com/SamantaMelissa/atv1110/assets/61596646/3f808242-f958-4935-bc46-9a464b259ffc)

> E em seguida, rodar a API com o seguinte comando:
json-server db.json -m ./node_modules/json-server-auth

Se pegarmos a url: http://localhost:3000/users e colocar no nosso navegador, ele vai retornar pra gente as informações.
![image](https://github.com/SamantaMelissa/atv1110/assets/61596646/b1225434-4d1c-480c-8b12-9c4df28f176e)

Show, nossa api está lendo as informações cadastradas no nosso “banco”. Agora bora fazer com que nosso login funcione?

> Entre no arquivo “app.module.ts”;
> Adicione um módulo do HTTPCliente do Angular.

```import { HttpClientModule } from '@angular/common/http'; ```
![image](https://github.com/SamantaMelissa/atv1110/assets/61596646/7e67f4aa-aea9-4011-b159-681559f5efa7)

 O module de HttpClient nos permite a manipulação de solicitações http e suas respostas, lembram dos verbos e os números de retorno? Esse cara vai nos ajudar com isso.  

> Agora podemos criar o nosso service(comunicar com a API), com o seguinte comando:
ng generate service services/login

O service no Angular é como um "ajudante" que você pode criar para realizar tarefas específicas em seu aplicativo. Essas tarefas podem ser coisas como buscar dados de um servidor, armazenar informações importantes ou qualquer ação que você precisa fazer em vários lugares do seu aplicativo.

No LoginService.ts, deixe:
```
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
// O @Injectble é usado para que o Angular saiba que essa classe é um serviço. Além disso, você pode injetar dependências no construtor do serviço, caso haja
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  // Injeção de dependecia -> É uma forma bem simples que nos traz tudo o que precisamos para um componente funcionar perfeitamente. E é isso que fizemos com o HttpClient.
  constructor(private httpClient: HttpClient ) {}

  url = "http://localhost:3000/login"

  // Como estamos usando uma API externa e não sabemos os dados trabalhados, o Observable<any> permite que você trabalhe com esses dados de forma genérica.
// o argumento usuário é do tipo User.
  login(usuario: User): Observable<any>{
    // post -> cria
// O stringify, nessa situação está transformando o objeto “usuário” em um valor JSON. 
    return this.httpClient.post(this.url, JSON.stringify(usuario), {
//Cabeçalhos
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
      // O uso do observe: "response" faz com que nosso retorno tenha as informações do cabeçalho e o status code. Isso indica que você deseja observar a resposta completa da solicitação, incluindo o status HTTP, os cabeçalhos e o corpo da resposta. Se você configurar observe: "body" em vez disso, apenas o corpo da resposta será observado. 
      observe: "response"
    })
  }
}
```
Service criado e implementamos o login
Agora vamos usar o service na nossa class…




Em login.component.ts:
O que queremos é que assim que nosso usuário fizer o login e retornar OK, ele irá ser DIRECIONADO a tela de contatos. Ok? No projeto de vocês, essa rota será para a home page.  
Primeiro passo, vamos importar o Router. 
![image](https://github.com/SamantaMelissa/atv1110/assets/61596646/00b82688-7822-415c-ad3c-6801708ee73a)

Segundo passo, injetar dependência do uso do router. 
![image](https://github.com/SamantaMelissa/atv1110/assets/61596646/f5d42c45-421a-455e-a3be-432d042e74da)

```
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{

  constructor(private loginService : LoginService, private router : Router){}
    
    mensagemok = "Deu certo!"
    mensagemERRO = " "
   

    // Instanciando uma classe:
    userModel = new User()

    onSubmit(){
      // O subscribe é um operador do Observable.Ao usar ele, estamos falando que, assim que nossa requisição for realizada e nosso texto se transformar em JSON, seremos notificados, e além disso, receberemos as informações do usuários. Esse cara faz tudo de forma rápida e unidimencional. 

// Estaremos renderizando de forma condicional, isto é, algo será mostrado na dela, se erro:
// O método .subscribe permite que você observe os resultados da solicitação.
      this.loginService.login(this.userModel).subscribe((response) => {
        // Se ok:
        console.log(this.mensagemok)
        this.router.navigateByUrl("/")
      },(respErro) => {
        // Se erro:
        this.mensagemERRO = respErro.error
// Caso seja interessante:
        if(this.mensagemERRO == 'Password is too short'){
          this.mensagemERRO = "A senha está muitooo pequena!"
          this.dicas = " Utilize mais de três caractéres"
        }else{
          this.dicas = ""
        }
      })
    }
  
}


```

Agora, no nosso HTML:
```
<main>
    <form #userForm="ngForm" (ngSubmit)="onSubmit()"class="form_login">
        <div class="inputForm">
            <label for="email">Email</label>
            <input [(ngModel)] ="userModel.email" type="email" name="email" placeholder="Informe seu Email">
        </div>
        <div class="inputForm">
            <label for="senha">Senha</label>
            <input [(ngModel)] ="userModel.password" type="password" name="senha" placeholder="Informe sua senha">
        </div>
        <button class="btn_login">Entrar</button>
    </form>
    <p id="mensagem" *ngIf=" mensagemERRO != ' ' " >{{mensagemERRO}}</p>
</main>
```




 
# Atividade de teste de FrontEnd usando o JMeter

1- A gente vai fazer uma atividade relacionada ao Jmeter em relação a teste de
desempenho.
A gente tá aqui com o projetinho que é disponibilizado pra vocês na atividade 2, é um
projetinho de API e no caso, antes de conseguir executar ele, fazer o nosso Jmeter 
funcionar nós vamos precisar executar esse projeto. Mas pra executar esse projeto eu
vou precisar de duas coisas:
A 1ª é que já foi feito um build aqui em um arquivo feito em Angular que no caso
seria colocar ali no modo de produção. Então ele criou esses arquivos aqui, ele
converteu o Typescript em um projeto Angular e está convertido em HTML e 
JavaScript.
E por último também vai ter aqui uma API, chamada db.json, então eu vou
precisar executar o db.json e executar o nosso index né
Porquê?
Porque como a gente vai fazer o teste de desempenho com o Jmeter usando o 
protocolo HTTP, eu vou precisar acessar o HTTPClient dele né que a gente vai simular
o servidor pra executar esse projetinho aqui.
Então a primeira coisa que a gente vai precisar verificar é se o node.js está instalado
na máquina de vocês, a gente vai precisar dele pra executar tanto o json-server que
vai ser responsável por executar a API, que no caso é o db.json quanto o HTTPClient 
que vai ser o servidor pra gente executar esse index aqui.
Então eu vou utilizar aqui o comando CMD na que eu estou aqui do projeto

![image](https://github.com/CTM-SENAI-134/Pc-TesteFrontEnd/assets/144062335/828593da-fb1c-4aa4-af6b-c1f8edcf6889)

![image](https://github.com/CTM-SENAI-134/Pc-TesteFrontEnd/assets/144062335/0c17faa1-b345-4f9f-a2b4-935ffd07fec9)

Eaí estando dentro da pasta do projeto, a gente vai fazer o seguinte:

npm install -g json-server


E para executarmos aqui projeto da API do index o comando vai ser:

npm install -h http-server


Agora nós vamos precisar de 2 CMDs, um para executar o json-server e outro para
executar o HTTPClient.
Vamos lá, no primeiro CMD nós vamos executar o comando:

json-server --watch db.json


Agora no outro CMD nós vamos executar o comando:

http-server

![image](https://github.com/CTM-SENAI-134/Pc-TesteFrontEnd/assets/144062335/7f641603-7fa7-46be-aab7-9bece2560d95)


Esses daqui vão ser os IPs do endereço do nosso projeto que pode ser qualquer um
desses dois eu vou ficar com o de baixo aqui

Copiar o IP de baixo e colar no navegador

![image](https://github.com/CTM-SENAI-134/Pc-TesteFrontEnd/assets/144062335/ed1ebec1-54ce-459f-9db9-7f115091fbf8)

Agora vocês podem ver que o nosso projeto está funcionando, e podemos ter certeza
que o nosso json-server está funcionando porque ele está listando os dados.
Então se eu for no navegador e colocar aqui localhost:3000/clientes


![image](https://github.com/CTM-SENAI-134/Pc-TesteFrontEnd/assets/144062335/88350d4a-0479-4d61-9840-11565be3c859)


Porquê?
Porque se a gente abre aquele nosso arquivo db.json, vou abrir aqui com o bloco de
notas cês vão perceber que vai aparecer aqui o clientes, esse clientes é o que define
aquele /clientes que vocês viram lá no navegador, onde está a lista dos nossos
clientes, dentro de um array.
Excluir um usuário (no navegador mesmo) para eles verem que
está funcionando
Agora já podemos ir para o Jmeter então
Baixar com eles a versão do Jmeter 5.5:
https://jmeter.apache.org/download_jmeter.cgi
Para gente executar o Jmeter nós vamos acessar aqui a pasta bin

![image](https://github.com/CTM-SENAI-134/Pc-TesteFrontEnd/assets/144062335/a3cdee80-1b03-42dd-84b4-6303c179fd37)


Uma coisa importante, a gente precisa ter instalado na nossa máquina o Java na
versão oito para mais, podem acessar o site da Oracle porque o Java é da Oracle 
Mostrar para eles onde baixa o Java: https://www.java.com/pt-BR/
UC11 - Testes de Front-End 6
Vocês podem acessar aqui o site do java.com, a gente clica aqui Fazer Download do
Java mesmo, pode pegar da versão oito para cima. Qualquer uma delas acima da 8 a
gente vai precisar para poder executar o Jmeter porque ele é uma ferramenta que foi 
construída com a linguagem Java,
então a gente precisa do Java funcionando nosso computador para que ele funcione.
Vamos lá, para executar o Jmeter vamos acessar aqui a pasta: bin e rodamos o
executável “ApacheJMeter”
Fazendo isso vai aparecer o Jmeter aqui pra gente, caso não dê certo para você, é só
procurar um arquivo chamado jmeter com o tipo “Arquivo em Lotes do Windows” 

![image](https://github.com/CTM-SENAI-134/Pc-TesteFrontEnd/assets/144062335/ee4d6f43-33e5-4195-856c-2fd6f673bd28)


Então clico duas vezes, ele vai abrir essa telinha preta aqui (que chamamos de
terminal), com isso ele vai forçar a execução do Jmeter. Aí vai aparecer o Jmeter pra
vocês, a única coisa que pode ser um problema é que ele vai executar em inglês!
Dar um overview no sistema
UC11 - Testes de Front-End 7
Agora vamos para a parte do nosso querido Desenho de Teste, primeiro vamos
executar o teste, então vou aqui nesse plano de teste que ele criou e vou dar um clique
direito nele → Adicionar → Threads (Users) → Grupo de Usuários

![image](https://github.com/CTM-SENAI-134/Pc-TesteFrontEnd/assets/144062335/bea91a01-f303-400d-9425-8742adfb92ed)

![image](https://github.com/CTM-SENAI-134/Pc-TesteFrontEnd/assets/144062335/08fd0467-f15b-409e-86a7-0576c463610b)

Aqui em “Número de Usuários Virtuais (threads)” a gente estipula quantos cadastros
serão feitos, então vamos colocar 1000, o tempo de inicialização a gente pode
UC11 - Testes de Front-End 8
colocar de quanto em quanto tempo um usuário é cadastrado (em segundos), aqui
vamos manter o que já está preenchido.
Agora vamos dar um clique direito em: Grupo de Usuários → Adicionar → Testador
→ Requisição HTTP


![image](https://github.com/CTM-SENAI-134/Pc-TesteFrontEnd/assets/144062335/82e6cbc1-d97a-4785-85d2-981f229e1ac0)

Após isso nós já vamos colocar para ele mostrar pra gente o resultado dando um clique
direito em: Grupo de Usuários → Adicionar → Ouvinte → Ver Árvore de
Resultados



![image](https://github.com/CTM-SENAI-134/Pc-TesteFrontEnd/assets/144062335/720c574a-7371-4ed8-8403-423c090f50b3)

E vamos falar para ele nos trazer os resultados em tabela, clique direito em: Grupo de
Usuários → Adicionar → Ouvinte → Ver Resultados em Tabela


![image](https://github.com/CTM-SENAI-134/Pc-TesteFrontEnd/assets/144062335/fe747d16-6852-412b-9c01-062477a29c47)

Então isso aqui é o que precisamos:

![image](https://github.com/CTM-SENAI-134/Pc-TesteFrontEnd/assets/144062335/4c760a6c-df5f-4eda-88bd-cba66a2657c3)

Agora vamos lá, configurar tudo. Primeiro vamos pegar o link da nossa api!

![image](https://github.com/CTM-SENAI-134/Pc-TesteFrontEnd/assets/144062335/1d5aa580-a0b9-41d8-b37a-7877e1bb1c0b)

Pegar o link no terminal que já está aberto (Resources)

![image](https://github.com/CTM-SENAI-134/Pc-TesteFrontEnd/assets/144062335/b9ccb50c-cc07-4492-aa82-d20824dc108a)

Preencher na Requisição HTTP

![image](https://github.com/CTM-SENAI-134/Pc-TesteFrontEnd/assets/144062335/c86d1b49-bae4-434b-8b5a-6bc6c45ced8f)

Vamos aqui em Body Data

Porque como definimos a resquisição como POST precisamos passar o corpo, vamos
copiar a estrutura lá da nossa aplicação

![image](https://github.com/CTM-SENAI-134/Pc-TesteFrontEnd/assets/144062335/c18fa31f-da41-471c-9fc8-a99e93e86d0a)

Só vamos precisar disso aqui e colamos dentro do Body Data, o id não vamos precisar
mandar já que a API vai criar os ids para gente
Completar com dados fake para cadastrar
Agora vamos dar um clique direito em: Requisição HTTP → Adicionar → Elemento
de Configuração → Gerenciador de Cabeçãlhos HTTP


![image](https://github.com/CTM-SENAI-134/Pc-TesteFrontEnd/assets/144062335/cf27210b-9232-41bd-8ed3-d54bff90b53c)

Nós precisamos configurar isso porque estamos trabalhando com requisições HTTP,
então precisamos passar algumas configurações dentro do cabeçalho da requisição
Então vamos clicar aqui em Adicionar e vamos preencher:

![image](https://github.com/CTM-SENAI-134/Pc-TesteFrontEnd/assets/144062335/30030017-b245-4e45-8b68-073a1f05c616)

Nome
“Content-type”
Value
“application/json:charset=UTF-8”
E clica em Adicionar → Salvar
Então podemos apertar aqui para Salvar

![image](https://github.com/CTM-SENAI-134/Pc-TesteFrontEnd/assets/144062335/85076729-f3c1-4d5e-aff1-4de81c642641)


![image](https://github.com/CTM-SENAI-134/Pc-TesteFrontEnd/assets/144062335/33381a25-761a-40a9-8bde-76856ac442b4)

Ele vai ficar salvo na pasta /bin mas é a pasta que fica lá dentro do Jmeter
Salvar com o nome “testeDeDesempenho”
Feito tudo isso, vamos clicar em Grupo de Usuários e vamos executar


![image](https://github.com/CTM-SENAI-134/Pc-TesteFrontEnd/assets/144062335/92475242-28f4-4c8f-9190-c84e07de2da7)

*Dá OK e salva com o nome “AtividadeTeste”
Vamos ver o resultado:

![image](https://github.com/CTM-SENAI-134/Pc-TesteFrontEnd/assets/144062335/7bc6f1d0-f593-4cb6-8b0c-488fca2719d7)


![image](https://github.com/CTM-SENAI-134/Pc-TesteFrontEnd/assets/144062335/1c502373-3a69-477e-aa41-5af479e35dfa)



![image](https://github.com/CTM-SENAI-134/Pc-TesteFrontEnd/assets/144062335/5e4617d9-bb55-454d-a5e6-68223f7cf1c0)


![image](https://github.com/CTM-SENAI-134/Pc-TesteFrontEnd/assets/144062335/ea8cf0fa-8b3b-477e-93cc-118845050a3c)
