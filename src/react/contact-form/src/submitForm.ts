const SUBMIT_URL = 'https://www.greatfrontend.com/api/questions/contact-form';

export default async function submitForm(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault();
  const form = event.target as HTMLFormElement;

  if (form.action !== SUBMIT_URL) {
    alert('Incorrect form action value');
    return;
  }

  if (form.method.toLowerCase() !== 'post') {
    alert('Incorrect form method value');
    return;
  }

  const formData = new FormData(form);
  const name = formData.get('name')?.toString().trim();
  const email = formData.get('email')?.toString().trim();
  const message = formData.get('message')?.toString().trim();

  if (!name || !email || !message) {
    alert('All fields are required!');
    return;
  }

  // Simulate success
  alert('Success');
}