# Valorant - Galeria de Agentes e Sorteio de Mapas

Este é um projeto front-end interativo desenvolvido para fãs de Valorant. A página exibe uma galeria completa e dinâmica de todos os agentes do jogo, consumindo dados em tempo real da [Valorant-API](https://valorant-api.com/). Além disso, conta com uma ferramenta para sortear mapas, ideal para aquecer ou decidir a próxima partida com os amigos.

O projeto foi construído com foco em boas práticas de desenvolvimento web, separando HTML, CSS e JavaScript, e utilizando recursos modernos para criar uma experiência de usuário fluida e visualmente agradável.

## ✨ Funcionalidades

### Galeria de Agentes
- **Listagem Dinâmica**: Carrega todos os agentes jogáveis diretamente da API.
- **Cards Detalhados**: Cada agente possui um card personalizado com:
  - Nome e Função.
  - Imagem de retrato completa.
  - Fundo com gradiente de cores único, baseado na identidade visual do agente.
  - Biografia expansível ao passar o mouse.
  - Ícones de todas as habilidades com tooltips que exibem nome e descrição.
- **Sistema de Filtros**: Permite filtrar os agentes por **nome** ou por **função** (Duelista, Controlador, etc.).
- **Ordenação**: Os agentes são exibidos em ordem alfabética por padrão.

### Sorteio de Mapas
- **Seleção de Mapas**: Carrega todos os mapas competitivos e permite que o usuário selecione quais deseja incluir no sorteio.
- **Sorteio Aleatório**: Com um clique, um mapa é sorteado aleatoriamente do grupo selecionado e exibido com sua imagem e nome.

### Design
- **Tema Escuro**: Interface inspirada na identidade visual do Valorant.
- **Responsividade**: O layout se adapta a diferentes tamanhos de tela, de desktops a dispositivos móveis.
- **Micro-interações**: Efeitos de `hover` e transições suaves para uma experiência mais agradável.

---

## 🚀 Tecnologias Utilizadas

- **HTML5**: Estrutura semântica do conteúdo.
- **CSS3**: Estilização completa, utilizando:
  - Flexbox e Grid Layout para responsividade.
  - Variáveis CSS para um tema consistente.
  - Animações e Transições para interatividade.
  - `backdrop-filter` para efeitos de vidro fosco.
- **JavaScript (ES6+)**:
  - **Fetch API** para consumir a Valorant-API de forma assíncrona (`async/await`).
  - **Manipulação do DOM** para criar e atualizar dinamicamente todos os elementos.
  - Lógica de filtros, ordenação e sorteio.

---

## ⚙️ Como Executar o Projeto

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/seu-usuario/Valorant-Agents-Maps-API.git
    ```
2.  **Navegue até a pasta do projeto:**
    ```bash
    cd Valorant-Agents-Maps-API
    ```
3.  **Abra o arquivo `index.html`** no seu navegador de preferência.
    - Para uma melhor experiência de desenvolvimento, recomenda-se usar uma extensão como o **Live Server** no VS Code.

---

## 👤 Autor

**Camile Santana**
- GitHub: @seu-usuario
- LinkedIn: Seu Perfil
