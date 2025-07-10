document.addEventListener("DOMContentLoaded", () => {
const textareas = document.querySelectorAll("textarea");

textareas.forEach((textarea, index) => {
// Usa o ID se existir, senão usa o índice
const key = textarea.id
  ? `fca_textarea_${textarea.id}`
  : `fca_textarea_index_${index}`;

// Recupera valor salvo no localStorage
const savedValue = localStorage.getItem(key);
if (savedValue !== null) {
  textarea.value = savedValue;
}

// Salva no localStorage ao digitar
textarea.addEventListener("input", () => {
  localStorage.setItem(key, textarea.value);
});
});
});