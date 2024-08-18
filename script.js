let string = "";
let buttons = document.querySelectorAll('.button');
localStorage.setItem('memory', '0');

Array.from(buttons).forEach((button) => {
    button.addEventListener('click', (e) => {
        const targetValue = e.target.innerHTML;
        document.getElementById('input').style.color = "black";

        if (targetValue === '=') {
            try {
                const result = eval(string);
                string = result.toString();
                document.getElementById('input').value = string;
            } catch (error) {
                document.getElementById('input').value = "Error";
                document.getElementById('input').style.color = "red";
                string = "";
            }
        } else if (targetValue === 'C') {
            string = "";
            document.getElementById('input').value = string;
        } else if (targetValue === 'M+') {
            let memory = parseFloat(localStorage.getItem('memory'));
            memory += parseFloat(string || '0');
            localStorage.setItem('memory', memory.toString());
        } else if (targetValue === 'M-') {
            let memory = parseFloat(localStorage.getItem('memory'));
            memory -= parseFloat(string || '0');
            localStorage.setItem('memory', memory.toString());
        } else {
            string += targetValue;
            document.getElementById('input').value = string;
        }
    });
});
