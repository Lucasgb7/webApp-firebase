# DWM – Desenvolvimento WEB e Mobile #1

## Situação-Problema
A empresa GDFF Metalurgia deseja monitorar 4 fornos que são utilizados no processo de fabricação de 
chapas de aço de espessura 2” (50,8 mm). Os operadores precisam ir 18 vezes ao dia confirmar as 
temperaturas dos fornos, e por conta desse problema a empresa te contratou para que você desenvolva um 
sistema IIOT. Os valores dos sensores já estão sendo enviados ao banco de dados Firebase através de um 
gateway industrial. A sua atividade é desenvolver uma aplicação WEB para atender aos requisitos da 
empresa. 

## Orientações Iniciais
Para validar a sua aplicação use o XAMPP, para isso siga as instruções da Aula 1 - DWM. Após a validação 
você deve hospedar o seu Website no serviço Hosting do Firebase via CLI (command-line interface). 
Acesse o guia do Firebase Hosting pelo link: https://firebase.google.com/docs/hosting/quickstart?hl=pt-br

Crie uma base de dados idêntica ao JSON apresentado na Figura 1. Importe esse o arquivo com extensão 
JSON no Realtime Database do Firebase. Por questão de segurança, o seu Firebase deve permitir leitura e 
escrita apenas com autenticação. 

Cada forno contém 3 variáveis: temp é referente a temperatura do forno (0 a 1100ºC), status é um indicador 
da situação atual do forno e obs é um campo de anotação geral feita pelos usuários do sistema. Os detalhes 
são apresentados posteriormente em cada Tela.

```
{
 "Forno1": {"temp":700, "status":0, "obs":"-" }, 
 "Forno2": {"temp":400, "status":2, "obs":"-" }, 
 "Forno3": {"temp":500, "status":2, "obs":"-" }, 
 "Forno4": {"temp":990, "status":0, "obs":"-" } 
} 
```
## Task 1

A tela inicial deve ser similar a apresentada na Figura 2. O logotipo da empresa GDFF deve ser baixado na 
pasta “Atividades/Imagens”, disponível no Canvas / Teams. A cor dos textos deve ser R=51, G=43, B=43. 
Lembre de adicionar o seu nome abaixo do botão de login e de colocar GDFF na aba do navegador. 

## Task 2 

O cliente solicitou que além dos valores numéricos das temperaturas dos 4 fornos seja exibido também a cor 
referente a temperatura do aço. Note que a Figura 3 descreve 11 tonalidades, porém a empresa definiu como 
requisito 4 cores para facilitar a visualização dos operadores
```
Cor 1 : - RGB(140,115,115) Menor que 537ºC 
Cor 2 : - RGB(204, 0 , 0) Região entre 537ºC e 815 ºC 
Cor 3 : - RGB(255,136,51) Região entre 815ºC e 980 ºC 
Cor 4 : - RGB(255,247,0) Região entre 980ºC e 1100 ºC
```
A tela de Monitoramento de Temperatura dos fornos é apresentada na Figura 5. Observe que os 4 
retângulos representam as cores correspondentes as temperaturas de cada forno. O critério de 
avaliação leva em consideração a quantidade de elementos (título, imagem, cores dos fornos e 
valores numéricos) e a funcionalidade. O tamanho dos elementos não será avaliado, porém é 
desejável que fique próximo da proporcional apresentada na Figura 5. 

## Task 3 

O Status de cada forno pode variar entre 0 e 2. Sendo 0: ok, 1: erro do controlador PID e 2: botão de emergência 
pressionado pelo operador. O número do Status de cada forno deve ser exibido em forma de ícone conforme 
a imagem abaixo. 

Além dos 4 ícones (Figura 7) da Tela de Status, deve ser exibido 4 informações extras que são observações 
feitas pela manutenção ou pela gerência. 
Obs - Caso o Status seja alterado no Firebase o ícone deve ser alterado imediatamente. As anotações devem 
ser lidas do Firebase (exemplo, Forno1/obs). Adicione uma borda pontilhada conforme apresentado na Figura 
7. 

## Task 4

Os usuários do sistema podem adicionar observações referentes a cada um dos fornos (Figura 8). Por 
exemplo, pressionar o botão “Alterar” do Forno 1, o texto digitado (use Tag HTML `<input>`) deve ser escrito no 
Firebase em “Forno1/obs”. 


## Arquivos para entregar:

- A pasta do projeto com as imagens, HTML, CSS e JS 
- URL que hospedou no Firebase Hosting (adicione em um arquivo de texto .txt)