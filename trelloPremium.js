function saveArrayToLocalStorage(key, array) {
	// Convertir le tableau en chaîne JSON
	const jsonString = JSON.stringify(array);
	// Enregistrer la chaîne JSON dans le localStorage
	localStorage.setItem(key, jsonString);
}

function getArrayFromLocalStorage(key) {
	// Récupérer la chaîne JSON depuis le localStorage
	const jsonString = localStorage.getItem(key);
	// Convertir la chaîne JSON en tableau
	return JSON.parse(jsonString);
}

function toggleCollapse(event) {
	const button = event.currentTarget;
	const columnClicked = button.closest('li');
	const dataListId = columnClicked.getAttribute('data-list-id');
	const columnClickedDiv = columnClicked.querySelector('div');
	const listHeader = columnClickedDiv.querySelector('div');
	const listHeaderTitle = listHeader.querySelector('div');
	const listHeaderTitleH2 = listHeaderTitle.querySelector('h2');
	const listEditMenuButton = listHeader.querySelector(
		'button[data-testid="list-edit-menu-button"]'
	);
	const numberOfCards = columnClickedDiv.querySelectorAll(
		'ol[data-testid="list-cards"] > li'
	).length;
	const listCards = columnClicked.querySelector(
		'ol[data-testid="list-cards"]'
	);
	const addCardSection = columnClicked.querySelector(
		'div[data-testid="list-footer"]'
	);

	if (columnClicked.classList.contains('close')) {
		let closedLists = getArrayFromLocalStorage('closedLists');
		if (!closedLists) {
			closedLists = [];
		}
		closedLists = closedLists.filter((item) => item !== dataListId);
		saveArrayToLocalStorage('closedLists', closedLists);

		columnClicked.classList.remove('close');
		columnClickedDiv.classList.remove('vyQeWx7iCK1PNb');
		listHeader.classList.remove('VF9A1AiqaPMHXG');
		listHeaderTitle.classList.remove('X38hkBeoL1ig8x');
		listHeaderTitleH2.classList.remove('bwoLvY94uSRdaI');
		button
			.querySelector('span')
			.setAttribute('aria-label', 'Réduire la liste');

		const numberOfCardsP = columnClicked.querySelector('.RB2QdwEYVbzS26');
		numberOfCardsP.remove();

		listCards.removeAttribute('hidden');
		addCardSection.removeAttribute('hidden');
		listEditMenuButton.style.display = 'flex';
	} else {
		let closedLists = getArrayFromLocalStorage('closedLists');
		if (!closedLists) {
			closedLists = [];
		}
		closedLists.push(dataListId);
		saveArrayToLocalStorage('closedLists', closedLists);

		columnClicked.classList.add('close');
		columnClickedDiv.classList.add('vyQeWx7iCK1PNb');
		listHeader.classList.add('VF9A1AiqaPMHXG');
		listHeaderTitle.classList.add('X38hkBeoL1ig8x');
		listHeaderTitleH2.classList.add('bwoLvY94uSRdaI');
		button
			.querySelector('span')
			.setAttribute('aria-label', 'Développer la liste');

		const numberOfCardsP = document.createElement('p');
		numberOfCardsP.className = 'RB2QdwEYVbzS26';
		numberOfCardsP.innerHTML = numberOfCards;
		listHeader.appendChild(numberOfCardsP);

		listCards.setAttribute('hidden', true);
		addCardSection.setAttribute('hidden', true);
		listEditMenuButton.style.display = 'none';
	}
}

