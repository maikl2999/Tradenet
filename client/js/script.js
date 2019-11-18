const myForm = document.getElementById('form');

let formIsRequired = true;

myForm.onsubmit = async (e) => {
	e.preventDefault();

	clearError();

	formIsRequired = true;
	
	checkFormField(myForm);
	
	if(!formIsRequired) return;

	let response = await fetch('http://localhost:3091/register', {
		method: 'POST',
		body: new FormData(myForm)
	}).catch(err => alert(err.message));

	let result = await response.json(); 

	if(result.error) {
		alert(result.error);
	} else if(result.success) {
		alert('Registration completed successfully');
	} else {
		alert('Unexpected error');
	};
};

function checkFormField(form) {
	let formField = [form.name, form.surname, form.email, form.country, form.phone];

	formField.forEach(field => {
		
		if(!field.validity.valid) {
			createError(field);
			formIsRequired = false;
		};
	});
}

function clearError() {
	let elems = document.querySelectorAll('.error');

	elems.forEach(elem => elem.remove());
}

function createError(elem) {
	let div = document.createElement('div');
	div.className = "error";

	if(elem.name === 'name' || elem.name === 'surname' || elem.name === 'country') div.innerText = "Required, min length 3";
	if(elem.name === 'email') div.innerText = "Required, must be in email format";
	if(elem.name === 'phone') div.innerText = "Required, min length 7 digits";

	elem.parentNode.append(div);
}