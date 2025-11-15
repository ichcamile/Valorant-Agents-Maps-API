document.addEventListener('DOMContentLoaded', () => {
    const galleryContainer = document.getElementById('agent-gallery-container');
    const filterNameInput = document.getElementById('filter-name');
    const filterRoleSelect = document.getElementById('filter-role');

    const API_URL = 'https://valorant-api.com/v1/agents?language=pt-BR&isPlayableCharacter=true';
    let allAgents = [];

    async function fetchAgents() {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) {
                throw new Error(`Erro HTTP: ${response.status}`);
            }
            const data = await response.json();

            allAgents = data.data
                .filter(agent => agent.fullPortrait && agent.role)
                .sort((a, b) => a.displayName.localeCompare(b.displayName));
            displayAgents(allAgents);

        } catch (error) {
            console.error('Falha ao buscar agentes:', error);
            galleryContainer.innerHTML = '<h2>Falha ao carregar agentes. Tente novamente.</h2>';
        }
    }

    function displayAgents(agents) {
        galleryContainer.innerHTML = '';

        if (agents.length === 0) {
            galleryContainer.innerHTML = '<h2>Nenhum agente encontrado com esses filtros.</h2>';
            return;
        }

        agents.forEach(agent => {
            const card = document.createElement('div');
            card.className = 'agent-card';

            // Aplica o gradiente de cores específico do agente ao fundo do card
            if (agent.backgroundGradientColors) {
                const colors = agent.backgroundGradientColors.map(hex => `#${hex.substring(0, 6)}`);
                card.style.background = `linear-gradient(135deg, ${colors[0]}, ${colors[1]}, ${colors[3]})`;
            }


            const image = document.createElement('img');
            image.className = 'agent-card-image';
            image.src = agent.fullPortraitV2 || agent.fullPortrait;
            image.alt = `Retrato de ${agent.displayName}`;
            image.loading = 'lazy';

            const headerInfo = document.createElement('div');
            headerInfo.className = 'agent-header-info';

            const name = document.createElement('h2');
            name.className = 'agent-name';
            name.textContent = agent.displayName;

            const role = document.createElement('span');
            role.className = 'agent-role';
            role.textContent = agent.role.displayName;

            const bio = document.createElement('p');
            bio.className = 'agent-bio';
            
            bio.innerHTML = agent.description;

            const abilitiesBar = document.createElement('div');
            abilitiesBar.className = 'abilities-bar';

            agent.abilities.forEach(ability => {
                if (ability.displayIcon) {
                    const icon = document.createElement('img');
                    icon.className = 'ability-icon';
                    icon.src = ability.displayIcon;
                    icon.alt = ability.displayName;
                    
                    abilitiesBar.appendChild(icon);

                    // --- Lógica do Pop-up (Tooltip) ---
                    icon.addEventListener('mouseover', (event) => {
                        // Cria o elemento do tooltip
                        const tooltip = document.createElement('div');
                        tooltip.className = 'ability-tooltip';
                        tooltip.innerHTML = `
                            <h4>${ability.displayName}</h4>
                            <p>${ability.description}</p>
                        `;
                        document.body.appendChild(tooltip);

                        // Posiciona o tooltip perto do ícone
                        const iconRect = event.target.getBoundingClientRect();
                        tooltip.style.left = `${iconRect.left + window.scrollX}px`;
                        tooltip.style.top = `${iconRect.top + window.scrollY - tooltip.offsetHeight - 10}px`;
                    });

                    icon.addEventListener('mouseout', () => {
                        document.querySelector('.ability-tooltip')?.remove();
                    });
                }
            });

            headerInfo.appendChild(name);
            headerInfo.appendChild(role);
            card.appendChild(image);
            card.appendChild(headerInfo);
            card.appendChild(bio);
            card.appendChild(abilitiesBar);

            galleryContainer.appendChild(card);
        });
    }

    function applyFilters() {
        const nameValue = filterNameInput.value.toLowerCase();
        const roleValue = filterRoleSelect.value;

        const filteredAgents = allAgents.filter(agent => {
            const nameMatch = agent.displayName.toLowerCase().includes(nameValue);
            const roleMatch = (roleValue === 'all') || (agent.role.displayName === roleValue);
            return nameMatch && roleMatch;
        });

        displayAgents(filteredAgents);
    }

    filterNameInput.addEventListener('input', applyFilters);
    filterRoleSelect.addEventListener('change', applyFilters);

    fetchAgents();

    const MAPS_API_URL = 'https://valorant-api.com/v1/maps?language=pt-BR';
    const mapCheckboxesContainer = document.getElementById('map-checkboxes');
    const sortearBtn = document.getElementById('sortear-mapa-btn');
    const resultadoContainer = document.getElementById('mapa-sorteado-container');
    const resultadoImg = document.getElementById('mapa-sorteado-img');
    const resultadoNome = document.getElementById('mapa-sorteado-nome');

    async function fetchMaps() {
        try {
            const response = await fetch(MAPS_API_URL);
            const data = await response.json();

            const playableMaps = data.data.filter(map => map.coordinates && map.displayName !== "The Range");

            playableMaps.forEach(map => {
                const mapItem = document.createElement('div');
                mapItem.className = 'map-checkbox-item';
                mapItem.innerHTML = `
                    <input type="checkbox" id="${map.uuid}" value="${map.uuid}"
                           data-name="${map.displayName}"
                           data-image="${map.splash}" checked>
                    <label for="${map.uuid}">${map.displayName}</label>
                `;
                mapCheckboxesContainer.appendChild(mapItem);
            });

        } catch (error) {
            console.error('Falha ao buscar mapas:', error);
            mapCheckboxesContainer.innerHTML = '<p style="color: var(--silver);">Erro ao carregar lista de mapas.</p>';
        }
    }

    sortearBtn.addEventListener('click', () => {
        const checkedMaps = document.querySelectorAll('#map-checkboxes input[type="checkbox"]:checked');

        if (checkedMaps.length === 0) {
            console.warn("Nenhum mapa selecionado para o sorteio.");
            return;
        }

        const mapPool = Array.from(checkedMaps);
        const randomMapEl = mapPool[Math.floor(Math.random() * mapPool.length)];

        const mapName = randomMapEl.dataset.name;
        const mapImage = randomMapEl.dataset.image;

        resultadoNome.textContent = mapName;
        resultadoImg.src = mapImage;
        resultadoImg.alt = `Mapa sorteado: ${mapName}`;
        resultadoContainer.style.display = 'block';

        resultadoContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });

    fetchMaps();
});