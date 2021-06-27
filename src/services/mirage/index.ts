import { createServer, Factory, Model } from "miragejs";
import faker from "faker"

type User = {
  name: string;
  email: string;
  created_at: string;
}

export function makeServer() {
  const server = createServer({
    models: {
      user: Model.extend<Partial<User>>({})
    },

    factories: {
      user: Factory.extend({
        name (i: number) {
          return `user ${i + 1}`
        },
        email () {
          return faker.internet.email().toLowerCase();
          // faker é uma lib de criação de dados fictícios.
        },
        createdAt () {
          return faker.date.recent(10);
        },
      })
    },

    seeds(server) {
      server.createList('user', 10);
      // Aqui estamos dizendo para o mirage criar 200 usuarios da factory 'user'
      // toda vez que ele for inicializado.
    },

    routes () {
      this.namespace = 'api';
      this.timing = 750; 
      
      // Setar um dado de delay da chamada das rotas. PQ?
      // Localmente as chamdas a API normalmente ocorrem muito rapidas, não 
      // Permitindo que o desenvolvedor experimente a usabilidade que o usuario
      // irá ter. Logo colocaremos um delay para configurarmos melhor os estados
      // de loading.
      this.get('/users');
      this.post('/users');
      this.namespace = '';
      // Como o next tem como padrão, rotas com /api, quando criadas rotas dentro
      // de uma pasta chamada 'api'. É necessário resetar o nome do namespace do mirage
      // para '', para que não afete essa configuração do next.
      this.passthrough()
      // Se a rota chamada não configurada no mirage que ele permita que ela passe direto
      // Para o service que trata ela.
    }
  })

  return server;
}

// O mirage tem uma funcionalidade de shorthand.
// As rotas com nome plural da model criada, ex.: model: user => rota: /users.
// Usando o termo this.rota, o mirage já entender que a rota irá buscar os dados
// de dentro daquela model.