function addCollapseColumnFeature() {
	const listHeaderElements = document.querySelectorAll(
		'div[data-testid="list-header"]'
	);

	listHeaderElements.forEach((listHeader) => {
		const children = listHeader.children;

		if (children.length >= 2) {
			const collapseButton = document.createElement('button');
			collapseButton.className = 'FImJy1Q8tIaTG_';
			collapseButton.innerHTML = `
        <span role="img" aria-label="Réduire la liste" class="css-snhnyn" style="--icon-primary-color: currentColor; --icon-secondary-color: var(--ds-surface, #FFFFFF);">
          <svg width="24" height="24" viewBox="0 0 24 24" role="presentation">
            <path d="M8.062 11L6.5 9.914A1 1 0 017.914 8.5l2.616 2.616c.28.167.47.5.47.884s-.19.717-.47.884L7.914 15.5A1 1 0 116.5 14.086L8.062 13h-3.68c-.487 0-.882-.448-.882-1s.395-1 .882-1h3.68zm5.408 1.884c-.28-.167-.47-.5-.47-.884s.19-.717.47-.884L16.086 8.5A1 1 0 0117.5 9.914L15.938 11h3.68c.487 0 .882.448.882 1s-.395 1-.882 1h-3.68l1.562 1.086a1 1 0 01-1.414 1.414l-2.616-2.616z" fill="currentColor"></path>
          </svg>
        </span>
      `;

			// Add click event listener to the button
			collapseButton.addEventListener('click', toggleCollapse);

			// Insert the button before the second child
			listHeader.insertBefore(collapseButton, children[1]);
		}
	});
}

function closeColumnsToCloseAtLoading() {
	const columnsToClose = getArrayFromLocalStorage('closedLists');
	if (!columnsToClose) {
		columnsToClose = [];
	}

	const collumns = document.querySelectorAll('li[data-list-id]');

	collumns.forEach((item) => {
		const dataListId = item.getAttribute('data-list-id');
		if (columnsToClose.includes(dataListId)) {
			item.querySelector('[data-testid="list-header"] > button').click();
		}
	});
}

function addColumnsColorsFeature() {
	// #216e4e vert
	// #7f5f01 jaune
	// #a54800 orange
	// #ae2e24 rouge
	// #5e4db2 violet
	// #0055cc bleu
	// #206a83 bleu clair
	// #4c6b1f vert clair
	// #943d73 rose
	// #596773 gris
	const colorMap = {
		PRIORITY: '#ae2e24',
		DONE: '#216e4ea6',
		'Blocked / check Seb': '#ae2e24a6',
		'Expected Return (Undated)': '#a56c00a6',
		'Expected Return (Dated)': '#a54800a6',
		'In progress': '#5e4db2',
		XXXXX: '#000000',
		XXXXX: '#000000',
	};
	for (let term in colorMap) {
		let color = colorMap[term];
		let h2Elements = document.querySelectorAll('h2');

		h2Elements.forEach((h2) => {
			if (h2.textContent.toUpperCase().includes(term.toUpperCase())) {
				let parentDiv = h2.parentElement.parentElement.parentElement;
				parentDiv.style.backgroundColor = color;
			}
			if (h2.textContent.toUpperCase() == 'PRIORITY') {
				let parentDiv = h2.parentElement.parentElement.parentElement;
				parentDiv.style.backgroundImage =
					'linear-gradient(to bottom right, var(--ds-background-neutral, rgba(0, 0, 0, 0.05)) 25%, transparent 25%, transparent 50%, var(--ds-background-neutral, rgba(0, 0, 0, 0.05)) 50%, var(--ds-background-neutral, rgba(0, 0, 0, 0.05)) 75%, transparent 75%, transparent)';
				parentDiv.style.backgroundSize = '14px 14px';
			}
		});
	}
}

function addSectionsColumnsFeature() {
	
}

function launchPlugin() {
	const listComposerButtonContainer = document.querySelector(
		'div[data-testid="list-composer-button-container"]'
	);
	const listWrapperElements = document.querySelectorAll(
		'li[data-testid="list-wrapper"]'
	);

	if (!listComposerButtonContainer || listWrapperElements.length <= 1) {
		setTimeout(launchPlugin, 100);
		return;
	}
	console.log('launched');

	addCollapseColumnFeature();
	addColumnsColorsFeature();
	addSectionsColumnsFeature();
}

console.log('XXXXXXXXXXXXXX');
launchPlugin();
