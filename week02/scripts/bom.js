const input = document.querySelector('#favchap');
const button = document.querySelector('button');
const list = document.querySelector('ul'); // or your actual list

button.addEventListener('click', function () {
    if (input.value.trim() !== '') {
        const li = document.createElement('li');
        li.textContent = input.value;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = '❌';

        deleteButton.addEventListener('click', function () {
            li.remove(); // shorter way than list.removeChild(li)
            input.focus();
        });

        li.append(deleteButton);
        list.append(li);

        input.value = '';  // clear the input after adding
    }

    input.focus();  // always focus back on the input, no matter what
});
