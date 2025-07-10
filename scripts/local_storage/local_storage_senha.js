// Seleciona todos os elementos <textarea> da página
const textareas = document.querySelectorAll("textarea");

// Percorre cada <textarea> encontrado
textareas.forEach((textarea, index) => {
    // Tenta recuperar do localStorage um valor salvo com a chave "textarea_index"
    const savedValue = localStorage.getItem(`textarea_${index}`);

    // Se encontrar um valor salvo, define esse valor no campo <textarea>
    if (savedValue !== null) {
        textarea.value = savedValue;
    }

    // Adiciona um "ouvinte de evento" que será acionado sempre que o usuário digitar no campo
    textarea.addEventListener("input", () => {
        // Sempre que o usuário digitar, salva o conteúdo atual no localStorage com a chave "textarea_index"
        localStorage.setItem(`textarea_${index}`, textarea.value);
    });
});