console.log("Script from github");

const colorMap = {
  'PRIORITY': '#5d1f1a',
  'DONE': '#164b35',
  'Blocked / check Seb': '#c50000',
  'Expected Return': '#ab5f06',
  'Tasks': '#000000',
  'XXXXX': '#000000',
  'XXXXX': '#000000',
  'XXXXX': '#000000',
  'XXXXX': '#000000',
  'XXXXX': '#000000'
  // #164b35 vert
  // #352c63 violet
  // #09326c bleu
  // #164b35 vert
  // #164b35 vert
  // #164b35 vert
};

function toggleCollapse(event) {
  const button = event.currentTarget;
  const columnClicked = button.closest('li');
  const columnClickedDiv = columnClicked.querySelector('div');
  const listHeader = columnClickedDiv.querySelector('div');
  const listHeaderTitle = listHeader.querySelector('div');
  const listHeaderTitleH2 = listHeaderTitle.querySelector('h2');
  const listEditMenuButton = listHeader.querySelector('button[data-testid="list-edit-menu-button"]');
  const numberOfCards = columnClickedDiv.querySelectorAll('ol[data-testid="list-cards"] > li').length;
  const listCards = columnClicked.querySelector('ol[data-testid="list-cards"]');
  const addCardSection = columnClicked.querySelector('div[data-testid="list-footer"]');
 
 
  if (columnClicked.classList.contains('close')) {
 columnClicked.classList.remove('close');
 columnClickedDiv.classList.remove('vyQeWx7iCK1PNb');
 listHeader.classList.remove('VF9A1AiqaPMHXG');
 listHeaderTitle.classList.remove('X38hkBeoL1ig8x');
 listHeaderTitleH2.classList.remove('bwoLvY94uSRdaI');
 button.querySelector('span').setAttribute('aria-label', 'Réduire la liste');
 
 const numberOfCardsP = columnClicked.querySelector('.RB2QdwEYVbzS26');
 numberOfCardsP.remove();
 
 listCards.removeAttribute('hidden');
 addCardSection.removeAttribute('hidden');
 listEditMenuButton.style.display = 'flex';
  }
  else {
 columnClicked.classList.add('close');
 columnClickedDiv.classList.add('vyQeWx7iCK1PNb');
 listHeader.classList.add('VF9A1AiqaPMHXG');
 listHeaderTitle.classList.add('X38hkBeoL1ig8x');
 listHeaderTitleH2.classList.add('bwoLvY94uSRdaI');
 button.querySelector('span').setAttribute('aria-label', 'Développer la liste');
 
 const numberOfCardsP = document.createElement('p');
 numberOfCardsP.className = "RB2QdwEYVbzS26";
 numberOfCardsP.innerHTML = numberOfCards;
 listHeader.appendChild(numberOfCardsP);
 
 listCards.setAttribute('hidden', true);
 addCardSection.setAttribute('hidden', true);
 listEditMenuButton.style.display = 'none';
  }
}

function addCollapseColumnFeature() {
  const listHeaderElements = document.querySelectorAll('div[data-testid="list-header"]');
 
  listHeaderElements.forEach(listHeader => {
    const children = listHeader.children;
   
    if (children.length >= 2) {
      const collapseButton = document.createElement('button');
      collapseButton.className = "FImJy1Q8tIaTG_";
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

function addColorsFeatureOLD() {
  for (let term in colorMap) {
    let color = colorMap[term];
    let h2Elements = document.querySelectorAll('h2');
   
    h2Elements.forEach(h2 => {
      if (h2.textContent.toUpperCase().includes(term.toUpperCase())) {
        let parentDiv = h2.parentElement.parentElement.parentElement;
        parentDiv.style.backgroundColor = color;
      }
    });
  }
}

function addColorsFeatureOLD() {

}

function launchPlugin() {
  //On teste l'existance de la dernière section du kanban, et on lance / relance l'execution en conséquence
  const listComposerButtonContainer = document.querySelector('div[data-testid="list-composer-button-container"]');
  const listWrapperElements = document.querySelectorAll('li[data-testid="list-wrapper"]');
 
  if (!listComposerButtonContainer || listWrapperElements.length <= 1) {
    setTimeout(launchPlugin, 100);
    return;
  }
  console.log('launched');
 
  addCollapseColumnFeature();
  addColorsFeature();
}

document.addEventListener('DOMContentLoaded', (event) => {
  launchPlugin();
});