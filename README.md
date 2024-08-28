## Introdução

Este projeto é um sistema backend que oferece serviços de vacinação gratuita e medicamentos com desconto para pets, especialmente voltado para usuários de baixa renda. Eles podem criar contas, cadastrar seus pets e visualizar clínicas veterinárias próximas que oferecem esses serviços. O sistema permite ainda o agendamento de visitas domiciliares de veterinários para quem não pode levar o pet até a clínica. O cadastro inclui a descrição do pet e a comprovação de baixa renda do dono. ONGs e programas também podem se cadastrar para oferecer campanhas de vacinação e informações educacionais diretamente na plataforma.

## Contexto
O projeto promove a saúde e o bem-estar dos animais de estimação de pessoas de baixa renda, garantindo que eles recebam vacinação e tratamento médico necessário, o que também impacta De forma positiva a saúde pública. Mesmo que o foco seja em pets, o conceito de garantir que todos tenham acesso a cuidados essenciais, está alinhado com a meta de promover o acesso universal a serviços de saúde. Ao focar em pessoas de baixa renda e fornecer-lhes acesso a serviços que seriam inacessíveis, o projeto contribui para a redução das desigualdades dentro da sociedade.

## Tema
<strong>ODS</strong>
<p align="center">
<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgO1rfnxc-yCeCYfvC3fNfAUJRAQMs_HOv_g&s" alt="Imagem 1">
  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYRf4cBW7AZ1sT21E16IMw01LmKpNNsAnQig&s" alt="Imagem 2">
</p>

## Funcionalidades Principais
<strong>CRUD</strong>
* Create (Criar): Usuários podem criar contas, cadastrar seus pets(O cadastro inclui a descrição do pet e a comprovação de baixa renda). 
* Update (Atualizar): Usuários podem atualizar as informações da conta editando dados do pet e da conta.
* Delete (Excluir): Usuários podem deletar a conta.
* Read (Ler): Usuários podem ver a lista de clínicas que oferecem vacinas.
* Create (Criar): Clínicas veterinárias voluntárias e ONGs podem se cadastrar.
* Update (Atualizar): Clínicas veterinárias voluntárias e ONGs podem editar dados.
* Delete (Excluir): Clínicas veterinárias voluntárias e ONGs podem deletar suas contas.
  

## Funcionalidades Secundarias
<strong>CRUD</strong>
* Create (Criar): ONGs podem cadastrar campanhas de vacinação com datas e local.
* Create (Criar): ONGs podem cadastrar informações educacionais sobre cuidados com pets.
* Delete (Excluir): ONGs podem deletar campanhas de vacinação após prazo terminar.
* Delete (Excluir): ONGs podem deletar informações educacionais sobre cuidados com pets.
* Update (Atualizar): ONGs podem editar e atualizar campanhas de vacinação após prazo terminar.
* Update (Atualizar): ONGs podem editar e atualizar informações educacionais sobre cuidados com pets.
* Read (Ler): Usuários podem ver campanhas de vacinação com datas e local.
* Read (Ler): Usuários podem ver informações educacionais sobre cuidados com pets.
* Create (Criar): Clínicas veterinárias podem cadastrar vacinas em estoque.
* Create (Criar): Clínicas veterinárias podem cadastrar remedios com desconto e em estoque para compras.
* Update (Atualizar): Clínicas veterinárias podem atualizar editando dados das vacinas oferecidas.
* Update (Atualizar): Clínicas veterinárias podem atualizar editando dados dos medicamentos para compras.
* Read (Ler): Usuários podem ver a lista de vacinas oferecidas pela clínica.
* Read (Ler): Usuários podem ver a lista de remedios para compras oferecidos pelas clínica.
* Create (Criar): Usuários podem agendar visita domiciliar para vacinação do pet pela clínica.
* Read (Ler): Clínicas podem ver lista de agendamentos domiciliares dos usuários.
* Update (Atualizar): Clínicas podem atualizar agendamentos domiciliares dos usuários.
* Delete (Excluir): Clínicas podem cancelar agendamentos domiciliares dos usuários.
* Delete (Excluir): Usuários podem cancelar visita domiciliar para vacinação do pet pela clínica.

## Requisitos

## Modelo Lógigo (diagrama de classes)

<p align="center">
<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgO1rfnxc-yCeCYfvC3fNfAUJRAQMs_HOv_g&s" alt="Imagem 1">

</p>

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
