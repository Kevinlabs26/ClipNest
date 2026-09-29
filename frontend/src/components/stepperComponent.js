// Stepper Pipeline component for sales & support scenario workflows
import { $, uiText } from '../utils/dom.js';
import { esc, categoryPath } from '../utils/text.js';
import { store } from '../state/store.js';

// Get ordered child steps of a parent category
export function getScenarioSteps(parentCategory) {
  const { categories, categoryParents } = store.state;
  return categories.filter(name => categoryParents[name] === parentCategory);
}

// Render Stepper Timeline and update workflow navigation buttons
export function renderStepper() {
  const startBtn = $('#start-category-flow');
  const panel = $('#category-flow');
  if (!startBtn || !panel) return;

  const { scenarioFlow, view, category } = store;
  const { categories, categoryParents, preferences } = store.state;

  const activeSteps = scenarioFlow && view === 'category' && categories.includes(scenarioFlow.parent)
    ? getScenarioSteps(scenarioFlow.parent)
    : [];
  const currentIndex = activeSteps.indexOf(category);

  if (currentIndex < 0 && scenarioFlow) {
    store.scenarioFlow = null;
  }

  // Show "Browse Steps" button if current category has children
  const hasSteps = view === 'category' && getScenarioSteps(category).length > 0;
  startBtn.hidden = !hasSteps || Boolean(store.scenarioFlow);
  startBtn.textContent = uiText('按步骤浏览');

  panel.hidden = !store.scenarioFlow;
  if (!store.scenarioFlow) return;

  // Title and current step progress indicator
  $('#category-flow-scenario').textContent = categoryPath(store.scenarioFlow.parent, categories, categoryParents);
  const locale = preferences.uiLanguage;
  $('#category-flow-step').textContent = locale === 'en'
    ? `(${currentIndex + 1} of ${activeSteps.length})`
    : `(第 ${currentIndex + 1}/${activeSteps.length} 步)`;

  const prevBtn = $('#category-flow-prev');
  const nextBtn = $('#category-flow-next');
  if (prevBtn) {
    prevBtn.textContent = uiText('← 上一步');
    prevBtn.disabled = currentIndex <= 0;
  }
  if (nextBtn) {
    nextBtn.textContent = currentIndex === activeSteps.length - 1 ? uiText('完成流程') : uiText('下一步 →');
    nextBtn.disabled = false;
  }

  // Render pipeline track
  const stepper = $('#category-flow-stepper');
  if (stepper) {
    stepper.innerHTML = activeSteps.map((stepName, stepIndex) => {
      const isPast = stepIndex < currentIndex;
      const isCurrent = stepIndex === currentIndex;
      const stateClass = isCurrent ? 'current' : isPast ? 'completed' : 'upcoming';
      const badgeIcon = isPast ? '✓' : String(stepIndex + 1);

      return `<button class="stepper-item ${stateClass}" type="button" data-flow-step-index="${stepIndex}" title="切换至第 ${stepIndex + 1} 步：${esc(stepName)}">` +
        `<span class="stepper-badge">${badgeIcon}</span>` +
        `<span class="stepper-name">${esc(stepName)}</span>` +
        `</button>`;
    }).join('<span class="stepper-arrow">›</span>');
  }
}

// Navigate to a specific step index
export function goToStep(stepIndex, onRender) {
  if (!store.scenarioFlow) return;
  const steps = getScenarioSteps(store.scenarioFlow.parent);
  if (!steps[stepIndex]) return;

  store.view = 'category';
  store.category = steps[stepIndex];
  store.includeDescendants = false;
  store.state.lastCategory = store.category;
  store.persist();
  if (onRender) onRender();

  $('.content-area')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

let autoNextTimer = null;

// Trigger auto-advance to next step if user enabled the option
export function triggerAutoAdvance(onRender) {
  const autoNextCheckbox = $('#flow-auto-next');
  if (!store.scenarioFlow || !autoNextCheckbox?.checked) return;

  const steps = getScenarioSteps(store.scenarioFlow.parent);
  const currentIndex = steps.indexOf(store.category);
  if (currentIndex < 0 || currentIndex >= steps.length - 1) return;

  if (autoNextTimer) clearTimeout(autoNextTimer);
  autoNextTimer = setTimeout(() => {
    goToStep(currentIndex + 1, onRender);
  }, 350);
}
