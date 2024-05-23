
# Oficina de Desenvolvimento Web: Introdução a Vue.js, NuxtJS e Vuetify

## Principais Métodos e Funções do Vue.js

### Instância Vue
- **new Vue({ options })**: Cria uma nova instância Vue, onde você pode definir opções como `data`, `methods`, `computed`, `watch`, entre outras.

### Opções de Instância

#### Data
- **data**: Um objeto que armazena o estado reativo da instância Vue.
  ```javascript
  data() {
    return {
      message: 'Hello, Vue!'
    }
  }
  ```

#### Methods
- **methods**: Um objeto contendo funções que podem ser chamadas a partir da instância Vue.
  ```javascript
  methods: {
    greet() {
      console.log('Hello!')
    }
  }
  ```

#### Computed
- **computed**: Propriedades que dependem de outras propriedades e são recalculadas automaticamente quando suas dependências mudam.
  ```javascript
  computed: {
    reversedMessage() {
      return this.message.split('').reverse().join('')
    }
  }
  ```

#### Watch
- **watch**: Monitores de mudanças em propriedades específicas e executa funções em resposta.
  ```javascript
  watch: {
    message(newVal, oldVal) {
      console.log(\`Message changed from \${oldVal} to \${newVal}\`)
    }
  }
  ```

### Diretivas
- **v-bind**: Liga um atributo ou propriedade a uma expressão.
  ```html
  <img v-bind:src="imageSrc">
  ```
- **v-model**: Cria uma ligação bidirecional em elementos de formulário.
  ```html
  <input v-model="message">
  ```
- **v-if, v-else-if, v-else**: Renderiza elementos com base em uma expressão booleana.
  ```html
  <p v-if="seen">Now you see me</p>
  ```
- **v-for**: Renderiza uma lista de itens usando um template.
  ```html
  <ul>
    <li v-for="item in items" :key="item.id">{{ item.text }}</li>
  </ul>
  ```

### Componentes
- **Vue.component**: Define um componente global.
  ```javascript
  Vue.component('my-component', {
    template: '<div>A custom component!</div>'
  })
  ```
- **Props**: Passa dados para componentes filhos.
  ```javascript
  props: ['message']
  ```
- **Emit**: Envia eventos do componente filho para o pai.
  ```javascript
  this.$emit('event-name', payload)
  ```

### Ciclo de Vida
- **created**: Chamado após a instância ser criada.
- **mounted**: Chamado após a instância ser montada no DOM.
- **updated**: Chamado após uma atualização reativa.
- **destroyed**: Chamado após a instância ser destruída.

## NuxtJS Específico

### asyncData
Carrega dados assíncronos antes de renderizar o componente.
```javascript
async asyncData({ params }) {
  const data = await fetchData(params.id)
  return { data }
}
```

### head
Define metadados da página, como título e meta tags.
```javascript
head() {
  return {
    title: 'My Page Title'
  }
}
```

## Vuetify Específico

### v-app
Componente raiz necessário para inicializar Vuetify.
```html
<v-app>
  <!-- Content -->
</v-app>
```

### v-container, v-row, v-col
Layout de grade responsivo.
```html
<v-container>
  <v-row>
    <v-col>
      <!-- Content -->
    </v-col>
  </v-row>
</v-container>
```

### v-btn
Botão estilizado.
```html
<v-btn color="primary">Click Me</v-btn>
```

### v-text-field
Campo de texto estilizado.
```html
<v-text-field label="Enter something" v-model="input"></v-text-field>
```

## Diferença entre `<script setup lang="ts">` e `<script>`

### `<script>`
O script tradicional permite definir a lógica do componente, onde você declara o estado, métodos, e ciclo de vida.
```javascript
<script>
export default {
  data() {
    return {
      message: 'Hello from traditional script!'
    }
  },
  methods: {
    greet() {
      console.log(this.message)
    }
  }
}
</script>
```

### `<script setup lang="ts">`
O `script setup` simplifica a sintaxe e melhora o desempenho ao pré-compilar o código. Ideal para TypeScript.
```typescript
<script setup lang="ts">
import { ref } from 'vue'

const message = ref('Hello from script setup!')

function greet() {
  console.log(message.value)
}
</script>
```

Essa abordagem elimina a necessidade de `export default` e organiza o código de forma mais limpa e direta.

Espero que essa lista ajude seus alunos a entenderem os principais conceitos e funcionalidades de Vue.js, NuxtJS e Vuetify!
